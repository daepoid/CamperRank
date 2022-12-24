import { Router } from 'express';
import { gradeV1, gradeV2 } from '../controllers/grade.controller';

const router = Router();

router.post('/v1/grading', gradeV1);
router.post('/v1/docker', gradeV2);

export = router;
