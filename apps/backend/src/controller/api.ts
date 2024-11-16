import { Request, Response } from "express";
import { getAllUsers, updateUser } from "../repository/userCollection";

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const { id, ...data } = req.body;
    await updateUser(id, data);
    res.json({ message: "User data updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
