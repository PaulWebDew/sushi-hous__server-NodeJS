import { Schema, model } from 'mongoose';

const goodSchema = new Schema({
  title: { type: String, unique: true },
  info_count: Number,
  info_weigh: Number,
  price: Number,
  compos: String,
  UrlMin: String,
  UrlMax: String,
  category: Number,
});

export default model('good', goodSchema);
