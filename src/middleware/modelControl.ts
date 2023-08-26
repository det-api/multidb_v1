import { NextFunction, Response, Request } from "express";
import { collectionGet } from "../service/collection.service";

export const modelController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch the collection based on the user's collectionId
    const collection = await collectionGet({
      _id: req.body.user[0].collectionId,
    });

    // If collection doesn't exist, throw an error
    if (collection.length == 0) {
      throw new Error("You cannot access this collection");
    }

    // Check if the user's ID is present in the userCollection
    const result = collection[0].stationCollection.find((ea) =>
      ea._id.equals(req.body.user[0].stationId)
    );

    if (!result) {
      if (
        req.body.user[0].roles[0].name != "admin" &&
        req.body.user[0].roles[0].name != "PPRD" &&
        req.query.collectionId
      )
        throw new Error("You cannot access this");

      let accDb = await collectionGet({
        _id: req.query.collectionId,
      });
      delete req.query.collectionId;
      req.body.modelName = accDb[0].collectionName;
      next();
    } else {
      req.body.modelName = collection[0].collectionName;
      next(); // Proceed to the next middleware
    }
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};
