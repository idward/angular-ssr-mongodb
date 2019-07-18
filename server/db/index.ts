import * as mongoose from 'mongoose';

// connect database
mongoose
  .connect('mongodb://localhost:27017/article-server', {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Database connect successfully');
  })
  .catch(err => {
    console.log(err);
  });
