import express from "express";

import { handler as update } from "../functions/customers/update";
import { handler as create } from "../functions/customers/create";
import { handler as deleter } from "../functions/customers/delete";
import { handler as login } from "../functions/customers/login";

const router = express.Router();

router.put("/update/:where/:id", update);
router.post("", create);
router.delete("", deleter);
router.post("/login", login);

export default router;
