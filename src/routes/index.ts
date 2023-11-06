import express from "express";
import customerRoutes from "./customer";
import companyRoutes from "./company";
import { handler as read } from "../functions/read";
import { errorResponse } from "../shared/responses";

const router = express.Router();

router.use("/customers", customerRoutes);
router.use("/companys", companyRoutes);

router.get("/read/:where/:form/:id", read);

router.get("/health", (_req, res) => {
  res.status(200).json("health");
});

router.get("/", (_req, res) => {
  res.status(200).json("health");
});

router.use((_req, res) => {
  errorResponse("unknown route", res);
});

export default router;
