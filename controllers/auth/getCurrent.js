import { ctrlWrapper } from '../../decorators/index.js';

const getCurrent = ctrlWrapper(async (req, res) => {
  const { username, email } = req.user;
  res.json({ username, email });
});

export default getCurrent;
