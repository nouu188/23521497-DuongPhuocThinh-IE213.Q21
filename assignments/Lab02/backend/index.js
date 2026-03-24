import "dotenv/config";
import { MongoClient } from "mongodb";
import app from "./server.js";
import MoviesDAO from "./dao/moviesDAO.js";

const port = process.env.PORT || 3000;

MongoClient.connect(process.env.MONGODB_URI)
  .then(async (client) => {
    await MoviesDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
