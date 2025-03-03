"use client";
import { useState } from "react";
import "./api.css"
import { getPlantsFromUser } from "@/lib/api";
import { createPlant } from "@/lib/api";

export default function Api() {

    const [users, setUsers] = useState<User[]>([]);

    type User = {
        id: number;
        username: string;
        email: string;
        password: string;
    };

    async function getUsers() {
        try {
          const response = await fetch("http://localhost:3001/api/users");
      
          if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`); // Gestion des erreurs HTTP
          }
      
          const data = await response.json();
          setUsers(data);

        } catch (error) {
          console.error("Erreur attrapée :", error);
        }
      }



    // Exemple dans un fichier TypeScript (ex: dans un composant React ou autre)
    const createUser = async (username: string, email: string, password: string) => {
        try {
            const response = await fetch("http://localhost:3001/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || `Erreur HTTP! Statut: ${response.status}`);
            }
    
            console.log("Utilisateur créé:", data);
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erreur lors de la création de l'utilisateur:", error.message);
                console.log(error.message);
            } else {
                console.error("Erreur inconnue:", error);
                alert("Une erreur inconnue est survenue.");
            }
        }
    };
    




    return (
        <div className="window">
            <div className="clickable">
                <a href="../">Return home</a>
                <button onClick={() => {getUsers()}}>Get users via API</button>
                <button onClick={()=> {createUser("fzf", "efz@fe.com", "287")}}>Create user</button>
                <button onClick={() => {createPlant({userId: 1, plantModelId: 1, description: "jhbzehj"})}}>Create a tulipe</button>
                <button onClick={() => {getPlantsFromUser(1)}}>Get plent belongs to nico</button>
            </div>
            <div className="infos">
                {users.map((user, index) => (
                    <div key={index}>
                        <span>{user.username}</span>
                        <span>{user.email}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
