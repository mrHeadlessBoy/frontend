import { Request, Response } from 'express';
import { supabase } from '../config/db';

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.rpc('verify_admin_password', {
      p_email: email,
      p_password: password,
    });

    if (error || !data) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user: email });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error"});
  }
};