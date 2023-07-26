import express, { json } from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import { STR_CONNECT, SECRET } from './config.js';
import goodsmodel from './models/goods.js';
import categorymodel from './models/category.js';

import mongoose from 'mongoose';

import { registerValidation, loginValidations } from './validations/auth.js';
import { getGoods, getOne, getCategory } from './controllers/goodsControlled.js';
import checkAuth from './utils/checkAuth.js';
import * as userController from './controllers/userController.js';

const PORT = 8000;

// const client = new MongoClient(STR_CONNECT);

const app = express();
app.use(cors());
app.use(json());
app.use('/uploads', express.static('uploads'));

(async () => {
  //     await client.connect();
  //     const db = client.db('test');
  //     console.log('DB connected');
  //     const collCategory = db.collection('goods_category');
  //     const collGoods = db.collection('goods');
  //     const category = await collCategory.find().toArray();
  //     const goods = await collGoods.find().toArray();
  //     // goods.map((item, ind) => {
  //     //   const newPrice = Number(item.price.replace(/\s/g, '').slice(0, -1));
  //     //   collGoods.updateOne({ title: item.title }, { $set: { price: newPrice } });
  //     // });
  //     // await collGoods.updateMany({ category: '4' }, { $set: { category: 4 } });
  //     // ========================================================================
  //     app.get('/sushihous/category', (req, res) => {
  //       res.json(category);
  //     });
  //     app.get('/sushihous/goods', (req, res) => {
  //       const searchValue = req.query.search;
  //       const selCategory = req.query.category;
  //       const filteredGoods = goods.filter(
  //         (value) =>
  //           value.title.toLowerCase().includes(searchValue) &
  //           (selCategory !== 0 ? value.category === selCategory : true),
  //       );
  //       res.json(filteredGoods);
  //     });

  mongoose.connect(STR_CONNECT).then(console.log('DB ok!'));
  // const category = new categorymodel({
  //   categoryId: 6,
  //   categoryValue: 'wok',
  //   categoryName: 'ВОК',
  // });

  // category.save();

  // const product = new goodsmodel({
  //   title: 'Сяке суши',
  //   info_count: 1,
  //   info_weigh: 35,
  //   price: 109,
  //   compos: 'Лосось',
  //   UrlMax: '/uploads/sjake-sushiMax.jpg  ',
  //   UrlMin: '/uploads/sjake-sushiMin.jpg',
  //   category: 4,
  // });
  // product.save();
  /*==========================autorisation==================================*/
  // try {
  //   await goodsmodel.updateMany({}, { $set: { category: 3 } });
  // } catch (err) {
  //   console.log(err);
  // }
  app.get('/sushihous/goods', getGoods);
  app.get('/sushihous/category', getCategory);

  app.get('/sushiHous/goods/:id', getOne);

  app.post('/sushihous/auth/login', userController.login);

  app.post('/sushihous/auth/register', registerValidation, userController.register);

  app.get('/sushihous/auth/getme', checkAuth, userController.getMe);
  /*========================================================================== */
  app.listen(PORT, (err) => {
    if (!err) {
      console.log('server OK!');
    } else console.log(err);
  });
})();
