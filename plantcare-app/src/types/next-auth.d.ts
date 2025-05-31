// types/next-auth.d.ts

import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

/**
 * Module augmentation pour NextAuth v5 :
 * on étend ici l’interface User (celle que NextAuth utilise en interne),
 * afin qu’elle comporte une propriété `theme?: string`.
 */
declare module "next-auth" {
  interface User {
    /** Champ personnalisé */
    theme?: string
  }

  interface Session {
    user: {
      /** Propriétés usuelles : id, name, email, image, etc. */
      id: string
      name?: string | null
      email?: string | null
      image?: string | null

      /** Notre champ ajouté */
      theme?: string
    }
  }
}

/**
 * Si vous stockez aussi `theme` à l’intérieur du JWT (dans le callback `jwt`),
 * vous pouvez étendre l’interface JWT de la même manière :
 */
declare module "next-auth/jwt" {
  interface JWT {
    /** On ajoute `theme` dans le token JWT si besoin */
    theme?: string
  }
}