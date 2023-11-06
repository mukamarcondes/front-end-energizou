import express from "express";

import { handler as update } from "../functions/company/update";
import { handler as create } from "../functions/company/create";
import { handler as deleter } from "../functions/company/delete";

const router = express.Router();

router.put("/update/:where/:id", update);
router.post("", create);
router.delete("", deleter);

export default router;
