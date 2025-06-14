"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Redux
import { useDispatch } from "react-redux";
import { close } from "@/redux/slices/modalSlice" 
import { update } from "@/redux/slices/plants/updatePlantsSlice";
import { addPlant } from "@/redux/slices/plants/allThePlantsSlice";

// Session
import { useSession } from "next-auth/react";

// Shadcn
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

// Lucide
import { CookingPot } from "lucide-react";
import { BedDouble } from 'lucide-react';
import { Armchair } from 'lucide-react';
import { Package } from 'lucide-react';
import { Loader2 } from "lucide-react";
import { Plus } from "lucide-react";

// API
import { createPlant } from "@/lib/api";
import { getPlantsModel } from "@/lib/api"
 
// Types
import { Model } from "@/types/model";


function AddPlantModal() {
    const { data: session, status } = useSession();
    const dispatch = useDispatch(); 

    const [models, setModels] = useState<Model[]>([]);
    const [formLoading, setFormLoading] = useState(false);

    const getModels = async () => {
        const plantModels = await getPlantsModel()

        if (plantModels.length !== 0) {
            setModels(plantModels);
        }
    }

    useEffect(()=> {
        getModels()
    },[])

    
    // Handle submit add plant form
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault(); // Empêche le rechargement de la page
        if (status === "loading") return;
        if (status !== "authenticated" || !session?.user?.id) {
            console.error("User is not authenticated");
            return;
        }
        setFormLoading(true);
        const userId = session.user.id;
        const formData = new FormData(event.currentTarget);
        const location = formData.get("location") as string;
        const modelIdStr = formData.get("modelId") as string;
        const modelId = Number(modelIdStr);

        const createdPlant = await createPlant({ userId, modelId, location });
        if (!createdPlant) {
          console.error("Failed to create plant");
          setFormLoading(false);
          return;
        }
        
        dispatch(addPlant(createdPlant));
        dispatch(update());
        dispatch(close());
      } catch (error) {
        console.error("Failed to create plant:", error);
        setFormLoading(false);
        dispatch(close());
      }
    };

    

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center rounded-lg p-5">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Add a plant</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <form onSubmit={submitForm}>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="!flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Model</Label>
                                    <Select name="modelId">
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">

                                            {models.map((model, index) => (
                                                <SelectItem key={index} value={model.id.toString()}>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <span>{model.name}</span>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="left" className="bg-gray-200 border-none shadow-lg left-3 w-[150px] h-auto">
                                                            <Image
                                                            src={`/images/plants-img/${model.image}.png`}
                                                            alt="Plant Image"
                                                            width={150}
                                                            height={150}
                                                            />
                                                        </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>

                                    <Label htmlFor="place">Place</Label>
                                        <Select name="location">
                                        <SelectTrigger id="place">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="Kitchen">
                                                <CookingPot strokeWidth={1.75} color="#277A1C" className="h-5 w-5 inline-block mr-1" />
                                                Kitchen
                                            </SelectItem>
                                            <SelectItem value="Bedroom">
                                                <BedDouble strokeWidth={1.75} color="#277A1C" className="h-5 w-5 inline-block mr-1" />
                                                Bedroom
                                            </SelectItem>
                                            <SelectItem value="Lounge">
                                                <Armchair strokeWidth={1.75} color="#277A1C" className="h-5 w-5 inline-block mr-1" />
                                                Lounge
                                            </SelectItem>
                                            <SelectItem value="Cellar">
                                                <Package strokeWidth={1.75} color="#277A1C" className="h-5 w-5 inline-block mr-1" />
                                                Cellar
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" type="button" onClick={() => dispatch(close())}>
                            Cancel
                            </Button>
                            <Button type="submit">
                              {formLoading ? <Loader2 size={16} className="mr-1 animate-spin" /> : <Plus size={16} className="mr-1" />}  
                              Add
                            </Button>
                        </CardFooter>
                        </form>
                </Card>
        </div>
    )
}

export default AddPlantModal
