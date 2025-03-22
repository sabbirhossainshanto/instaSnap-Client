"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@heroui/react";
import UserProvider from "./user.provider";
import { Provider } from "react-redux";
import { store } from "../lib/redux/store";

const queryClient = new QueryClient();

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <UserProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HeroUIProvider navigate={router.push}>
            <ToastProvider placement="top-right" />
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </HeroUIProvider>
        </QueryClientProvider>
      </Provider>
    </UserProvider>
  );
}
