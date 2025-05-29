import { upload } from '@vercel/blob/client';

export async function uploadImageToVercel(file: File): Promise<string | null> {

  try {
    const blob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/vercelStorage',
    });
    console.log('URL du blob:', blob.url);
    return blob.url || null;
    
  } catch (error) {
    console.error('Erreur lors de l\'upload sur Vercel:', error);
    return null;
  }
};