// Exemple de middleware pour verifier le header 

export async function verifyRequest(request: Request): Promise<boolean> {
    // Exemple simple : vérifie la présence et la valeur d'un header Authorization
    const authHeader = request.headers.get('authorization');
    // Pour un cas réel, tu pourrais décoder un token JWT, etc.
    if (!authHeader || authHeader !== 'Bearer mysecrettoken') {
      return false;
    }
    return true;
  }