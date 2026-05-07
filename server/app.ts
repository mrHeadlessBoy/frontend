import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import articleRoutes from './routes/article.routes';

const app = express();

app.use(express.json());
app.use(cors({
  origin: true, // Your Vite frontend URL
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// Routes - This creates the /v1/api/articles endpoint
app.use('/v1/api', authRoutes);
app.use('/v1/api', articleRoutes);

export default app;