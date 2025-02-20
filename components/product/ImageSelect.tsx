import { PlusIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ImageSelectProps {
  value?: string[];
  onChange: (value: string[]) => void;
}

export default function ImageSelect({
  value = [],
  onChange,
}: ImageSelectProps) {
  const [images, setImages] = useState<string[]>(value);

  useEffect(() => {
    setImages(value);
  }, [value]);

  const handleAddImage = () => {
    setImages([...images, ""]);
  };

  const handleImageChange = (index: number, newValue: string) => {
    const newImages = [...images];
    newImages[index] = newValue;
    setImages(newImages);
    onChange(newImages);
  };

  const handleImageRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="grid gap-2">
      <Label>Images</Label>
      <div className="grid gap-4">
        {images.map((image, index) => (
          <div key={index} className="flex gap-x-4">
            <Input
              placeholder={`Image URL ${index + 1}`}
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleImageRemove(index)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={handleAddImage}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
