"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DoorOpen, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/welcome");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center space-y-4"
      >
        <div className="rounded-full bg-primary/10 p-6 text-primary ring-1 ring-primary/20">
          <DoorOpen size={64} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          e-gate
        </h1>
        <div className="flex items-center space-x-2 text-muted-foreground pt-4">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Loading Sasa Schools...</span>
        </div>
      </motion.div>
    </div>
  );
}
