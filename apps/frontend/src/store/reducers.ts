import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, updateUser } from "./actions";
import { User } from "@ebuddy/shared/user"; // Import shared User type

interface UserState {
  data: User[]; // Use User type for the data array
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [], // Initialize as an empty array of User
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchUser actions
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload as User[]; // Explicitly type payload as User[]
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      })
      // Handle updateUser actions
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload as User; // Explicitly type payload as User
        state.data = state.data.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user data";
      });
  },
});

export default userSlice.reducer;
