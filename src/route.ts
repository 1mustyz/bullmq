import { Router } from "express";
import { bulkArray, bulkArrayWithoutWorker } from "./controller";
const router = Router()

router.get('/', bulkArray);
router.get('/no-worker', bulkArrayWithoutWorker)

export default router  