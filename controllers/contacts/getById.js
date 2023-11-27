import Contact from '../../models/Contact.js';
import { HttpError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const getById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
});

export default getById;
