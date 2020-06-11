import nextConnect from "next-connect";
import { ObjectId } from "mongodb";

// Middlewares
import dbMiddleware from "@middlewares/database";

// Utils
import { wrapError, wrapResponse } from "@utils/wrappers";

const handler = nextConnect()
  .use(dbMiddleware)
  .get(async (req, res) => {
    const { id } = req.query;

    let response;
    try {
      const doc = await req.db
        .collection("products")
        .findOne({ _id: ObjectId(id) });

      response = wrapResponse(doc);
    } catch (error) {
      response = wrapError(error);
    }

    res.status(response.status.http).json(response);
  })
  .put(async (req, res) => {
    const { id } = req.query;

    let response;
    try {
      const doc = await req.db
        .collection("products")
        .replaceOne({ _id: ObjectId(id) }, req.body);

      response = wrapResponse(doc);
    } catch (error) {
      response = wrapError(error);
    }

    res.status(response.status.http).json(response);
  })
  .delete(async (req, res) => {
    const { id } = req.query;

    let response;
    try {
      const doc = await req.db
        .collection("products")
        .deleteOne({ _id: ObjectId(id) });

      response = wrapResponse(doc);
    } catch (error) {
      response = wrapError(error);
    }

    res.status(response.status.http).json(response);
  });

export default handler;
