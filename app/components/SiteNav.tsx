"use client";

import DrawerMenu from "@/app/components/DrawerMenu";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function SiteNav() {
  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <DrawerMenu />
      </div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </>
  );
}
