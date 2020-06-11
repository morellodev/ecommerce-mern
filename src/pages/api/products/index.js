import nextConnect from "next-connect";

// Middlewares
import dbMiddleware from "@middlewares/database";

// Utils
import { wrapError, wrapResponse } from "@utils/wrappers";

const handler = nextConnect()
  .use(dbMiddleware)
  .get(async (req, res) => {
    const { size = 10, offset = 0 } = req.query;

    let response;
    try {
      const doc = await req.db
        .collection("products")
        .find({})
        .skip(offset)
        .limit(size)
        .toArray();

      response = wrapResponse(doc);
    } catch (error) {
      response = wrapError(error);
    }

    res.status(response.status.http).json(response);
  })
  .post(async (req, res) => {
    const { name, unitPrice, currency, imageUrl } = req.body;

    let response;
    try {
      if (name && unitPrice && currency && imageUrl) {
        const doc = await req.db
          .collection("products")
          .insertOne({ name, unitPrice, currency, imageUrl });

        response = wrapResponse(doc);
      } else {
        throw new Error("Some fields are missing");
      }
    } catch (error) {
      response = wrapError(error);
    }

    res.status(response.status.http).json(response);
  });

export default handler;
