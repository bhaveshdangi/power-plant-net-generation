import {Router} from 'express';
import {netGeneration} from "../controllers/net-generation";

const router = Router();

router.get('/', netGeneration);

export default router;