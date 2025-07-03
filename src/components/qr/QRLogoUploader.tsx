
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

interface QRLogoUploaderProps {
  logo: string | null;
  setLogo: (logo: string | null) => void;
}

export const QRLogoUploader = ({ logo, setLogo }: QRLogoUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500000) {
        toast.error("Image size should be less than 500KB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="file-input">Logo or Image (Optional)</Label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <Input
          id="file-input"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="flex-1"
        />
        {logo && (
          <Button
            variant="destructive"
            size="icon"
            onClick={handleRemoveLogo}
            className="self-end sm:self-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Recommended: Small, transparent PNG (max 500KB)
      </p>
    </div>
  );
};
