import {Router} from 'express';
import {state} from '../controllers/states';

const router = Router();

router.get('/', state);

export default router;