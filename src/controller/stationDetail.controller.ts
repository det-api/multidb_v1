import { Request, Response, NextFunction } from "express";
import fMsg from "../utils/helper";
import {
  getStationDetail,
  stationDetailPaginate,
  // addStationDetail,
  // updateStationDetail,
  // deleteStationDetail,
  // stationDetailPaginate,
} from "../service/stationDetail.service";
import {
  csStationDetailModel,
  ksStationDetailModel,
} from "../model/stationDetail.model";

export const getAllStationDetailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let ksData = await getStationDetail(req.query, ksStationDetailModel);
    let csData = await getStationDetail(req.query, csStationDetailModel);

    let result = [...ksData, ...csData];

    fMsg(res, "StationDetail are here", result);
  } catch (e) {
    next(new Error(e));
  }
};

export const getStationDetailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let pageNo = Number(req.params.page);

    if (!pageNo) throw new Error("You need page number");

    let model = req.body.modelName;

    let { data, count } = await stationDetailPaginate(pageNo, req.query, model);
    fMsg(res, "StationDetail are here", data, count);
  } catch (e) {
    next(new Error(e));
  }
};

// export const addStationDetailHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let result = await addStationDetail(req.body);
//     fMsg(res, "New StationDetail data was added", result);
//   } catch (e) {
//     next(new Error(e));
//   }
// };

// export const updateStationDetailHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let result = await updateStationDetail(req.query, req.body);
//     fMsg(res, "updated StationDetail data", result);
//   } catch (e) {
//     next(new Error(e));
//   }
// };

// export const deleteStationDetailHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await deleteStationDetail(req.query);
//     fMsg(res, "StationDetail data was deleted");
//   } catch (e) {
//     next(new Error(e));
//   }
// };
