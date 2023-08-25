import {
  addCollectionHandler,
  collectionAddPermitHandler,
  collectionRemovePermitHandler,
  deletCollectionHandler,
  getCollectionHandler,
} from "../controller/stationCollection.controller";
import { roleValidator } from "../middleware/roleValidator";
import { validateAll, validateToken } from "../middleware/validator";
import { allSchemaId, rolePermitSchema, roleSchema } from "../schema/scheama";

const collectionRoute = require("express").Router();

collectionRoute.get(
  "/",
  //   validateToken,
  //   roleValidator(["admin"]),
  getCollectionHandler
);

collectionRoute.post(
  "/",
  //   validateToken,
  //   roleValidator(["admin"]),
  addCollectionHandler
);

collectionRoute.delete(
  "/",
  //   validateToken,
  //   roleValidator(["admin"]),
  deletCollectionHandler
);

collectionRoute.patch(
  "/add/users",
  //   validateToken,
  //   roleValidator(["admin"]),
  collectionAddPermitHandler
);

collectionRoute.patch(
  "/remove/users",
  //   validateToken,
  //   validateAll(rolePermitSchema),
  //   roleValidator(["admin"]),
  collectionRemovePermitHandler
);

export default collectionRoute;
