import { DatabaseConnection } from "./main/database/typeorm.connection";
import { runServer } from "./main/server/express.server";

DatabaseConnection.connect().then(() => {
  runServer();
});

