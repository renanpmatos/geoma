import { Label } from "../ui/label";
import { ColorProps } from "@/types/type";
import { PaintBucket } from "lucide-react";

const Color = ({
  inputRef,
  attribute,
  placeholder,
  attributeType,
  handleInputChange,
}: ColorProps) => (
  <div className='flex flex-col gap-3 p-5'>
    <h3 className='text-[14px] font-semibold text-white'>{placeholder}</h3>
    <div
      className='flex items-center gap-2 rounded-md border border-slate-700'
      onClick={() => inputRef.current.click()}
    >
      <input
        type='color'
        value={attribute}
        ref={inputRef}
        onChange={(e) => handleInputChange(attributeType, e.target.value)}
      />
      <Label className='flex-1'>{attribute}</Label>
      <Label className='flex h-6 w-8 items-center justify-center bg-primary-grey-100 text-[12px] leading-3'>
        90%
      </Label>
    </div>
  </div>
);

export default Color;
