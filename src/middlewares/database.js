import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(
  "mongodb+srv://dennis_morello:SgpbppDvlc8blhe0@cluster0-f9sr4.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function database(req, res, next) {
  if (!client.isConnected()) {
    await client.connect();
  }

  req.dbClient = client;
  req.db = client.db("ubw");

  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
