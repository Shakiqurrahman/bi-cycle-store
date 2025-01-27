"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config/config");
const db_1 = require("./db/db");
(0, db_1.connectDb)()
    .then(() => {
    app_1.app.listen(config_1.config.PORT, () => {
        console.log(`☑️ Server is running at port : ${config_1.config.PORT}`);
    });
})
    .catch((error) => {
    console.log('❗MONGODB connection failed!!! ', error);
});
