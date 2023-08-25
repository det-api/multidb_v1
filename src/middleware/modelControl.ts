import { NextFunction, Response, Request } from "express";
import { collectionGet } from "../service/collection.service";

export const modelController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.body.user);
  if (req.body.user[0].roles[0].name == "admin") next();
  let collection = await collectionGet({ _id: req.body.user[0].collectionId });

  if (!collection) next(new Error("you cannot access"));

  // console.log(req.body.user[0]._id.toString());
  let result = collection[0].userCollection.find(ea => ea == req.body.user[0]._id);
  console.log(result);
};
