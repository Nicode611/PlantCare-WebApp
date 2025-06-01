"use client";

// React
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";

// Redux
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { close } from "@/redux/slices/modalSlice" 
import { select } from "@/redux/slices/plants/selectPlantSlice";
import { update } from "@/redux/slices/plants/updatePlantsSlice";

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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// Lucide
import { SquarePen } from "lucide-react";
import { ImagePlus } from "lucide-react";
import { CookingPot } from "lucide-react";
import { BedDouble } from 'lucide-react';
import { Armchair } from 'lucide-react';
import { Package } from 'lucide-react';
import { Loader2 } from "lucide-react";
import { Plus } from "lucide-react";

// API
import { uploadImageToVercel } from "@/lib/api";
import { updatePlantInfos } from "@/lib/api";
 
// Types
import { heicTo } from "heic-to";

interface EditPlantFormValues {
  locationSelect: string;
  locationInput: string;
  image: FileList;
}

function EditPlantModal() {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const [hasNewImage, setHasNewImage] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const selectedPlant = useSelector((state: RootState) => state.selectPlant.value);

    
    const form = useForm<EditPlantFormValues>({
      
      defaultValues: {
        locationSelect: selectedPlant?.location ?? "",
        locationInput: "",
        image: undefined as unknown as FileList,
      },
    });
    
    if (!selectedPlant) {
      return null;
    }
    
    // Handle submit add plant form
    const onSubmit = async (values: EditPlantFormValues) => {
      if (status !== "authenticated" || !session?.user?.id) {
        console.error("User is not authenticated");
        return;
      }

      try {
        setFormLoading(true);
        const plantId = selectedPlant?.id;
        const plantImage = values.image;
        const location = values.locationInput || values.locationSelect;
        
        // Upload image and get its URL
        let imageUrl: string | null = null;
        if (hasNewImage && plantImage.length > 0) {
          imageUrl = await uploadImageToVercel(plantImage[0]);
          if (!imageUrl) {
            console.error("Upload failed");
            return;
          }
        }
        // Prepare update payload
        const data: { location: string; image?: string } = { location };

        // Update the plant in the Redux store
        const updatedPlant = {
          ...selectedPlant,
          location: data.location,
          image: imageUrl || selectedPlant.image,
        };
        dispatch(select(updatedPlant));

        
        
        if (imageUrl) {
          data.image = imageUrl;
        }
        await updatePlantInfos(plantId, data);
      } catch (error) {
        console.error("Failed to update plant:", error);
      }
      
      setFormLoading(false);
      dispatch(update()); // Refresh the plant list
      dispatch(close());

    };

    

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center rounded-lg p-5">
              <Card className="w-[350px]">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><SquarePen className="w-6 text-primary"/> Edit plant</CardTitle>
                      <CardDescription>{selectedPlant?.model.name}</CardDescription>
                  </CardHeader>
                  
                      <CardContent>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                              control={form.control}
                              name="image"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Image</FormLabel>
                                  <FormDescription className="!mt-0">Import an image of your plant.</FormDescription>
                                  <FormControl>
                                    <div className="flex gap-4 items-center mt-2">
                                      <Image
                                           src={
                                             field.value && field.value.length > 0
                                               ? URL.createObjectURL(field.value[0])
                                               : selectedPlant?.image !== null ? selectedPlant?.image : `/images/plants-img/${selectedPlant.model.image}.png`
                                           }
                                           alt="Plant Image"
                                           width={100}
                                           height={100}
                                           className="rounded-lg w-32 h-32 object-contain"
                                      />
                                      <div className="flex flex-col">
                                        <label
                                          htmlFor="image-upload"
                                          className="flex gap-2 px-4 py-2 text-primary rounded cursor-pointer hover:bg-secondary/60 transition"
                                        >
                                          <ImagePlus className="text-primary w-5" />
                                          {field.value && field.value.length > 0 ? 'Modifier l\'image' : 'Choisir une image'}
                                        </label>
                                        <input
                                          id="image-upload"
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={async (e) => {
                                            const files = e.target.files!;
                                            if (files.length === 0) {
                                              field.onChange(files);
                                              setHasNewImage(false);
                                              return;
                                            }
                                            const file = files[0];
                                            let processedFile: File;
                                            if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
                                              // convert HEIC to JPEG using heic-to
                                              const blob = await heicTo({ blob: file, type: "image/jpeg" });
                                              processedFile = new File(
                                                [blob],
                                                file.name.replace(/\.heic$/i, ".jpg"),
                                                { type: "image/jpeg" }
                                              );
                                            } else {
                                              processedFile = file;
                                            }
                                            // build a new FileList
                                            const dataTransfer = new DataTransfer();
                                            dataTransfer.items.add(processedFile);
                                            const newFiles = dataTransfer.files;
                                            field.onChange(newFiles);
                                            setHasNewImage(newFiles.length > 0);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="locationSelect"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormDescription className="!mt-0">Select or type a location.</FormDescription>
                                  <FormControl>
                                    <div className="flex flex-col space-y-2">
                                      <Select
                                        onValueChange={(value) => {
                                          field.onChange(value);
                                          form.setValue("locationInput", "");
                                        }}
                                        value={field.value}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select a location..." />
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
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="locationInput"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Ou saisir une autre location"
                                      value={field.value}
                                      onChange={(e) => {
                                        field.onChange(e.target.value);
                                        form.setValue("locationSelect", "");
                                      }}
                                      onBlur={field.onBlur}
                                      ref={field.ref}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <CardFooter className="flex justify-end gap-2">
                                <Button variant="outline" type="button" onClick={() => dispatch(close())}>
                                Cancel
                                </Button>
                                <Button type="submit">
                              {formLoading ? <Loader2 size={16} className="mr-1 animate-spin" /> : <Plus size={16} className="mr-1" />}  
                              Add
                            </Button>
                            </CardFooter>
                          </form>
                        </Form>
                      </CardContent>
              </Card>
      </div>
    );
}

export default EditPlantModal
