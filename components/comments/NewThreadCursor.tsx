"use client";

import { useEffect, useState } from "react";
import * as Portal from "@radix-ui/react-portal";

// posicação para enconder o cursor
const DEFAULT_CURSOR_POSITION = -10000;

// cursor quando carrega nova thread
const NewThreadCursor = ({ display }: { display: boolean }) => {
  // posiciona o cursor
  const [coords, setCoords] = useState({
    x: DEFAULT_CURSOR_POSITION,
    y: DEFAULT_CURSOR_POSITION,
  });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const canvas = document.getElementById("canvas");

      if (canvas) {
        // retorna o tamanho do elemento e sua posição
        const canvasRect = canvas.getBoundingClientRect();

        // verifica se o mouse está fora do canva, esconde o cursor de comentario
        if (
          e.clientX < canvasRect.left ||
          e.clientX > canvasRect.right ||
          e.clientY < canvasRect.top ||
          e.clientY > canvasRect.bottom
        ) {
          setCoords({
            x: DEFAULT_CURSOR_POSITION,
            y: DEFAULT_CURSOR_POSITION,
          });
          return;
        }
      }

      // muda a posição do cursor de acordo com as coordenadas
      setCoords({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener("mousemove", updatePosition, false);
    document.addEventListener("mouseenter", updatePosition, false);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", updatePosition);
    };
  }, []);

  // controle de cursor (css)
  useEffect(() => {
    if (display) {
      document.documentElement.classList.add("hide-cursor");
    } else {
      document.documentElement.classList.remove("hide-cursor");
    }
  }, [display]);

  if (!display) return null;

  return (
    // renderiza um componente fora do seu componente pai
    <Portal.Root>
      <div
        className='pointer-events-none fixed left-0 top-0 h-9 w-9 cursor-grab select-none rounded-bl-full rounded-br-full rounded-tl-md rounded-tr-full bg-white shadow-2xl'
        style={{
          transform: `translate(${coords.x}px, ${coords.y}px)`,
        }}
      />
    </Portal.Root>
  );
};

export default NewThreadCursor;
