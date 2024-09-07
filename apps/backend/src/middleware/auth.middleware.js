import express from "express";
import Admin from "../admin/admin.model.js";
import ClubUSer from "../club/models/club.model.js";
import JWT from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

