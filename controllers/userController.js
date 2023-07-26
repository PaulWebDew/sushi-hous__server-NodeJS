import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import userModel from '../models/user.js';
import { SECRET } from '../config.js';

export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }
    const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '30d' });
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    res.status(404).json({ message: 'не удалось авторизоваться', error: err });
    console.log(err);
  }
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const doc = new userModel({
        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hash,
      });
      const user = await doc.save();
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '30d' });

      const { passwordHash, ...userData } = user._doc;
      res.json({
        ...userData,
        token,
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'не удалось зарегистрироваться', error: err });
    console.log(err);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const { passwordHash, ...userData } = user._doc;
    const token = req.headers.authorization;
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.json({ succes: false });
  }
};
