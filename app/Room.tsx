"use client";

import { LiveMap } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";
import Loader from "@/components/Loader";

export default function Room({ children }: { children: React.ReactNode }) {
  return (
    <RoomProvider
      id='geoma-room'
      // inicializa a presença do usuário na sala (room)
      initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
      // inicializa o armazenamento (storage) na sala
      initialStorage={{
        // armazena os objetos pelo LiveMap
        canvasObjects: new LiveMap(),
      }}
    >
      {/*passando o componente de loading como fallback ao carregar o componente*/}
      <ClientSideSuspense fallback={<Loader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
