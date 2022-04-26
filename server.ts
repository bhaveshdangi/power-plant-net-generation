import express, {Express, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import netGeneration from "./src/api-routes/net-generation";
import states from "./src/api-routes/states";
import cors from 'cors';

dotenv.config();

const app: Express = express(),
    bodyParser = require("body-parser");
const port = process.env.PORT || 80;

app.use('/states', states);
app.use('/net-generation', netGeneration);
app.use(cors())

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/dist/angular-google-maps-example/"));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});
app.get('/', (req,res) => {
    console.log(process.cwd());
    res.sendFile(process.cwd()+"/dist/angular-google-maps-example/index.html")
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});