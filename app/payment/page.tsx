"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RegistrationFormData } from "@/app/utils/formValidation";
import { calculateTotal } from "@/app/utils/priceCalculator";
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/Card";
import { useLanguage } from "@/app/context/LanguageContext";

const t = {
  English: {
    title: "Complete Payment",
    desc: (amount: number, method: string) =>
      `You are paying ${amount} RWF via ${method}.`,
    momoLabel: "Mobile Money Number",
    momoPlaceholder: "e.g. 078XXXXXXX",
    cardNumber: "Card Number",
    expiry: "Expiry Date",
    cvv: "CVV",
    processing: "Processing...",
    pay: (amount: number) => `Pay ${amount} RWF`,
    cancel: "Cancel",
  },
  Français: {
    title: "Finaliser le Paiement",
    desc: (amount: number, method: string) =>
      `Vous payez ${amount} RWF via ${method}.`,
    momoLabel: "Numéro Mobile Money",
    momoPlaceholder: "ex. 078XXXXXXX",
    cardNumber: "Numéro de Carte",
    expiry: "Date d'Expiration",
    cvv: "CVV",
    processing: "Traitement en cours...",
    pay: (amount: number) => `Payer ${amount} RWF`,
    cancel: "Annuler",
  },
  Kinyarwanda: {
    title: "Soza Kwishyura",
    desc: (amount: number, method: string) =>
      `Uri kwishyura ${amount} RWF ukoresheje ${method}.`,
    momoLabel: "Numero ya Mobile Money",
    momoPlaceholder: "urugero: 078XXXXXXX",
    cardNumber: "Numero ya Karita",
    expiry: "Itariki yo Kurangira",
    cvv: "CVV",
    processing: "Birakozwe...",
    pay: (amount: number) => `Ishyura ${amount} RWF`,
    cancel: "Hagarika",
  },
};

export default function PaymentPage() {
  const router = useRouter();
  const [data, setData] = useState<RegistrationFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "card" | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const { lang } = useLanguage();
  const tr = t[lang] ?? t.English;

  useEffect(() => {
    const storedData = localStorage.getItem("e-gate_registration_data");
    const storedMethod = localStorage.getItem("e-gate_payment_method") as
      | "momo"
      | "card";
    if (!storedData || !storedMethod) {
      router.replace("/register");
      return;
    }
    setData(JSON.parse(storedData));
    setPaymentMethod(storedMethod);
  }, [router]);

  if (!data || !paymentMethod) return null;

  const totalAmount = calculateTotal(data.visitorCount);
  const methodLabel =
    paymentMethod === "momo" ? "Mobile Money" : "Credit/Debit Card";

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      localStorage.setItem("e-gate_payment_status", "success");
      router.push("/confirmation");
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-3 sm:p-4 md:p-8 py-14 sm:py-12">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">{tr.title}</CardTitle>
          <CardDescription>{tr.desc(totalAmount, methodLabel)}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="payment-form"
            onSubmit={handlePayment}
            className="space-y-4"
          >
            {paymentMethod === "momo" ? (
              <Input
                label={tr.momoLabel}
                placeholder={tr.momoPlaceholder}
                required
                defaultValue={data.phoneNumber}
                pattern="^07[2-9][0-9]{7}$"
                title="Enter a valid Rwandan mobile number"
              />
            ) : (
              <div className="space-y-4">
                <Input
                  label={tr.cardNumber}
                  placeholder="XXXX XXXX XXXX XXXX"
                  required
                  pattern="\d{16}"
                  title="16 digit card number"
                  maxLength={16}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label={tr.expiry}
                    placeholder="MM/YY"
                    required
                    pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                    maxLength={5}
                  />
                  <Input
                    label={tr.cvv}
                    placeholder="123"
                    type="password"
                    required
                    pattern="\d{3,4}"
                    maxLength={4}
                  />
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            form="payment-form"
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isProcessing}
          >
            {isProcessing ? tr.processing : tr.pay(totalAmount)}
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => router.back()}
            disabled={isProcessing}
          >
            {tr.cancel}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
