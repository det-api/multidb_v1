import { Response } from "express";
import config from "config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  csStationDetailModel,
  ksStationDetailModel,
} from "../model/stationDetail.model";

const saltWorkFactor = config.get<number>("saltWorkFactor");
const secretKey = config.get<string>("secretKey");
const salt = bcrypt.genSaltSync(saltWorkFactor);

//password checking and converting
export const encode = (payload: string) => bcrypt.hashSync(payload, salt);
export const compass = (payload: string, dbPass: string) =>
  bcrypt.compareSync(payload, dbPass);

//tokenization
export const createToken = (payload: {}) =>
  jwt.sign(payload, secretKey, { expiresIn: "12h" });
export const checkToken = (payload: string): any =>
  jwt.verify(payload, secretKey);

//get prev date
export let previous = (date = new Date()) => {
  let previousDate = new Date();
  previousDate.setDate(date.getDate() - 1);

  return previousDate.toLocaleDateString(`fr-CA`);
};

//for response
const fMsg = (
  res: Response,
  msg: string = "all success",
  result: any = [],
  route: string | null = null,
  totalCount: number | null = null
) => {
  if (totalCount != null) {
    res.status(200).json({ con: true, msg, route, result, totalCount });
  } else {
    res.status(200).json({ con: true, msg, result });
  }
};

export const fMsg2 = (
  res: Response,
  status: number = 200,
  msg: string = "all success",
  result: any = []
) => {
  res.status(status).json({ con: true, msg, result });
};

export const dBSelector = (dbModel: string, dbOne, dbTwo) => {
  if (dbModel === "kyaw_san") {
    return dbOne;
  } else if (dbModel === "common") {
    return dbTwo;
  } else {
    throw new Error("Invalid model name");
  }
};

export const dbDistribution = (ea) => {
  if (ea.accessDb === "kyaw_san") {
    return ksStationDetailModel;
  } else if (ea.databaseType === "common") {
    return csStationDetailModel;
  } else {
    return ksStationDetailModel;
  }
};

export default fMsg;
