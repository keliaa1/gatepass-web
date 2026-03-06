"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function WelcomePage() {
  const router = useRouter();
  const { lang } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border">
          <CardHeader className="space-y-3 pb-8 text-center mt-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck size={32} />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              {lang === "Français"
                ? "Bienvenue à e-gate"
                : lang === "Kinyarwanda"
                  ? "Murakaza neza kuri e-gate"
                  : "Welcome to e-gate"}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mx-auto max-w-[85%] mt-2">
              {lang === "Français"
                ? "Veuillez enregistrer votre visite avant d'entrer sur le campus."
                : lang === "Kinyarwanda"
                  ? "Nyamuneka wiyandikishe mbere yo kwinjira mukigo."
                  : "Please register your visit before entering the school campus."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-secondary/50 p-4 text-sm text-secondary-foreground mb-4 font-medium">
              💡{" "}
              {lang === "Français"
                ? "Tous les visiteurs doivent s'enregistrer pour obtenir un laissez-passer."
                : lang === "Kinyarwanda"
                  ? "Abashyitsi bose bagomba kwiyandikisha kugirango babone uruhushya rwo kwinjira."
                  : "All visitors must check-in and receive a digital pass prior to entry."}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full h-12 text-md"
              size="lg"
              onClick={() => router.push("/register")}
            >
              {lang === "Français"
                ? "Commencer l'inscription"
                : lang === "Kinyarwanda"
                  ? "Tangira Kwiyandikisha"
                  : "Start Registration"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
