"use client";

import React from "react";
import TransportTerminalForm from "@/components/terminals/transport-terminal-form";
import TransportTerminalReport from "@/components/terminals/transport-terminal-report";
import TableTransportTerminal from "@/components/terminals/transport-terminal-table";

function TransportTerminalPage() {
  return (
    <div>
      <TransportTerminalForm></TransportTerminalForm>
      <TableTransportTerminal></TableTransportTerminal>
      <TransportTerminalReport></TransportTerminalReport>
    </div>
  );
}

export default TransportTerminalPage;
