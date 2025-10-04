import express from 'express';
import employeeRoutes from './routes/employeeRoute';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/employee', employeeRoutes );

app.use("/", (req, res) => {
    res.json("API is working ")
} )

export default app;