import { NextResponse } from 'next/server';
import * as DiseaseController from '../../controllers/diseaseController';

export async function GET(
    request: Request,
    { params }: { params: { modelId: string } }
  ) {
        try {
            const awaitedParams = await Promise.resolve(params);
            const modelId = awaitedParams.modelId;

            const disease = await DiseaseController.getDiseasesFromPlantModel(modelId);
            return NextResponse.json(disease);
        } catch (error) {
            const awaitedParams = await Promise.resolve(params);
            console.error(`Error while fetching plant disease ${awaitedParams.modelId}:`, error);
            return NextResponse.json(
            { error: "Error while fetching plant disease." },
            { status: 500 }
            );
        }

  }