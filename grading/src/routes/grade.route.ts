import { Router } from "express";
import {gradingController, gradingDockerController} from "../controllers/grade.controller";

const router = Router();

// router.post("/v1/grading", gradingController);
router.post("/v1/grading", gradingDockerController);
router.post("/v1/grading-docker", gradingDockerController);

export = router;
