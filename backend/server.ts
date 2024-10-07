import express, { Request, Response} from "express"
import cors from 'cors'
import morgon from 'morgon'

const PORT = process.env.PORT || 5000


const app = express()
app.use(cors())

app.use(express.json())

app.use(morgon("dev"))

app.get("/", (req: Request, res: Response) => {
  res.send("API IS RUNNING.... better catch it...")
})



app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})