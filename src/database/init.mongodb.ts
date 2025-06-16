"use strict";
import Chalk from "chalk";
import mongoose from "mongoose";

class Database {
    private static instance: Database;
    private strConnectDB: string =
        "mongodb+srv://phamhongsang12x10:1S72ug0sn4hOyiaX@cluster0.e8gdxf0.mongodb.net/?retryWrites=true&w=majority&appName= ShopDev";
    constructor() {
        this.connect();
    }

    public async connect() {
        try {
            await mongoose.connect(this.strConnectDB);
            console.log(Chalk.blue("CONNECT DATABASE SUCCESSFULLY <3"));
        } catch (error) {
            console.log(Chalk.red("CONNECT DATABASE FAILED !!!"));
        }
    }

    public static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceDatabase: Database = Database.getInstance();

export default instanceDatabase;
