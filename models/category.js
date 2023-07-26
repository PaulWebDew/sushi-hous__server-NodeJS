import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  categoryId: Number,
  categoryValue: String,
  categoryName: String,
});

export default model('category', categorySchema);
