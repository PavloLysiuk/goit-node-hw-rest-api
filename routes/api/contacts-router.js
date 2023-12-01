import express from 'express';
import {
  getAll,
  getById,
  removeById,
  updateById,
  addContact,
  updateStatusContact,
} from '../../controllers/contacts/index.js';
import { authenticate, isEmptyBody, IsValidId, upload } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from '../../models/Contact.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter
  .route('/')
  .get(getAll)
  .post(upload.single('avatarURL'), isEmptyBody, validateBody(contactAddSchema), addContact);
contactsRouter
  .route('/:contactId')
  .get(IsValidId, getById)
  .delete(IsValidId, removeById)
  .put(IsValidId, isEmptyBody, validateBody(contactUpdateSchema), updateById);

contactsRouter.patch(
  '/:contactId/favorite',
  IsValidId,
  isEmptyBody,
  validateBody(contactFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
