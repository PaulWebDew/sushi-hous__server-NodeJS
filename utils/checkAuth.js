import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET);
      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Нет доступа ltr' });
    }
  } else {
    return res.status(403).json({ message: 'Нет доступа' });
  }
};
