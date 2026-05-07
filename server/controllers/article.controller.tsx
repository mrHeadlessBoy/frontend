import { Request, Response } from 'express';
import { supabase } from '../config/db';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, category, excerpt, content, status } = req.body;
    
    const { data, error } = await supabase
      .from('articles')
      .insert([{ title, category, excerpt, content, status }])
      .select();

    if (error) {
      console.error("Supabase Error:", error); // Check your terminal!
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data ? data[0] : {});
  } catch (err: any) {
    console.error("Server Crash:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) return res.status(400).json(error);
  return res.status(200).json({ message: "Article erased." });
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, category, excerpt, status } = req.body;

    const { data, error } = await supabase
      .from('articles')
      .update({ title, category, excerpt, status })
      .eq('id', id)
      .select();

    if (error) throw error;
    return res.status(200).json(data[0]);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};