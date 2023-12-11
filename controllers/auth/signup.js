import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import { HttpError, sendEmail } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';
import 'dotenv/config';

const { BASE_URL } = process.env;

const signup = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify your Email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
});

export default signup;
