import { ctrlWrapper } from '../../decorators/index.js';
import { HttpError } from '../../helpers/index.js';
import User from '../../models/User.js';

const verifyEmail = ctrlWrapper(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(401, 'Email not found');
  }
  await User.updateOne( { verify: true, verificationToken: null });

  res.json({
    message: 'Email verified successfully',
  });
});
export default verifyEmail;
