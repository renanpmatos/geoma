"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Layers } from "lucide-react";
import { getShapeInfo } from "@/lib/utils";

const LeftSidebar = ({ allShapes }: { allShapes: Array<any> }) => {
  // memoize para apenas mudar com novos objetos
  const memoizedShapes = useMemo(
    () => (
      <section className='sticky left-0 flex h-full min-w-[227px] select-none flex-col overflow-y-auto  bg-slate-900 pb-20 text-primary-grey-300 max-sm:hidden'>
        <h3 className='flex flex-row border-b border-slate-700 py-4 pl-5 text-[18px] font-bold text-white'>
          Camadas <Layers className='mb-2 ml-2 text-rose-400' />
        </h3>
        <div className='flex flex-col'>
          {allShapes?.map((shape: any) => {
            const info = getShapeInfo(shape[1]?.type);

            return (
              <div
                key={shape[1]?.objectId}
                className='group my-1 flex items-center gap-2 px-5 py-2.5 hover:cursor-pointer hover:bg-rose-500 hover:text-white'
              >
                <Image
                  src={info?.icon}
                  alt='Layer'
                  width={16}
                  height={16}
                  className='group-hover'
                />
                <h3 className='text-sm font-semibold capitalize'>
                  {info.name}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
    ),
    [allShapes?.length]
  );

  return memoizedShapes;
};

export default LeftSidebar;
