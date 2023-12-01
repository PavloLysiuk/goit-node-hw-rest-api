import Contact from '../../models/Contact.js';
import { ctrlWrapper } from '../../decorators/index.js';
import fs from 'fs/promises';
import path from 'path';

const avatarsPath = path.resolve('public', 'avatars');

const addContact = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);

  await fs.rename(oldPath, newPath);
  const avatarURL = path.join('avatars', filename);

  const result = await Contact.create({ ...req.body, avatarURL, owner });
  res.status(201).json(result);
});

export default addContact;
