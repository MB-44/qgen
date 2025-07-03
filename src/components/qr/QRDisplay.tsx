
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

interface QRDisplayProps {
  value: string;
  size: number;
  logo: string | null;
}

export const QRDisplay = ({ value, size, logo }: QRDisplayProps) => {
  return (
    <div className="flex justify-center qr-code p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <QRCodeSVG
          value={value || " "}
          size={Math.min(size, Math.min(window.innerWidth - 64, 512))}
          level="H"
          includeMargin
          className="rounded-lg max-w-full h-auto shadow-lg"
          imageSettings={logo ? {
            src: logo,
            height: size * 0.2,
            width: size * 0.2,
            excavate: true,
          } : undefined}
        />
      </motion.div>
    </div>
  );
};
