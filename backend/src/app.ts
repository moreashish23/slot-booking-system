import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import healthRoutes from "./routes/healthRoutes";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app: Application = express();

// Core middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base routes
app.use("/api/health", healthRoutes);

// 404 handler 
app.use(notFoundMiddleware);

// Global error handler
app.use(errorMiddleware);

export default app;