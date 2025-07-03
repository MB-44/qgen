
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { QRDisplay } from "./qr/QRDisplay";
import { QRLogoUploader } from "./qr/QRLogoUploader";
import { QRActions } from "./qr/QRActions";

interface QRCodeGeneratorProps {
  type: string;
  onBack: () => void;
}

export const QRCodeGenerator = ({ type, onBack }: QRCodeGeneratorProps) => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [size, setSize] = useState(256);
  const [logo, setLogo] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const getQRValue = () => {
    if (type === "WhatsApp") {
      const cleanNumber = value.replace(/[^\d]/g, '');
      return `https://wa.me/${cleanNumber}`;
    } else if (type === "SMS") {
      const cleanNumber = value.replace(/[^\d]/g, '');
      const encodedMessage = encodeURIComponent(message);
      return message 
        ? `sms:${cleanNumber}?body=${encodedMessage}`
        : `sms:${cleanNumber}`;
    }
    return value;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getQRValue());
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDownload = () => {
    if (!value) {
      toast.error("Please enter some content first");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svg = document.querySelector(".qr-code svg") as SVGElement;
    
    if (!svg) {
      toast.error("QR code not found");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-code-${type.toLowerCase()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      toast.success("QR code downloaded!");
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const getInputPlaceholder = () => {
    if (type === "WhatsApp") {
      return "Enter phone number (with country code, e.g., 14155552671)";
    } else if (type === "SMS") {
      return "Enter phone number (e.g., 4155552671)";
    }
    return `Enter your ${type.toLowerCase()}...`;
  };

  return (
    <div className="min-h-screen w-full max-w-xl mx-auto space-y-6 px-4 sm:px-0 py-8">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 hover:bg-purple-100 transition-colors duration-300"
      >
        ← Back to Types
      </Button>

      <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-500">
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="qr-input">
              {type === "WhatsApp" || type === "SMS" ? "Enter Phone Number" : `Enter ${type} Content`}
            </Label>
            <Input
              id="qr-input"
              type="tel"
              value={value}
              onChange={handleInputChange}
              placeholder={getInputPlaceholder()}
              className="w-full"
            />
            {type === "WhatsApp" && (
              <p className="text-sm text-muted-foreground mt-1">
                Include country code without + or 00 (e.g., 14155552671 for +1 415 555 2671)
              </p>
            )}
          </div>

          {type === "SMS" && (
            <div className="space-y-2">
              <Label htmlFor="message-input">Message (Optional)</Label>
              <Input
                id="message-input"
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Enter message (optional)"
                className="w-full"
              />
              <p className="text-sm text-muted-foreground mt-1">
                This message will be pre-filled in the SMS
              </p>
            </div>
          )}

          <QRDisplay value={getQRValue()} size={size} logo={logo} />
          <QRLogoUploader logo={logo} setLogo={setLogo} />
          <QRActions value={value} handleCopy={handleCopy} handleDownload={handleDownload} />

          <div className="space-y-2">
            <Label htmlFor="size">QR Code Size</Label>
            <Input
              id="size"
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={128}
              max={512}
              step={32}
              className="w-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
