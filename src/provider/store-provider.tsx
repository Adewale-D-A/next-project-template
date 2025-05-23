"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { premiumStore, AppStore } from "@/stores";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = premiumStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
