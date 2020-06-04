import nextConnect from "next-connect";
import dbMiddleware from "@middlewares/database";
import { ObjectId } from "mongodb";

// Utils
import { wrapError, wrapResponse } from "@utils/wrappers";

const handler = nextConnect();

handler.use(dbMiddleware);

handler.get(async (req, res) => {
  const { id } = req.query;
  let response;

  try {
    const doc = await req.db
      .collection("products")
      .findOne({ _id: ObjectId(id) });

    response = wrapResponse(doc, { id });
  } catch (error) {
    response = wrapError(error);
  }

  res.status(response.status.http).json(response);
});

export default handler;
