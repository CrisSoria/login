import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup } from "../middelewares";

router.post(
  "/signup",
  [verifySignup.checkDuplicatedUsernameOrMail, verifySignup.checkRolesExisted],
  authCtrl.signup
);

router.post("/signin", authCtrl.signin);

export default router;
