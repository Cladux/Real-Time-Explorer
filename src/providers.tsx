"use client";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { ReactNode } from "react";

function Providers({ children }: Readonly<{ children: ReactNode }>): ReactNode {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}

export default Providers;
