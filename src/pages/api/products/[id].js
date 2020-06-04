import nextConnect from "next-connect";
import dbMiddleware from "@middlewares/database";
import { ObjectId } from "mongodb";

// Utils
import { wrapResponse } from "@utils/wrapResponse";

const handler = nextConnect();

handler.use(dbMiddleware);

handler.get(async (req, res) => {
  const { id } = req.query;

  const doc = await req.db
    .collection("products")
    .findOne({ _id: ObjectId(id) });

  const response = wrapResponse(doc, { id });

  res.status(response.status.http).json(response);
});

export default handler;
