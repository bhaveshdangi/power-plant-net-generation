import {RequestHandler} from 'express';
import NetGenerationService from "../service/NetGenerationService";

export const state: RequestHandler = (req, res, next) => {

    res.json(NetGenerationService.getStates());
}