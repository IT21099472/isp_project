"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface EventItemProps { // Adjust component name and props
  label: string;
  value?: string;
  icon?: IconType;
}

export const EventItem = ({
  label,
  value,
  icon: Icon,
}: EventItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentEventId = searchParams.get("event_id"); // Adjust query parameter
  const currentName = searchParams.get("candidate_name");

  const isSelected = currentEventId === value;

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        candidate_name: currentName,
        event_id: isSelected ? null : value,
      }
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">
        {label}
      </div>
    </button>
  );
};
