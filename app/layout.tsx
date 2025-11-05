"use client";

import "./globals.css";
import type { JSX } from "react";
import { AgentProvider } from "@/contexts/agent";
import { ServiceProvider } from "@/contexts/service";
import Nav from "@/components/nav";
import {
  Authenticator,
  Provider as StorachaProvider,
} from "@storacha/ui-react";
import { AuthenticationEnsurer } from "@/components/Authenticator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <StorachaProvider>
      <Authenticator>
        <ServiceProvider>
          <AgentProvider>
            <html>
              <body className="min-h-screen bg-slate-800 text-white">
                <Nav />
                <main className="grow text-white p-4">
                  <AuthenticationEnsurer>{children}</AuthenticationEnsurer>
                </main>
              </body>
            </html>
          </AgentProvider>
        </ServiceProvider>
      </Authenticator>
    </StorachaProvider>
  );
}
