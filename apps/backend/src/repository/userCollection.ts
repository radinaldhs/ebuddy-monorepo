import { db } from "../config/firebaseConfig";
import { User } from "@ebuddy/shared/user";

/**
 * Fetch all users from the USERS collection.
 */
export const getAllUsers = async (): Promise<User[]> => {
  const usersSnapshot = await db.collection("USERS").get();
  return usersSnapshot.docs.map((doc) => doc.data() as User);
};

/**
 * Update a user document in the USERS collection.
 * @param id - The document ID of the user.
 * @param data - The user data to update.
 */
export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<void> => {
  await db.collection("USERS").doc(id).set(data, { merge: true });
};
