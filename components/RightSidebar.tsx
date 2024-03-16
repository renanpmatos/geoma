import React, { useMemo, useRef } from "react";

import { RightSidebarProps } from "@/types/type";
import { bringElement, modifyShape } from "@/lib/shapes";

import Text from "./settings/Text";
import Color from "./settings/Color";
import Export from "./settings/Export";
import Dimensions from "./settings/Dimensions";
import { PaintBucket, PencilRuler } from "lucide-react";

const RightSidebar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef.current) isEditingRef.current = true;

    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  // memoize the content of the right sidebar to avoid re-rendering on every mouse actions
  const memoizedContent = useMemo(
    () => (
      <section className='sticky right-0 flex h-full min-w-[227px] select-none flex-col border-t border-primary-grey-200 bg-slate-900 text-white max-sm:hidden'>
        <h3 className='flex flex-row pl-5 pt-5 text-[16px] font-bold text-white'>
          Edição <PencilRuler className='mb-2 ml-2 text-rose-400' />
        </h3>

        <Dimensions
          isEditingRef={isEditingRef}
          width={elementAttributes.width}
          height={elementAttributes.height}
          handleInputChange={handleInputChange}
        />

        <Text
          fontFamily={elementAttributes.fontFamily}
          fontSize={elementAttributes.fontSize}
          fontWeight={elementAttributes.fontWeight}
          handleInputChange={handleInputChange}
        />
        <div className='border-b border-slate-700 pb-2'>
          <h3 className='flex flex-row pl-5 pt-5 text-[16px] font-bold text-white'>
            Cores <PaintBucket className='mb-2 ml-2 text-rose-400' />
          </h3>
          <Color
            inputRef={colorInputRef}
            attribute={elementAttributes.fill}
            placeholder='Interna'
            attributeType='fill'
            handleInputChange={handleInputChange}
          />

          <Color
            inputRef={strokeInputRef}
            attribute={elementAttributes.stroke}
            placeholder='Borda'
            attributeType='stroke'
            handleInputChange={handleInputChange}
          />
        </div>

        <Export />
      </section>
    ),
    [elementAttributes]
  );

  return memoizedContent;
};

export default RightSidebar;
