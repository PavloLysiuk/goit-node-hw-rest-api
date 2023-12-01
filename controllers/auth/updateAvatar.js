import { ctrlWrapper } from '../../decorators/index.js';
import User from '../../models/User.js';
import fs from 'fs/promises';
import path from 'path';
import Jimp from 'jimp';

const avatarsPath = path.resolve('public', 'avatars');

const updateAvatar = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);

  await fs.rename(oldPath, newPath);
  await Jimp.read(newPath).resize(250, 250).write(newPath);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(201).json({
    avatarURL,
  });
});

export default updateAvatar;
