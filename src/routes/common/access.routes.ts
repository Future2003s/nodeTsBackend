"use strict";
import { Router } from "express";
import AccessController from "~/controllers/access.controller";
import asyncHandller from "~/helpers/asyncHandller";
import { userValidation } from "~/schema/auth.schema";
import { validateMiddleware } from "~/validate/validate";

const accessRouter = Router();

accessRouter.get("/login", AccessController.login);
accessRouter.post("/register", validateMiddleware(userValidation), asyncHandller(AccessController.register));

export default accessRouter;
