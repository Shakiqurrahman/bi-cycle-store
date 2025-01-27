import { app } from './app';
import { config } from './config/config';
import { connectDb } from './db/db';

connectDb()
    .then(() => {
        app.listen(config.PORT, () => {
            console.log(`☑️ Server is running at port : ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.log('❗MONGODB connection failed!!! ', error);
    });
