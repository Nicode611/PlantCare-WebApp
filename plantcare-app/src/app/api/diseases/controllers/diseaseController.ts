import * as DiseaseService from "../services/diseaseService";

    export async function getDiseasesFromPlantModel(plantModelId: string) {
        return await DiseaseService.getDiseasesFromPlantModel(plantModelId)
    }

