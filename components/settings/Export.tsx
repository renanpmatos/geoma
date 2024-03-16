import { exportToPdf } from "@/lib/utils";

import { Button } from "../ui/button";
import { Download } from "lucide-react";

const Export = () => (
  <div className='flex flex-col gap-3 px-5 py-3'>
    <h3 className='flex flex-row pt-2 text-[16px] font-bold text-white'>
      Exportar <Download className='mb-2 ml-2 text-rose-400' />
    </h3>
    <Button
      variant='outline'
      className='w-full border-none bg-rose-500 font-bold text-white hover:bg-rose-600 hover:duration-500'
      onClick={exportToPdf}
    >
      Exportar para PDF
    </Button>
  </div>
);

export default Export;
