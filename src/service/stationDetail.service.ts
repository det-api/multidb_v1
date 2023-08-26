import { FilterQuery, UpdateQuery, Model } from "mongoose";
import { stationDetailDocument } from "../model/stationDetail.model";
import config from "config";

// export const getStationDetail = async (
//   query: FilterQuery<stationDetailDocument>
// ) => {
//   try {
//     let ksData = await ksStationDetailModel.find(query).lean().select("-__v");
//     let csData = await csStationDetailModel.find(query).lean().select("-__v");
//     return [ksData , csData]
//   } catch (e) {
//     throw new Error(e);
//   }
// };

export const getStationDetail = async (
  query: FilterQuery<stationDetailDocument>,
  model: Model<stationDetailDocument>
) => {
  try {
    return await model.find(query).lean().select("-__v");
  } catch (e) {
    throw new Error(e);
  }
};

export const stationDetailPaginate = async (
  pageNo: number,
  query: FilterQuery<stationDetailDocument>,
  dbModel: Model<stationDetailDocument>
): Promise<{ count: number; data: stationDetailDocument[] }> => {
  const limitNo = config.get<number>("page_limit");
  const reqPage = pageNo == 1 ? 0 : pageNo - 1;
  const skipCount = limitNo * reqPage;
  const data = await dbModel
    .find(query)
    .skip(skipCount)
    .limit(limitNo)
    .lean()
    .select("-__v");

  const count = await dbModel.countDocuments(query);

  return { data, count };
};

export const addStationDetail = async (
  body: stationDetailDocument,
  dbModel: Model<stationDetailDocument>
) => {
  try {
    return await new dbModel(body).save();
  } catch (e) {
    throw new Error(e);
  }
};

// export const updateStationDetail = async (
//   query: FilterQuery<stationDetailDocument>,
//   body: UpdateQuery<stationDetailDocument>
// ) => {
//   try {
//     await stationDetailModel.updateMany(query, body);
//     return await stationDetailModel.find(query).lean();
//   } catch (e) {
//     throw new Error(e);
//   }
// };

// export const deleteStationDetail = async (
//   query: FilterQuery<stationDetailDocument>
// ) => {
//   try {
//     let StationDetail = await stationDetailModel.find(query);
//     if (!StationDetail) {
//       throw new Error("No StationDetail with that id");
//     }
//     return await stationDetailModel.deleteMany(query);
//   } catch (e) {
//     throw new Error(e);
//   }
// };
