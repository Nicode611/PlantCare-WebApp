import * as DiseaseService from "../services/diseaseService";

    export async function getDiseasesFromPlantModel(modelId: string) {
        return await DiseaseService.getDiseasesFromPlantModel(modelId)
    }

