import { ctrlWrapper } from '../../decorators/index.js';
import { HttpError } from '../../helpers/index.js';
import User from '../../models/User.js';

const verifyEmail = ctrlWrapper(async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(401, 'Email not found');
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: '' });

  res.json({
    message: 'Email verified successfully',
  });
});
export default verifyEmail;
