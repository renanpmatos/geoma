"use client";

import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import * as Portal from "@radix-ui/react-portal";
import { ComposerSubmitComment } from "@liveblocks/react-comments/primitives";

import { useCreateThread } from "@/liveblocks.config";
import { useMaxZIndex } from "@/lib/useMaxZIndex";

import PinnedComposer from "./PinnedComposer";
import NewThreadCursor from "./NewThreadCursor";

type ComposerCoords = null | { x: number; y: number };

type Props = {
  children: ReactNode;
};

export const NewThread = ({ children }: Props) => {
  const [creatingCommentState, setCreatingCommentState] = useState<
    "placing" | "placed" | "complete"
  >("complete");

  const createThread = useCreateThread();

  const maxZIndex = useMaxZIndex();

  // state para as coordenadas do componente
  const [composerCoords, setComposerCoords] = useState<ComposerCoords>(null);

  const lastPointerEvent = useRef<PointerEvent>();

  // state para ver se o usuário pode usar o componente
  const [allowUseComposer, setAllowUseComposer] = useState(false);
  const allowComposerRef = useRef(allowUseComposer);
  allowComposerRef.current = allowUseComposer;

  useEffect(() => {
    if (creatingCommentState === "complete") return;

    // coloca um componente
    const newComment = (e: MouseEvent) => {
      e.preventDefault(); // para o comportamento padrão

      if (creatingCommentState === "placed") {
        const isClickOnComposer = ((e as any)._savedComposedPath = e
          .composedPath()
          .some((el: any) => {
            return el.classList?.contains("lb-composer-editor-actions");
          }));

        if (isClickOnComposer) return; // click no componente, não faz nada

        // click fora do componente, fecha o componente
        if (!isClickOnComposer) {
          setCreatingCommentState("complete");
          return;
        }
      }

      setCreatingCommentState("placed");
      setComposerCoords({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.documentElement.addEventListener("click", newComment);

    return () => {
      document.documentElement.removeEventListener("click", newComment);
    };
  }, [creatingCommentState]);

  useEffect(() => {
    // muda a posição caso o componente seja alterado
    const handlePointerMove = (e: PointerEvent) => {
      (e as any)._savedComposedPath = e.composedPath(); // evitar erros
      lastPointerEvent.current = e;
    };

    document.documentElement.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.documentElement.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);

  useEffect(() => {
    if (creatingCommentState !== "placing") return;

    const handlePointerDown = (e: PointerEvent) => {
      if (allowComposerRef.current) return;
      (e as any)._savedComposedPath = e.composedPath();
      lastPointerEvent.current = e;
      setAllowUseComposer(true);
    };

    // cancela o evento ao posicionar (click direito)
    const handleContextMenu = (e: Event) => {
      if (creatingCommentState === "placing") {
        e.preventDefault();
        setCreatingCommentState("complete");
      }
    };

    document.documentElement.addEventListener("pointerdown", handlePointerDown);
    document.documentElement.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.documentElement.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
      document.documentElement.removeEventListener(
        "contextmenu",
        handleContextMenu
      );
    };
  }, [creatingCommentState]);

  const handleComposerSubmit = useCallback(
    ({ body }: ComposerSubmitComment, event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const overlayPanel = document.querySelector("#canvas");

      if (!composerCoords || !lastPointerEvent.current || !overlayPanel) return;

      const { top, left } = overlayPanel.getBoundingClientRect();
      const x = composerCoords.x - left;
      const y = composerCoords.y - top;

      createThread({
        body,
        metadata: {
          x,
          y,
          resolved: false,
          zIndex: maxZIndex + 1,
        },
      });

      // reset state
      setComposerCoords(null);
      setCreatingCommentState("complete");
      setAllowUseComposer(false);
    },
    [createThread, composerCoords, maxZIndex]
  );

  return (
    <>
      <Slot
        onClick={() =>
          setCreatingCommentState(
            creatingCommentState !== "complete" ? "complete" : "placing"
          )
        }
        style={{ opacity: creatingCommentState !== "complete" ? 0.7 : 1 }}
      >
        {children}
      </Slot>
      {composerCoords && creatingCommentState === "placed" ? (
        <Portal.Root // usado para evitar problemas com z-index
          className='absolute left-0 top-0'
          style={{
            pointerEvents: allowUseComposer ? "initial" : "none",
            transform: `translate(${composerCoords.x}px, ${composerCoords.y}px)`,
          }}
          data-hide-cursors
        >
          <PinnedComposer onComposerSubmit={handleComposerSubmit} />
        </Portal.Root>
      ) : null}
      <NewThreadCursor display={creatingCommentState === "placing"} />
    </>
  );
};
