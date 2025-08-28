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

// Define routes BEFORE listen
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/hostels", hostelRoutes);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  console.log(PORT);
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
  })
}

// Export for Vercel
export default app;