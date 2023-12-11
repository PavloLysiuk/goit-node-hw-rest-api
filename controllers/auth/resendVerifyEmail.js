import { ctrlWrapper } from '../../decorators/index.js';
import HttpError from '../../helpers/HttpError.js';
import sendEmail from '../../helpers/sendEmail.js';
import User from '../../models/User.js';
import 'dotenv/config';

const { BASE_URL } = process.env;

const resendVerifyEmail = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Email already verified');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationCode}">Click to verify your Email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: 'Verification email sent',
  });
});

export default resendVerifyEmail;
