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
import { PaymentOption } from "@/app/components/PaymentOption";
import { CreditCard, Smartphone } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const t = {
  English: {
    title: "Checkout Summary",
    desc: "Review your visit details and select a payment method.",
    parentName: "Parent Name",
    phone: "Phone Number",
    students: "Visiting Students",
    visitors: "Number of Visitors",
    totalPrice: "Total Price",
    paymentMethod: "Payment Method",
    momoTitle: "Mobile Money",
    momoDesc: "Pay using MTN or Airtel Money",
    cardTitle: "Credit/Debit Card",
    cardDesc: "Pay with Visa or Mastercard",
    proceed: "Proceed to Payment",
  },
  Français: {
    title: "Résumé du paiement",
    desc: "Vérifiez vos informations et choisissez un mode de paiement.",
    parentName: "Nom du Parent",
    phone: "Numéro de Téléphone",
    students: "Élèves Visités",
    visitors: "Nombre de Visiteurs",
    totalPrice: "Prix Total",
    paymentMethod: "Mode de Paiement",
    momoTitle: "Mobile Money",
    momoDesc: "Payer via MTN ou Airtel Money",
    cardTitle: "Carte Bancaire",
    cardDesc: "Payer avec Visa ou Mastercard",
    proceed: "Procéder au Paiement",
  },
  Kinyarwanda: {
    title: "Incamake y'Ubwishyu",
    desc: "Suzuma amakuru yawe uhitemo uburyo bwo kwishyura.",
    parentName: "Izina ry'Umubyeyi",
    phone: "Nimero ya Telefone",
    students: "Abanyeshuri ba Guest",
    visitors: "Umubare w'Abashyitsi",
    totalPrice: "Igiciro Cyose",
    paymentMethod: "Uburyo bwo Kwishyura",
    momoTitle: "Mobile Money",
    momoDesc: "Ishyura ukoresheje MTN cyangwa Airtel",
    cardTitle: "Karita ya Banki",
    cardDesc: "Ishyura ukoresheje Visa cyangwa Mastercard",
    proceed: "Komeza Kwishyura",
  },
};

export default function CheckoutPage() {
  const router = useRouter();
  const [data, setData] = useState<RegistrationFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "card">("momo");
  const { lang } = useLanguage();
  const tr = t[lang] ?? t.English;

  useEffect(() => {
    const stored = localStorage.getItem("gatepass_registration_data");
    if (!stored) {
      router.replace("/register");
      return;
    }
    setData(JSON.parse(stored));
  }, [router]);

  if (!data) return null;

  const totalAmount = calculateTotal(data.visitorCount);

  const handleProceed = () => {
    localStorage.setItem("gatepass_payment_method", paymentMethod);
    router.push("/payment");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-3 sm:p-4 md:p-8 py-14 sm:py-12">
      <Card className="w-full max-w-lg border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">{tr.title}</CardTitle>
          <CardDescription>{tr.desc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-secondary/30 p-4 space-y-3">
            <div className="flex justify-between border-b border-border pb-2 text-sm">
              <span className="text-muted-foreground mr-4">
                {tr.parentName}
              </span>
              <span className="font-medium text-right">{data.parentName}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2 text-sm">
              <span className="text-muted-foreground mr-4">{tr.phone}</span>
              <span className="font-medium text-right">{data.phoneNumber}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2 text-sm">
              <span className="text-muted-foreground mr-4">{tr.students}</span>
              <span className="font-medium text-right">
                {data.studentNames.join(", ")}
              </span>
            </div>
            <div className="flex justify-between border-b border-border pb-2 text-sm">
              <span className="text-muted-foreground mr-4">{tr.visitors}</span>
              <span className="font-medium text-right">
                {data.visitorCount}
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-semibold text-foreground">
                {tr.totalPrice}
              </span>
              <span className="font-bold text-primary text-xl">
                {totalAmount} RWF
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {tr.paymentMethod}
            </h4>
            <div className="grid gap-3">
              <PaymentOption
                id="momo"
                title={tr.momoTitle}
                description={tr.momoDesc}
                icon={<Smartphone className="h-5 w-5" />}
                selected={paymentMethod === "momo"}
                onSelect={() => setPaymentMethod("momo")}
              />
              <PaymentOption
                id="card"
                title={tr.cardTitle}
                description={tr.cardDesc}
                icon={<CreditCard className="h-5 w-5" />}
                selected={paymentMethod === "card"}
                onSelect={() => setPaymentMethod("card")}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" onClick={handleProceed}>
            {tr.proceed}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
