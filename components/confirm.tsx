import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ButtonC } from "@/components/ui/buttonC";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  candidate_id: number;
  event_id: number;
  voter_id: number;
}

export const ConfirmB = ({ candidate_id }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onCreate = async () => {
    try {
      setIsLoading(true);
      await axios.create(`/api/vote/`);
      toast.success("You have Successfully Voted");
      router.push(`/`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2 mt-5 ">
      <ConfirmModal onConfirm={onCreate}>
        <ButtonC size="lg" disabled={isLoading} className="bg-slate-500">
          Vote
        </ButtonC>
      </ConfirmModal>
    </div>
  );
};
