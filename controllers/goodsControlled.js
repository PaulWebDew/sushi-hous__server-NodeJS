import goodsmodel from '../models/goods.js';
import categorymodel from '../models/category.js';

export const getGoods = async (req, res) => {
  try {
    const goods = await goodsmodel.find();
    const searchValue = req.query.search;
    const selCategory = req.query.category;
    const filteredGoods = goods.filter(
      (value) =>
        value.title.toLowerCase().includes(searchValue) &
        (Number(selCategory) !== 0
          ? Number(value.category) === Number(selCategory)
          : value.title.includes('')),
    );
    res.json(filteredGoods);
  } catch (err) {
    console.log(err);
  }
};

export const getOne = async (req, res) => {
  const id = req.params.id;
  const item = await goodsmodel.findById(id);
  res.json(item);
};

export const getCategory = async (req, res) => {
  const category = await categorymodel.find();
  res.json(category);
};
