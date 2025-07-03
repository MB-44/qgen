import { useState } from "react";
import { QRTypeCard } from "@/components/QRTypeCard";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Type, Wifi, Contact2, Mail, MessageCircle, MessageSquare, FileText, Package, Image, Video, Link2, Building2, FileCode2, Ticket, Music, AppWindow, CalendarDays, MessageCircleHeart, PlaySquare, Scan, Share2 } from "lucide-react";
const QR_TYPES = [{
  icon: Globe,
  title: "Web Page",
  description: "Create a QR code for a website URL"
}, {
  icon: Type,
  title: "Text",
  description: "Display plain text when scanned"
}, {
  icon: Wifi,
  title: "WiFi",
  description: "Share WiFi network credentials"
}, {
  icon: Contact2,
  title: "VCard",
  description: "Share contact information"
}, {
  icon: Mail,
  title: "Email",
  description: "Generate an email with predefined content"
}, {
  icon: MessageCircle,
  title: "WhatsApp",
  description: "Open a WhatsApp chat"
}, {
  icon: MessageSquare,
  title: "SMS",
  description: "Send a text message"
}, {
  icon: FileText,
  title: "PDF",
  description: "Link to a PDF document"
}, {
  icon: Package,
  title: "Product",
  description: "Share product information"
}, {
  icon: Image,
  title: "Images",
  description: "Display an image gallery"
}, {
  icon: Video,
  title: "Video",
  description: "Play a video when scanned"
}, {
  icon: Link2,
  title: "List of Links",
  description: "Share multiple links"
}, {
  icon: Building2,
  title: "Business",
  description: "Share business information"
}, {
  icon: FileCode2,
  title: "Menu",
  description: "Display a digital menu"
}, {
  icon: Ticket,
  title: "Coupon",
  description: "Share a digital coupon"
}, {
  icon: Music,
  title: "MP3",
  description: "Play audio content"
}, {
  icon: AppWindow,
  title: "Apps",
  description: "Link to app stores"
}, {
  icon: CalendarDays,
  title: "Event",
  description: "Share event details"
}, {
  icon: MessageCircleHeart,
  title: "Feedback",
  description: "Collect user feedback"
}, {
  icon: PlaySquare,
  title: "Playlist",
  description: "Share a music playlist"
}, {
  icon: Scan,
  title: "2D Barcodes",
  description: "Create various 2D barcodes"
}, {
  icon: Share2,
  title: "Social Networks",
  description: "Share social media profiles"
}];
const Index = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  return <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto">
        <AnimatePresence mode="wait">
          {!selectedType ? <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.3
        }}>
              <div className="text-center mb-8 sm:mb-12 space-y-4">
                <motion.h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent" initial={{
              opacity: 0,
              y: -20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }}>Qgen</motion.h1>
                <motion.p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.3
            }}>
                  You can generate fully customized QR codes—designed and optimized to suit any conceivable use case, whether it’s for marketing campaigns, event management, secure transactions, personal projects, or any other purpose you can imagine.
                </motion.p>
              </div>

              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
                {QR_TYPES.map((type, index) => <QRTypeCard key={type.title} icon={type.icon} title={type.title} description={type.description} onClick={() => setSelectedType(type.title)} index={index} />)}
              </motion.div>
            </motion.div> : <QRCodeGenerator type={selectedType} onBack={() => setSelectedType(null)} />}
        </AnimatePresence>
      </div>
    </div>;
};
export default Index;