"use strict";
import { Router, Request, Response } from "express";
import AccessController from "~/controllers/access.controller";

const accessRouter = Router();

accessRouter.get("/login", AccessController.login);

export default accessRouter;
