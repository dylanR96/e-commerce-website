import express, { Request, Response} from "express";
import cors from 'cors';
import morgan from 'morgan';
import dotenv from "dotenv"
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";

const PORT = process.env.PORT || 5000


const app = express()
app.use(cors())

app.use(express.json())

app.use(morgan("dev"))
dotenv.config()

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("API IS RUNNING.... better catch it...")
})

app.use("/api/users", userRoutes)



app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})