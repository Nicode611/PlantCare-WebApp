import { NextResponse } from 'next/server';
import * as DiseaseController from '../../controllers/diseaseController';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ modelId: string }> }
): Promise<NextResponse> {
  try {
    const { modelId } = await params;

    const disease = await DiseaseController.getDiseasesFromPlantModel(modelId);
    return NextResponse.json(disease);
  } catch (error) {
    const { modelId } = await params;
    console.error(`Error while fetching plant disease ${modelId}:`, error);
    return NextResponse.json(
      { error: "Error while fetching plant disease." },
      { status: 500 }
    );
  }
}