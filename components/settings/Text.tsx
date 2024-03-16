import {
  fontFamilyOptions,
  fontSizeOptions,
  fontWeightOptions,
} from "@/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { TextProps, RenderSelectProps } from "@/types/type";

import { Pencil } from "lucide-react";
const selectConfigs = [
  {
    property: "fontFamily",
    placeholder: "Choose a font",
    options: fontFamilyOptions,
  },
  { property: "fontSize", placeholder: "30", options: fontSizeOptions },
  {
    property: "fontWeight",
    placeholder: "Semibold",
    options: fontWeightOptions,
  },
];

const Text = ({
  fontFamily,
  fontSize,
  fontWeight,
  handleInputChange,
}: TextProps) => (
  <div className='flex flex-col gap-3 border-b border-slate-700 px-5 py-5'>
    <h3 className='flex flex-row text-[16px] font-bold text-white'>
      Texto <Pencil className='mb-2 ml-2 text-rose-400' />
    </h3>
    <div className='flex flex-col gap-3'>
      {RenderSelect({
        config: selectConfigs[0],
        fontSize,
        fontWeight,
        fontFamily,
        handleInputChange,
      })}
      <div className='flex gap-2'>
        {selectConfigs.slice(1).map((config) =>
          RenderSelect({
            config,
            fontSize,
            fontWeight,
            fontFamily,
            handleInputChange,
          })
        )}
      </div>
    </div>
  </div>
);

const RenderSelect = ({
  config,
  fontSize,
  fontWeight,
  fontFamily,
  handleInputChange,
}: RenderSelectProps) => (
  <Select
    key={config.property}
    onValueChange={(value) => handleInputChange(config.property, value)}
    value={
      config.property === "fontFamily"
        ? fontFamily
        : config.property === "fontSize"
          ? fontSize
          : fontWeight
    }
  >
    <SelectTrigger className='no-ring w-full rounded-md border border-slate-700'>
      <SelectValue
        placeholder={
          config.property === "fontFamily"
            ? "Escolha a Fonte"
            : config.property === "fontSize"
              ? "30"
              : "Semibold"
        }
      />
    </SelectTrigger>
    <SelectContent className='border-primary-grey-200 bg-slate-950 text-primary-grey-300'>
      {config.options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          className='font-bold hover:bg-rose-500 hover:text-white'
        >
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default Text;
