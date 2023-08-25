import mongoose from "mongoose";
import { Schema } from "mongoose";
import connectDbs from "../utils/connect";
import UserModel, { UserDocument } from "./user.model";

const controlDb = connectDbs("controlDbUrl");

export interface collectionDocument extends mongoose.Document {
  collectionName: string;
  userCollection: UserDocument["_id"];
}

const collectionSchema = new Schema({
  collectionName: { type: String, required: true, unique: true },
  userCollection: [{ type: Schema.Types.ObjectId, ref: UserModel }],
});

const collectionModel = controlDb.model<collectionDocument>(
  "collection",
  collectionSchema
);
export default collectionModel;
