import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface PicsumImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface ImageContextType {
  selectedImages: PicsumImage[];
  setSelectedImages: (images: PicsumImage[]) => void;
  clearSelectedImages: () => void;
  removeImage: (imageId: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState<PicsumImage[]>([]);

  const clearSelectedImages = () => {
    setSelectedImages([]);
  };

  const removeImage = (imageId: string) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  return (
    <ImageContext.Provider
      value={{
        selectedImages,
        setSelectedImages,
        clearSelectedImages,
        removeImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
