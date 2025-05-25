"use client";

import Image from "next/image";

// Redux
import { useDispatch } from "react-redux";
import { close } from "@/redux/slices/modalSlice";
import { update } from "@/redux/slices/plants/updatePlantsSlice";

// Session
import { useSession } from "next-auth/react";

// Shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Lucide
import { AlertTriangle } from "lucide-react";

// API
import { deletePlant } from "@/lib/api";

// Types
import { Plant } from "@/types/plant";

function DeletePlantModal({ selectedPlant }: { selectedPlant: Plant }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (status !== "authenticated" || !session?.user?.id) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await deletePlant(selectedPlant.id);
      dispatch(update());
      dispatch(close());
    } catch (error) {
      console.error("Failed to delete plant:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center rounded-lg p-5">
      <Card className="w-[350px]">
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center justify-center text-center w-full gap-2">
            <AlertTriangle className="w-6 text-destructive" />
            Delete Plant
          </CardTitle>
          <CardDescription className="text-center">
            Are you sure you want to delete this plant ?
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-center py-4">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-bold">{selectedPlant.model.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {selectedPlant.location}
            </p>
            <Image
              src={selectedPlant.image !== null ? selectedPlant.image : `/images/plants-img/${selectedPlant.model.image}.png`}
              alt={selectedPlant.model.name}
              width={100}
              height={100}
              className="rounded-lg mb-3"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => dispatch(close())}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default DeletePlantModal;
