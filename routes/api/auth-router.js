import express from 'express';
import {
  signup,
  signin,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} from '../../controllers/auth/index.js';

import { authenticate, isEmptyBody, upload } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { userSignupSchema, userSigninSchema, userEmailSchema } from '../../models/User.js';

const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, validateBody(userSignupSchema), signup);
authRouter.get('/verify/:verificationToken', verifyEmail);
authRouter.post('/verify', isEmptyBody, validateBody(userEmailSchema), resendVerifyEmail);
authRouter.post('/login', isEmptyBody, validateBody(userSigninSchema), signin);
authRouter.get('/current', authenticate, getCurrent);
authRouter.post('/logout', authenticate, logout);
authRouter.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

export default authRouter;
