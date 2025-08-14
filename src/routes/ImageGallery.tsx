"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Download } from "lucide-react";
import { useImageContext } from "@/contexts/ImageContext";

interface PicsumImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function ImageGallery() {
  const { setSelectedImages } = useImageContext();
  const navigate = useNavigate();
  const [images, setImages] = useState<PicsumImage[]>([]);
  const [localSelectedImages, setLocalSelectedImages] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=20"
      );
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleImageSelection = (imageId: string) => {
    const newSelected = new Set(localSelectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setLocalSelectedImages(newSelected);
  };

  const clearSelection = () => {
    setLocalSelectedImages(new Set());
  };

  const handleSelectedImages = () => {
    const selected = images.filter((img) => localSelectedImages.has(img.id));
    setSelectedImages(selected);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Image Gallery</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Image Gallery</h1>
            <p className="text-muted-foreground">
              Click on images to select them. Selected:{" "}
              {localSelectedImages.size}
            </p>
          </div>

          {localSelectedImages.size > 0 && (
            <div className="flex gap-2">
              <Button onClick={handleSelectedImages} className="gap-2">
                <Download className="w-4 h-4" />
                Use Selected ({localSelectedImages.size})
              </Button>
              <Button variant="outline" onClick={clearSelection}>
                Clear Selection
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => {
            const isSelected = localSelectedImages.has(image.id);
            return (
              <Card
                key={image.id}
                className={`group cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                onClick={() => toggleImageSelection(image.id)}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <img
                    src={`https://picsum.photos/400/400?random=${image.id}`}
                    alt={`Photo by ${image.author}`}
                    className={`w-full h-full object-cover transition-all duration-200 ${
                      isSelected ? "scale-105" : "group-hover:scale-105"
                    }`}
                    loading="lazy"
                  />

                  {/* Selection overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-200 ${
                      isSelected
                        ? "bg-primary/20"
                        : "bg-black/0 group-hover:bg-black/10"
                    }`}
                  />

                  {/* Selection indicator */}
                  <div
                    className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-white/80 border-white/80 group-hover:bg-white group-hover:border-white"
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4" />}
                  </div>

                  {/* Author badge */}
                  <div className="absolute bottom-3 left-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-black"
                    >
                      {image.author}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {localSelectedImages.size > 0 && (
          <div className="fixed bottom-6 right-6">
            <Badge variant="default" className="text-lg px-4 py-2">
              {localSelectedImages.size} selected
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
