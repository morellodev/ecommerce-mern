import nextConnect from "next-connect";
import dbMiddleware from "@middlewares/database";

// Utils
import { wrapError, wrapResponse } from "@utils/wrappers";

const handler = nextConnect();

handler.use(dbMiddleware);

handler.get(async (req, res) => {
  const { size = 10, offset = 0 } = req.query;
  let response;

  try {
    const doc = await req.db
      .collection("products")
      .find({})
      .skip(offset)
      .limit(size)
      .toArray();

    response = wrapResponse(doc, { size, offset });
  } catch (error) {
    response = wrapError(error);
  }

  res.status(response.status.http).json(response);
});

export default handler;
