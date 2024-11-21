import { app } from './app';
import { port } from './config/config';
import { connectDb } from './db/db';

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`☑️ Server is running at port : ${port}`);
    });
  })
  .catch((error) => {
    console.log('❗MONGODB connection failed!!! ', error);
  });
