import mongoose, { Schema } from "mongoose";
import { getDailyReportByDate } from "../service/dailyReport.service";
import moment from "moment-timezone";
import { coustomerDocument } from "./coustomer.model";

export interface detailSaleDocument extends mongoose.Document {
  stationDetailId: string;
  dailyReportDate: string;
  vocono: string;
  carNo: string;

  cashType: string;
  casherCode: string;
  couObjId: coustomerDocument["_id"];
  isError: boolean;

  vehicleType: string;
  nozzleNo: string;
  fuelType: string;
  salePrice: number;
  saleLiter: number;
  totalPrice: number;
  totalizer_liter: number;
  createAt: Date;
}

const detailSaleSchema = new Schema({
  stationDetailId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "stationDetail",
  },
  vocono: { type: String, required: true, unique: true }, //g
  carNo: { type: String, default: null }, //g
  vehicleType: { type: String, default: "car" }, //g
  nozzleNo: { type: String, required: true }, //g
  fuelType: { type: String, required: true }, //g
  //update
  cashType: {
    type: String,
    default: "Cash",
    enum: ["Cash", "KBZ_Pay", "Credit", "FOC", "Debt", "Others"],
  },
  casherCode: { type: String, required: true },
  couObjId: { type: Schema.Types.ObjectId, default: null },
  isError: { type: Boolean, default: false },

  salePrice: { type: Number, required: true },
  saleLiter: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  totalizer_liter: { type: Number, required: true },
  totalizer_amount: { type: Number, required: true },
  dailyReportDate: {
    type: String,
    default: new Date().toLocaleDateString(`fr-CA`),
  },
  createAt: { type: Date, default: new Date() },
});

detailSaleSchema.pre("save", function (next) {
  // console.log(this);
  // if (this.createAt) {
  //   console.log("wee zzoooo");
  // }
  next();
});
const detailSaleModel = mongoose.model<detailSaleDocument>(
  "detailSale",
  detailSaleSchema
);

export default detailSaleModel;
