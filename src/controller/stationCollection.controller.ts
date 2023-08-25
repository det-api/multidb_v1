import { Request, Response, NextFunction } from "express";
import fMsg from "../utils/helper";

import {
  collectionAdd,
  collectionAddUser,
  collectionDelete,
  collectionGet,
  collectionRemoveUser,
} from "../service/collection.service";
import { getUser } from "../service/user.service";

export const getCollectionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await collectionGet(req.query);
    fMsg(res, "Collection are here", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const addCollectionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await collectionAdd(req.body);
    fMsg(res, "New Collection was added", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const deletCollectionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await collectionDelete(req.query);
    fMsg(res, "Collection was deleted");
  } catch (e) {
    next(new Error(e));
  }
};

export const collectionAddPermitHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let collection = await collectionGet({
      _id: req.body.collectionId,
    });

    let users = await getUser({ _id: req.body.userId });

    // let users;

    // console.log(users);

    // let ksUserDetail = await getUser({ _id: req.body.userId });
    // if (ksUserDetail.length == 0) {
    //   let csUserDetail = await getUser({ _id: req.body.userId });
    //   users = csUserDetail;
    // } else {
    //   users = ksUserDetail;
    // }
    if (collection.length == 0 || users.length == 0) {
      next(new Error("collection or station not found"));
    }
    let foundUsers = collection[0].userCollection.find(
      (ea: any) => ea._id == req.body.userId
    );
    if (foundUsers) {
      return next(new Error("user already in exist"));
    }
    let result = await collectionAddUser(
      req.body.collectionId,
      req.body.userId
    );
    console.log(result)
    fMsg(res, "user added ", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const collectionRemovePermitHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let collection = await collectionGet({
      _id: req.body.collectionId,
    });

    let foundStation = collection[0]["userCollection"].find(
      (ea: {}) => ea["_id"] == req.body.userId
    );
    if (!collection || !foundStation) {
      throw new Error("collection or user not found");
    }
    let result = await collectionRemoveUser(
      req.body.collectionId,
      req.body.userId
    );
    fMsg(res, "user removed ", result);
  } catch (e) {
    next(new Error(e));
  }
};
