import { ctrlWrapper } from '../../decorators/index.js';
import User from '../../models/User.js';

const logout = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({ message: 'Logout success' });
});

export default logout;
