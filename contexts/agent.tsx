"use client";

import { createContext, type JSX } from "react";
import { Service } from "./service";
import { Agent } from "@storacha/access/agent";
import { useW3 } from "@storacha/ui-react";
interface AgentContextValue {
  agent?: Agent<Service>;
}

export const AgentContext = createContext<AgentContextValue>({});

export function AgentProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [{ client }] = useW3();
  const agent = client?.agent;
  return (
    <AgentContext.Provider
      value={{
        // @ts-expect-error there's a mismatch between the service type of the agent from @storacha/ui-react and 
        // the service defined in this app, but we can ignore it for now - the service
        // really does implement everything we need
        agent,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}
