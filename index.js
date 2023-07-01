import express, { json } from 'express';
import cors from 'cors';
import mongodb, { MongoClient } from 'mongodb';
import { STR_CONNECT } from './config.js';

const PORT = 8000;

const client = new MongoClient(STR_CONNECT);

const app = express();
app.use(cors());
app.use(json());
(async () => {
  try {
    await client.connect();
    const db = client.db('test');
    console.log('DB connected');
    const collCategory = db.collection('goods_category');
    const category = await collCategory.find().toArray();
    const collGoods = db.collection('goods');
    const goods = await collGoods.find().toArray();
    // goods.map((item, ind) => {
    //   const newPrice = Number(item.price.replace(/\s/g, '').slice(0, -1));
    //   collGoods.updateOne({ title: item.title }, { $set: { price: newPrice } });
    // });
    // await collGoods.updateMany({ category: '4' }, { $set: { category: 4 } });
    // ========================================================================
    app.get('/sushihous/category', (req, res) => {
      res.json(category);
    });
    app.get('/sushihous/goods', (req, res) => {
      const searchValue = req.query.search;
      const selCategory = req.query.category;
      const filteredGoods = goods.filter(
        (value) =>
          value.title.toLowerCase().includes(searchValue) &
          (selCategory != 0 ? value.category == selCategory : true),
      );
      res.json(filteredGoods);
    });
    app.listen(PORT, (err) => {
      if (!err) {
        console.log('server OK!');
      } else console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
})();
