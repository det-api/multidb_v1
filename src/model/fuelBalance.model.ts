import mongoose, { Schema } from "mongoose";
import moment, { MomentTimezone } from "moment-timezone";
import connectDbs from "../utils/connect";
import { dbDistribution } from "../utils/helper";

const kyawsanDb = connectDbs("kyawsan_DbUrl");
const chawsuDb = connectDbs("chawsu_DbUrl");

export interface fuelBalanceDocument extends mongoose.Document {
  stationId: string;
  fuelType: string;
  capacity: string;
  opening: number;
  fuelIn: number;
  tankNo: number;
  cash: number;
  credit: number;
  balance: number;
  realTime: Date;
  nozzles: [];
  createAt: string;
}

const fuelBalanceSchema = new Schema({
  stationId: {
    type: Schema.Types.ObjectId,
    ref:  dbDistribution(this),
    require: true,
  },
  accessDb: { type: String, required: true },
  fuelType: { type: String, required: true },
  capacity: { type: String, required: true },
  opening: { type: Number, default: 0 },
  tankNo: { type: Number, require: true },
  fuelIn: { type: Number, default: 0 },
  cash: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  nozzles: { type: Array, required: true },
  realTime: { type: Date, default: new Date() },
  createAt: { type: String, default: new Date().toLocaleDateString(`fr-CA`) },
});

fuelBalanceSchema.pre("save", function (next) {
  const currentDate = moment().tz("Asia/Yangon").format("YYYY-MM-DD");

  if (this.realTime) {
    next();
    return;
  }
  this.realTime = new Date();
  this.createAt = currentDate;
  next();
});

const ksFuelBalanceModel = kyawsanDb.model<fuelBalanceDocument>(
  "fuelBalance",
  fuelBalanceSchema
);

const csFuelBalanceModel = chawsuDb.model<fuelBalanceDocument>(
  "fuelBalance",
  fuelBalanceSchema
);

export { ksFuelBalanceModel, csFuelBalanceModel };
