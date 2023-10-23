import { AlertCircle, InfoIcon } from "lucide-react";
import { ReactNode } from "react";
import { toast } from "sonner";

export const info = (info: string, customIcon?: ReactNode) => {
  toast(
    <div className="flex items-center gap-4">
      {customIcon ? customIcon : <InfoIcon className="h-5 w-5" />}

      <p>{info}</p>
    </div>
  );
};

export const error = (error: string, customIcon?: ReactNode) => {
  toast(
    <div className="flex items-center gap-4">
      <div className="text-destructive">
        {customIcon ? customIcon : <AlertCircle className="h-5 w-5" />}
      </div>
      <p>{error}</p>
    </div>
  );
};
