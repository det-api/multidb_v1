import mongoose, { Schema } from "mongoose";
import connectDbs from "../utils/connect";


const kyawsanDb = connectDbs("kyawsan_DbUrl");
const chawsuDb = connectDbs("chawsu_DbUrl");

export interface stationDetailDocument extends mongoose.Document {
  name: string;
  location: string;
  lienseNo: string;
  deviceCount: number;
  nozzleCount: number;
}

const stationDetailSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true, unique: true },
  lienseNo: { type: String, required: true, unique: true },
  deviceCount: { type: Number, required: true },
  nozzleCount: { type: Number, required: true },
});

const ksStationDetailModel = kyawsanDb.model<stationDetailDocument>(
  "stationDetail",
  stationDetailSchema
);

const csStationDetailModel = chawsuDb.model<stationDetailDocument>(
  "stationDetail",
  stationDetailSchema
);

export {ksStationDetailModel , csStationDetailModel };
