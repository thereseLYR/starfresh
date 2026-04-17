import type { Metadata } from "next";
import { Suspense } from "react";
import ImportScreen from "./ImportScreen";

export const metadata: Metadata = {
  title: "Import · Starfresh",
  description:
    "Load a previously exported Starfresh character from a share URL or JSON file.",
};

export default function ImportPage() {
  return (
    <Suspense>
      <ImportScreen />
    </Suspense>
  );
}
