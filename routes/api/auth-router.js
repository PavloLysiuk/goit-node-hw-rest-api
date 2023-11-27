import express from 'express';
import { signup, signin, getCurrent, logout } from '../../controllers/auth/index.js';

import { authenticate, isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { userSignupSchema, userSigninSchema } from '../../models/User.js';

const authRouter = express.Router();

authRouter.post('/register', isEmptyBody, validateBody(userSignupSchema), signup);
authRouter.post('/login', isEmptyBody, validateBody(userSigninSchema), signin);
authRouter.get('/current', authenticate, getCurrent);
authRouter.post('/logout', authenticate, logout);

export default authRouter;
