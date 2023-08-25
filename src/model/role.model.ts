import mongoose from "mongoose";
import { Schema } from "mongoose";
import { permitDocument } from "./permit.model";
import connectDbs from "../utils/connect";

const controlDb = connectDbs("controlDbUrl");

export interface roleDocument extends mongoose.Document {
  name: string;
  permits: permitDocument["_id"];
}

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  permits: [{ type: Schema.Types.ObjectId, ref: "permit" }],
});

const roleModel = controlDb.model<roleDocument>("role", roleSchema);
export default roleModel;
