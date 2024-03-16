import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DimensionsProps } from "@/types/type";

const dimensionsOptions = [
  { label: "Width", property: "width" },
  { label: "Height", property: "height" },
];

const Dimensions = ({
  width,
  height,
  isEditingRef,
  handleInputChange,
}: DimensionsProps) => (
  <section className='flex flex-col border-b border-slate-700 py-3'>
    <div className='flex flex-col gap-4 px-5 py-3'>
      {dimensionsOptions.map((item) => (
        <div
          key={item.label}
          className='flex flex-1 items-center gap-3 rounded-sm'
        >
          <Label htmlFor={item.property} className='text-[14px] font-bold'>
            {item.label}
          </Label>
          <Input
            type='number'
            id={item.property}
            placeholder='100'
            value={item.property === "width" ? width : height}
            className='input-ring'
            min={10}
            onChange={(e) => handleInputChange(item.property, e.target.value)}
            onBlur={(e) => {
              isEditingRef.current = false;
            }}
          />
        </div>
      ))}
    </div>
  </section>
);

export default Dimensions;
