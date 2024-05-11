import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  candidateId: number;
}

export const Actions = ({ candidateId }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/candidate/${candidateId}`);
      toast.success("Candidate deleted");
      router.push(`/admin/candidate/`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2 ">
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} className="bg-slate-500">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
