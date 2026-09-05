import { useState } from "react";
import { AlertTriangle, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocalState, type Contact } from "@/lib/storage";

type LocationState = { status: "idle" | "loading" | "ready" | "error"; link?: string; msg?: string };

export function buildAlertMessage(locationLink?: string) {
  return [
    "I need help. This is an emergency alert sent from my safety app.",
    locationLink ? `My location: ${locationLink}` : "Location could not be shared.",
    `Sent at ${new Date().toLocaleString()}`,
  ].join(" ");
}

export function HelpButton() {
  const [open, setOpen] = useState(false);
  const [contacts] = useLocalState<Contact[]>("saheli.contacts", []);
  const [location, setLocation] = useState<LocationState>({ status: "idle" });

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocation({ status: "error", msg: "This device cannot share location." });
      return;
    }
    setLocation({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({
          status: "ready",
          link: `https://maps.google.com/?q=${latitude.toFixed(5)},${longitude.toFixed(5)}`,
        });
      },
      () => setLocation({ status: "error", msg: "Location permission was blocked." }),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const openAlert = () => {
    setOpen(true);
    requestLocation();
  };

  const message = buildAlertMessage(location.link);
  const numbers = contacts.map((c) => c.phone).filter(Boolean);
  const smsHref = `sms:${numbers.join(",")}${numbers.length ? "?" : "?"}body=${encodeURIComponent(message)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <>
      <Button
        onClick={openAlert}
        className="h-10 gap-2 rounded-full bg-signal px-5 font-semibold text-signal-foreground shadow-lift hover:bg-signal/90"
      >
        <AlertTriangle className="size-4" />
        HELP
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-signal">
              <AlertTriangle className="size-5" /> Emergency alert
            </DialogTitle>
            <DialogDescription>
              Call emergency services first if you are in immediate danger, then send your location
              to your trusted circle.
            </DialogDescription>
          </DialogHeader>

          <a href="tel:112" className="block">
            <Button className="h-12 w-full gap-2 bg-signal text-signal-foreground hover:bg-signal/90">
              <Phone className="size-4" /> Call 112 now
            </Button>
          </a>

          <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm">
            <p className="flex items-center gap-2 font-medium">
              <MapPin className="size-4 text-primary" />
              {location.status === "loading" && "Finding your location..."}
              {location.status === "ready" && "Location ready to share"}
              {location.status === "error" && "Location unavailable"}
              {location.status === "idle" && "Location not requested"}
            </p>
            {location.link && (
              <p className="mt-1 break-all text-xs text-muted-foreground">{location.link}</p>
            )}
            {location.status === "error" && (
              <p className="mt-1 text-xs text-muted-foreground">{location.msg}</p>
            )}
          </div>

          {contacts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You have no trusted contacts saved yet. You can still send the alert and choose who
              receives it.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Will be addressed to: {contacts.map((c) => c.name).join(", ")}
            </p>
          )}

          <div className="grid gap-2 sm:grid-cols-2">
            <a href={smsHref}>
              <Button variant="secondary" className="w-full gap-2">
                <Send className="size-4" /> Send SMS alert
              </Button>
            </a>
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <Button variant="outline" className="w-full gap-2">
                <Send className="size-4" /> Send on WhatsApp
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
