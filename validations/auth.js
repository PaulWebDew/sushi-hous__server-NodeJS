import { body } from 'express-validator';

export const registerValidation = [
  body('name', 'Не менее трех символов').trim().isLength({ min: 3 }),
  body('login', 'Не менее трех символов').trim().isLength({ min: 3 }),
  body('email', 'Неверный формат почты').trim().isEmail(),
  body('password', 'Минимальная длинна 5 символов').trim().isLength({ min: 5 }),
  body('avatarUrl', 'Неверный формат ссылки').optional().trim().isURL(),
];

export const loginValidations = [
  body('email', 'Неверный формат почты').trim().isEmail(),
  body('password', 'Минимальная длинна 5 символов').trim().isLength({ min: 5 }),
];
