// app/api/upload/route.ts
import { put } from '@vercel/blob';

import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const form = await req.formData();
  const file = form.get('file') as File;
  const blob = await put(file.name, file, {
    access: 'public',       // URL publique
    addRandomSuffix: true,  // évite les collisions de noms
  });
  return Response.json(blob);
}

export async function POST(req: Request) {
  const body = await req.json();
  return handleUpload({
    request: req,
    body,
    onBeforeGenerateToken: async () => ({ addRandomSuffix: true }),
    onUploadCompleted: async ({ blob }) => {
      console.log('Upload terminé :', blob.url);
      // MAJ BDD, etc.
    },
  }).then(res => NextResponse.json(res));
}