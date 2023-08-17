import {
  addDetailSaleHandler,
  deleteDetailSaleHandler,
  getDetailSaleByDateHandler,
  getDetailSaleDatePagiHandler,
  getDetailSaleHandler,
  statementReportHandler,
  updateDetailSaleHandler,
} from "../controller/detailSale.controller";

import { hasAnyPermit } from "../middleware/permitValidator";
import { roleValidator } from "../middleware/roleValidator";
import { validateAll, validateToken } from "../middleware/validator";
import {
  allSchemaId,
  detailSaleSchema,
  detailSaleUpdateSchema,
} from "../schema/scheama";

const detailSaleRoute = require("express").Router();

detailSaleRoute.get(
  "/pagi/:page",
  validateToken,
  hasAnyPermit(["view"]),
  getDetailSaleHandler
);

detailSaleRoute.get(
  "/by-date",
  validateToken,
  hasAnyPermit(["view"]),
  getDetailSaleByDateHandler
);

detailSaleRoute.get(
  "/pagi/by-date/:page",
  validateToken,
  hasAnyPermit(["view"]),
  getDetailSaleDatePagiHandler
);

//that for only device
detailSaleRoute.post("/", validateAll(detailSaleSchema), addDetailSaleHandler);
detailSaleRoute.patch(
  "/",
  validateAll(detailSaleUpdateSchema),
  updateDetailSaleHandler
);

detailSaleRoute.delete(
  "/",
  validateToken,
  roleValidator(["admin"]),
  hasAnyPermit(["delete"]),
  validateAll(allSchemaId),
  deleteDetailSaleHandler
);

detailSaleRoute.get("/statement-report", statementReportHandler);

export default detailSaleRoute;
