import axios from "axios";
import { getAuth } from "firebase/auth";
import { User } from "@ebuddy/shared/user"; // Import User type

const API_BASE_URL = "http://localhost:3000/api";

const getAuthToken = async (): Promise<string | null> => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return user.getIdToken(true);
  }

  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      unsubscribe();
      if (authUser) {
        const token = await authUser.getIdToken();
        resolve(token);
      } else {
        resolve(null);
      }
    });
  });
};

export const fetchUserData = async (): Promise<User[]> => {
  try {
    const token = await getAuthToken();
    if (!token) {
      throw new Error("No auth token available");
    }

    const response = await axios.get<User[]>(
      `${API_BASE_URL}/fetch-user-data`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUserData = async (user: User): Promise<User> => {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("No auth token available");
  }

  const response = await axios.post<User>(
    `${API_BASE_URL}/update-user-data`,
    user,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
