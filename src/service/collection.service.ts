import { FilterQuery } from "mongoose";

import { UserDocument } from "../model/user.model";
import collectionModel, { collectionDocument } from "../model/collection.model";


export const collectionGet = async (
  query: FilterQuery<collectionDocument>
) => {
  try {
    return await collectionModel
      .find(query)
      .lean()
      .populate("userCollection")
      .select("-__v");

  } catch (e) {
    throw new Error(e);
  }
};

export const collectionAdd = async (body: collectionDocument) => {
  try {
    return await new collectionModel(body).save();
  } catch (e) {
    throw new Error(e);
  }
};

export const collectionDelete = async (
  query: FilterQuery<collectionDocument>
) => {
  try {
    return await collectionModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};

export const collectionAddUser= async (
  collectionId: FilterQuery<collectionDocument>,
   user: UserDocument["_id"]
) => {
  try {
    // console.log(collectionId , user)
    await collectionModel.findByIdAndUpdate(collectionId, {
      $push: { userCollection:  user },
    });
    return collectionModel.findById(collectionId);
  } catch (e) {
    throw new Error(e);
  }
};

export const collectionRemoveUser= async (
  collectionId: FilterQuery<collectionDocument>,
   user: UserDocument["_id"]
) => {
  try {
    await collectionModel.findByIdAndUpdate(collectionId, {
      $pull: { userCollection:  user },
    });
    return collectionModel.findById(collectionId);
  } catch (e) {
    throw new Error(e);
  }
};
