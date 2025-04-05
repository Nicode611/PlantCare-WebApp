import { Request, Response } from "express";
import ModelService from "../services/modelService";

class ModelController {

    static async getModels(req: Request, res: Response) {
        try {
            const model = await ModelService.getModels()
            res.status(201).json(model);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default ModelController;