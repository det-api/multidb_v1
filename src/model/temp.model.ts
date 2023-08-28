import mongoose, { Schema } from "mongoose";
import connectDbs from "../utils/connect";

const controlDb = connectDbs("controlDbUrl");

export interface tempDocument extends mongoose.Document {
  email: string;
  password: string;
}

const tempSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const tempModel = controlDb.model<tempDocument>("temp", tempSchema);

export default tempModel;
