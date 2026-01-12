import e from "express";
import {create, deleteUser, getAllUsers, getUserById, update } from "../controller/userController.js";
import { get } from "mongoose";

const router = e.Router();          
router.post("/users", create);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", update);
router.delete("/users/:id", deleteUser);

export default router;