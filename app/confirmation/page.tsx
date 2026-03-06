"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RegistrationFormData } from "@/app/utils/formValidation";
import { calculateTotal } from "@/app/utils/priceCalculator";
import { Button } from "@/app/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

const t = {
  English: {
    title: "Confirmation Successful",
    desc: "Your visit has been registered and paid.",
    visiting: "is coming to visit",
    with: "with",
    otherVisitor: "other visitor",
    otherVisitors: "other visitors",
    paid: "and has paid",
    done: "Done",
  },
  Français: {
    title: "Confirmation Réussie",
    desc: "Votre visite a été enregistrée et payée.",
    visiting: "vient rendre visite à",
    with: "avec",
    otherVisitor: "autre visiteur",
    otherVisitors: "autres visiteurs",
    paid: "et a payé",
    done: "Terminer",
  },
  Kinyarwanda: {
    title: "Kwemezwa Byagenze Neza",
    desc: "Inzira yawe yandikishijwe kandi wishyuriwe.",
    visiting: "azasura",
    with: "hamwe na",
    otherVisitor: "undi mushyitsi",
    otherVisitors: "abandi bashyitsi",
    paid: "kandi yishyuye",
    done: "Rangiza",
  },
};

export default function ConfirmationPage() {
  const router = useRouter();
  const [data, setData] = useState<RegistrationFormData | null>(null);
  const { lang } = useLanguage();
  const tr = t[lang] ?? t.English;

  useEffect(() => {
    const status = localStorage.getItem("e-gate_payment_status");
    const storedData = localStorage.getItem("e-gate_registration_data");
    if (status !== "success" || !storedData) {
      router.replace("/");
      return;
    }
    setData(JSON.parse(storedData));
  }, [router]);

  if (!data) return null;

  const totalAmount = calculateTotal(data.visitorCount);
  const otherVisitors = data.visitorCount - 1;

  const handleDone = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-3 sm:p-4 md:p-8 py-14 sm:py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-border shadow-lg overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-4 bg-primary" />
          <CardHeader className="text-center pt-8 pb-4 space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500"
            >
              <CheckCircle2 size={32} />
            </motion.div>
            <CardTitle className="text-xl sm:text-2xl">{tr.title}</CardTitle>
            <CardDescription className="text-base">{tr.desc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-secondary/50 p-5 text-center text-sm leading-relaxed border border-border/50">
              <span className="font-semibold text-foreground">
                {data.parentName}
              </span>{" "}
              {tr.visiting}{" "}
              <span className="font-semibold text-foreground">
                {data.studentNames.join(" and ")}
              </span>
              {otherVisitors > 0 && (
                <>
                  {" "}
                  {tr.with}{" "}
                  <span className="font-semibold text-foreground">
                    {otherVisitors}{" "}
                    {otherVisitors > 1 ? tr.otherVisitors : tr.otherVisitor}
                  </span>
                </>
              )}{" "}
              {tr.paid}{" "}
              <span className="font-semibold text-primary">
                {totalAmount} RWF
              </span>
              .
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-3 pt-2">
            <Button className="w-full" size="lg" onClick={handleDone}>
              {tr.done}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
