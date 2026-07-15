import { Router } from "express";
import { register, login } from "../controllers/authController";
import { registerValidator, loginValidator } from "../validators/authValidator";
import { validateRequest } from "../middlewares/validateMiddleware";

const router = Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);

export default router;