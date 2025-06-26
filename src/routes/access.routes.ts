"use strict";
import { Router } from "express";
import AccessController from "~/controllers/access.controller";
import asyncHandller from "~/helpers/asyncHandller";
import { validateRequestModel } from "~/middleware/validateRequestModel.middleware";
import { userModelLoginValidation, userModelValidate } from "~/schema/auth.schema";

const accessRouter:Router = Router();

accessRouter.post("/login", validateRequestModel(userModelLoginValidation), asyncHandller(AccessController.login));
accessRouter.post("/register", validateRequestModel(userModelValidate), asyncHandller(AccessController.register));

export default accessRouter;
