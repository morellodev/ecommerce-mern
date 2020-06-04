import nextConnect from "next-connect";
import dbMiddleware from "@middlewares/database";

// Utils
import { wrapResponse } from "@utils/wrapResponse";

const handler = nextConnect();

handler.use(dbMiddleware);

handler.get(async (req, res) => {
  const { size = 10, offset = 0 } = req.query;

  const doc = await req.db
    .collection("products")
    .find({})
    .skip(offset)
    .limit(size)
    .toArray();

  const response = wrapResponse(doc, { size, offset });

  res.status(response.status.http).json(response);
});

export default handler;
