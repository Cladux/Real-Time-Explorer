"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from 'next-auth/react';
import { memo, type ReactNode } from 'react';


function Providers({ children }: Readonly<{ children: ReactNode }>): ReactNode {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}

export default memo(Providers);