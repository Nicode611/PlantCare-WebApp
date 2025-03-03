export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  // Récupérer tous les utilisateurs
  export async function fetchUsers(): Promise<User[]> {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  }