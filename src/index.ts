import express from "express"
import {config} from "dotenv"
import hostelRoutes from "./routes/hostel"
import { connectDB } from "./config/db";
import cors from "cors";
config();

const app = express()
app.use(express.json());
app.use(cors({
    origin:"*"
}))

connectDB();
const PORT= process.env.PORT as string
console.log(PORT);
app.listen(PORT,()=>{
    console.log(`Server is listning on ${PORT}`)
})

app.use("/api/hostels",hostelRoutes);