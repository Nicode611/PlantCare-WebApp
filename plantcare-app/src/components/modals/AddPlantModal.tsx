"use client";

import { useDispatch } from "react-redux";
import { close } from "@/redux/slices/modalSlice" 

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


function AddPlantModal() {
    const dispatch = useDispatch(); 

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center rounded-lg p-5">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Add a plant</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="!flex flex-col space-y-1.5">
                            <Label htmlFor="place">Place</Label>
                            <Select>
                                <SelectTrigger id="place">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="next"><CookingPot strokeWidth={1.75} fill="#0b8294" color="#0b8294" className="h-5 w-5 inline-block mr-1" />Kitchen</SelectItem>
                                    <SelectItem value="sveltekit">Bedroom</SelectItem>
                                    <SelectItem value="astro">Lounge</SelectItem>
                                    <SelectItem value="nuxt">Cellar</SelectItem>
                                </SelectContent>
                            </Select>
                            <Label htmlFor="framework">Model</Label>
                            <Select>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="next">Next.js</SelectItem>
                                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                    <SelectItem value="astro">Astro</SelectItem>
                                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => {dispatch(close())}}>Cancel</Button>
                        <Button>Add</Button>
                    </CardFooter>
                </Card>
        </div>
    )
}

export default AddPlantModal
