"use client";

import { useCallback, useRef } from "react";
import { useMaxZIndex } from "@/lib/useMaxZIndex";
import { PinnedThread } from "./PinnedThread";
import { ThreadData } from "@liveblocks/client";
import {
  ThreadMetadata,
  useEditThreadMetadata,
  useThreads,
  useUser,
} from "@/liveblocks.config";

type OverlayThreadProps = {
  thread: ThreadData<ThreadMetadata>;
  maxZIndex: number;
};

export const CommentsOverlay = () => {
  // lista as threads na sala
  const { threads } = useThreads();

  const maxZIndex = useMaxZIndex();

  return (
    <div>
      {threads
        .filter((thread) => !thread.metadata.resolved)
        .map((thread) => (
          <OverlayThread
            key={thread.id}
            thread={thread}
            maxZIndex={maxZIndex}
          />
        ))}
    </div>
  );
};

const OverlayThread = ({ thread, maxZIndex }: OverlayThreadProps) => {
  const editThreadMetadata = useEditThreadMetadata();

  // pega o user da thread
  const { isLoading } = useUser(thread.comments[0].userId);

  // ref para posicionar o elemento
  const threadRef = useRef<HTMLDivElement>(null);

  // se tiver mais threads, aumenta o z-index
  const handleIncreaseZIndex = useCallback(() => {
    if (maxZIndex === thread.metadata.zIndex) {
      return;
    }
    //update do z-index no room
    editThreadMetadata({
      threadId: thread.id,
      metadata: {
        zIndex: maxZIndex + 1,
      },
    });
  }, [thread, editThreadMetadata, maxZIndex]);

  if (isLoading) return null;

  return (
    <div
      ref={threadRef}
      id={`thread-${thread.id}`}
      className='absolute left-0 top-0 flex gap-5'
      style={{
        transform: `translate(${thread.metadata.x}px, ${thread.metadata.y}px)`,
      }}
    >
      {/* carrega a thread */}
      <PinnedThread thread={thread} onFocus={handleIncreaseZIndex} />
    </div>
  );
};
