import {
  addStationDetailHandler,
  deleteStationDetailHandler,
  getStationDetailHandler,
  updateStationDetailHandler,
} from "../controller/stationDetail.controller";

import { modelController } from "../middleware/modelControl";
import { hasAnyPermit } from "../middleware/permitValidator";
import { roleValidator } from "../middleware/roleValidator";
import { validateAll, validateToken } from "../middleware/validator";
import { allSchemaId, stationDetailSchema } from "../schema/scheama";
const stationDetailRoute = require("express").Router();

// stationDetailRoute.get("/", getAllStationDetailHandler);

stationDetailRoute.get(
  "/:page",
  validateToken,
  hasAnyPermit(["view"]),
  modelController,
  getStationDetailHandler
);

stationDetailRoute.post(
  "/",
  validateToken,
  roleValidator(["admin"]),
  hasAnyPermit(["add"]),
  validateAll(stationDetailSchema),
  modelController,
  addStationDetailHandler
);

stationDetailRoute.patch(
  "/",
  validateToken,
  roleValidator(["admin"]),
  hasAnyPermit(["edit"]),
  validateAll(allSchemaId),
  modelController,
  updateStationDetailHandler
);

stationDetailRoute.delete(
  "/",
  validateToken,
  validateAll(allSchemaId),
  roleValidator(["admin"]),
  hasAnyPermit(["delete"]),
  modelController,
  deleteStationDetailHandler
);

export default stationDetailRoute;
