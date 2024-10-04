import { Router } from "express";

export interface Module {
    getRouter(): Router;
}