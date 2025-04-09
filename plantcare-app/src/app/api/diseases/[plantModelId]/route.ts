import { NextResponse } from 'next/server';
import * as DiseaseController from '../controllers/diseaseController';

export async function GET(
    request: Request,
    { params }: { params: { plantModelId: string } }
  ) {
        try {
            const awaitedParams = await Promise.resolve(params);
            const modelId = awaitedParams.plantModelId;

            const disease = await DiseaseController.getDiseasesFromPlantModel(modelId);
            return NextResponse.json(disease);
        } catch (error) {
            const awaitedParams = await Promise.resolve(params);
            console.error(`Error while fetching plant disease ${awaitedParams.plantModelId}:`, error);
            return NextResponse.json(
            { error: "Error while fetching plant disease." },
            { status: 500 }
            );
        }

  }