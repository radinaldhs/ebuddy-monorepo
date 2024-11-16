import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@ebuddy/shared/user";
import { fetchUserData, updateUserData } from "../apis/userApi";

export const fetchUser = createAsyncThunk<User[]>(
  "user/fetchUser",
  async () => {
    const response = await fetchUserData();
    return response;
  }
);

export const updateUser = createAsyncThunk<User, User>(
  "user/updateUser",
  async (user) => {
    const response = await updateUserData(user);
    return response;
  }
);
