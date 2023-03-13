import { DataSource } from "typeorm";
import typeormConfig from "../config/Typeorm.config";

export class DatabaseConnection {

  private static _connection: DataSource;

  public static async connect() {
    if(!this._connection) {
      this._connection = await typeormConfig.initialize();
    }
    console.log('Database starting...')
  }

  public static get connection() {
    if(!this._connection) {
      throw new Error('Connection starting...')
    }
    return this._connection;
  }

}