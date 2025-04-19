import * as ModelService from "../services/modelService"

    export async function getModels() {
        return await ModelService.getModels();
    }