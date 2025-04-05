import { Request, Response } from "express";
import DiseaseService from "../services/diseaseService";

class DiseaseController {

    static async getDiseasesFromPlantModel(req: Request, res: Response) {
        try {
            const model = await DiseaseService.getDiseasesFromPlantModel(req.params.plantModelId)
            res.status(201).json(model);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default DiseaseController;