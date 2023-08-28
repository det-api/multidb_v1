import { FilterQuery, UpdateQuery } from "mongoose";
import { dailyReportDocument } from "../model/dailyReport.model";
import config from "config";
import { Model } from "mongoose";
const limitNo = config.get<number>("page_limit");

export const getDailyReport = async (
  query: FilterQuery<dailyReportDocument>,
  dbModel: Model<dailyReportDocument>
) => {
  try {
    return await dbModel
      .find(query)
      .lean()
      .populate("stationId")
      .select("-__v");
  } catch (e) {
    throw new Error(e);
  }
};

export const addDailyReport = async (
  body: dailyReportDocument | {},
  dbModel: Model<dailyReportDocument>
) => {
  try {
    return await new dbModel(body).save();
  } catch (e) {
    throw new Error(e);
  }
};

export const updateDailyReport = async (
  query: FilterQuery<dailyReportDocument>,
  body: UpdateQuery<dailyReportDocument> ,
  dbModel: Model<dailyReportDocument>
) => {
  try {
    await dbModel.updateMany(query, body);
    return await dbModel.find(query).lean();
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteDailyReport = async (
  query: FilterQuery<dailyReportDocument>, 
  dbModel: Model<dailyReportDocument>
) => {
  try {
    let DailyReport = await dbModel.find(query);
    if (!DailyReport) {
      throw new Error("No DailyReport with that id");
    }
    return await dbModel.deleteMany(query);
  } catch (e) {
    throw new Error(e);
  }
};

export const getDailyReportByDate = async (
  query: FilterQuery<dailyReportDocument>,
  d1: Date,
  d2: Date,
  pageNo: number,
  dbModel: Model<dailyReportDocument>
): Promise<dailyReportDocument[]> => {
  const reqPage = pageNo == 1 ? 0 : pageNo - 1;
  const skipCount = limitNo * reqPage;

  const filter: FilterQuery<dailyReportDocument> = {
    ...query,
    date: {
      $gt: d1,
      $lt: d2,
    },
  };

  let result = await dbModel
    .find(filter)
    .sort({ date: -1 })
    .skip(skipCount)
    .limit(limitNo)
    .populate("stationId")
    .select("-__v");
  return result;
};

export const dailyReportPaginate = async (
  pageNo: number,
  query: FilterQuery<dailyReportDocument>,
  dbModel: Model<dailyReportDocument>
): Promise<{ count: number; data: dailyReportDocument[] }> => {
  const reqPage = pageNo == 1 ? 0 : pageNo - 1;
  const skipCount = limitNo * reqPage;

  const data = await dbModel
    .find(query)
    .sort({ date: -1 })
    .skip(skipCount)
    .limit(limitNo)
    .populate("stationId")
    .select("-__v");

  const count = await dbModel.countDocuments(query);

  return { count, data };
};

export const getDailyReportByMonth = async (
  query: FilterQuery<dailyReportDocument>,
  year: number,
  month: number,
  dbModel: Model<dailyReportDocument>
): Promise<dailyReportDocument[]> => {
  const startDate = new Date(year, month - 1, 1, 0, 0, 0); // Month is zero-based
  const endDate = new Date(year, month, 1, 0, 0, 0); // Month is zero-based
  const filter: FilterQuery<dailyReportDocument> = {
    ...query,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  const result = await dbModel.find(filter).select("-__v");

  return result;
};
