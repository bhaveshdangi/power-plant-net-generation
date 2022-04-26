import express, {Express, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import netGeneration from "./src/api-routes/net-generation";
import states from "./src/api-routes/states";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/states', states);
app.use('/net-generation', netGeneration);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});