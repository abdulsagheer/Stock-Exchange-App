// Importing Libraries
import express from "express";

// Importing dependencies
import { createContact } from "../controllers/Contact";
const contactRoute = express.Router();

/** Contact Route */
contactRoute.post("/", createContact);

export default contactRoute;
