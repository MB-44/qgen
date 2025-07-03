
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

interface QRActionsProps {
  value: string;
  handleDownload: () => void;
  handleCopy: () => void;
}

export const QRActions = ({ value, handleDownload, handleCopy }: QRActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
      <Button 
        onClick={handleCopy} 
        disabled={!value}
        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy Content
      </Button>
      <Button 
        onClick={handleDownload} 
        disabled={!value}
        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
      >
        <Download className="mr-2 h-4 w-4" />
        Download QR
      </Button>
    </div>
  );
};
