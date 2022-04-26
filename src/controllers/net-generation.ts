import {RequestHandler} from 'express';
import NetGenerationService from "../service/NetGenerationService";

export const netGeneration: RequestHandler = (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(NetGenerationService.getNetGenerations(String(req.query.state)));

}