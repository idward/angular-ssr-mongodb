import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('article', ArticleSchema);
export default Article;
