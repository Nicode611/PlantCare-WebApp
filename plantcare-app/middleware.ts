import { NextResponse } from 'next/server';
import { auth } from './src/auth';
 
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;
  
  // Liste des chemins publics qui ne nécessitent pas d'authentification
  const publicPaths = ['/signin', '/api/auth'];
  
  // Vérifiez si le chemin actuel est public
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Si l'utilisateur n'est pas authentifié et tente d'accéder à une route protégée
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
  
  // Si l'utilisateur est authentifié et tente d'accéder à la page de connexion
  if (isAuthenticated && pathname === '/signin') {
    return NextResponse.redirect(new URL('/home', req.url));
  }
  
  return NextResponse.next();
});

// Configuration du middleware pour s'appliquer uniquement à certains chemins
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
};
