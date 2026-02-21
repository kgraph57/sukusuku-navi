import { Building2, Stethoscope } from "lucide-react";
import type { Clinic } from "./clinics";

export const TYPE_ICON_MAP: Record<Clinic["type"], typeof Building2> = {
  hospital: Building2,
  clinic: Stethoscope,
};

export const TYPE_COLOR_MAP: Record<Clinic["type"], string> = {
  hospital: "bg-red-50 text-red-600 border-red-200",
  clinic: "bg-sage-50 text-sage-600 border-sage-200",
};
