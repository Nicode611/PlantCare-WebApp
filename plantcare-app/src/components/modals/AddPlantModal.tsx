"use client";

// Redux
import { useDispatch } from "react-redux";
import { close } from "@/redux/slices/modalSlice" 
import { update } from "@/redux/slices/plants/updatePlantsSlice";

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

// Lucide
import { CookingPot } from "lucide-react";

// API
import { createPlant } from "@/lib/api";
 
function AddPlantModal() {
    const dispatch = useDispatch(); 
    

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Empêche le rechargement de la page
        
        const userId = 1;
        const formData = new FormData(event.currentTarget);
        const location = formData.get("location") as string;
        const modelIdStr = formData.get("modelId") as string;
        const modelId = Number(modelIdStr);

        const newPlant = await createPlant({ userId, modelId, location });
        console.log(location, modelId, userId, "Nouvelle plante créée:", newPlant);
        dispatch(update());
        dispatch(close());
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center rounded-lg p-5">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Add a plant</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
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
                                            {/* Ici les valeurs sont en string, pensez à convertir en nombre dans le submit */}
                                            <SelectItem value="1">Orchidea</SelectItem>
                                            <SelectItem value="2">Tulip</SelectItem>
                                            <SelectItem value="3">Rose</SelectItem>
                                            <SelectItem value="4">Palm tree</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Label htmlFor="place">Place</Label>
                                        <Select name="location">
                                        <SelectTrigger id="place">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="Kitchen">
                                            <CookingPot strokeWidth={1.75} fill="#0b8294" color="#0b8294" className="h-5 w-5 inline-block mr-1" />
                                            Kitchen
                                            </SelectItem>
                                            <SelectItem value="Bedroom">Bedroom</SelectItem>
                                            <SelectItem value="Lounge">Lounge</SelectItem>
                                            <SelectItem value="Cellar">Cellar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" type="button" onClick={() => dispatch(close())}>
                            Cancel
                            </Button>
                            <Button type="submit">Add</Button>
                        </CardFooter>
                        </form>
                </Card>
        </div>
    )
}

export default AddPlantModal
