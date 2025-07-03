
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QRTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  index: number;
}

export const QRTypeCard = ({ icon: Icon, title, description, onClick, index }: QRTypeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="relative overflow-hidden rounded-2xl border bg-white/50 p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-3 transition-all duration-300 group-hover:scale-110">
            <Icon className="h-6 w-6 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent transition-colors duration-300">{title}</h3>
          <p className="text-sm text-muted-foreground text-center group-hover:text-foreground/80 transition-colors duration-300">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};
