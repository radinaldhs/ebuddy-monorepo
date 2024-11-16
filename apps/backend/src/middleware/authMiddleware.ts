import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(403)
        .json({ message: "Forbidden: Invalid token", error: error.message });
    } else {
      res
        .status(403)
        .json({ message: "Forbidden: Invalid token", error: String(error) });
    }
  }
};
