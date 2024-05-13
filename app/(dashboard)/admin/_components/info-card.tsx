import { LucideIcon } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";

interface InfoCardProps {
  numberOfItems?: number;
  variant?: "default" | "success";
  label: string;
  name?: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  name,
  label,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <div className="text-gray-500 text-sm">
          {numberOfItems !== undefined && (
            <div className="text-gray-500 text-sm">
              {numberOfItems} {numberOfItems === 1 ? "Vote" : "Votes"}
            </div>
          )}
          {name && <p className="text-gray-500 text-sm">{name}</p>}
        </div>
      </div>
    </div>
  );
};
