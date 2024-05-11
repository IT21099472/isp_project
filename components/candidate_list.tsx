import { Candidate } from "@prisma/client";
import { CandidateCard } from "@/components/candidate_card";

interface CandidateListProps {
    items: Candidate[];
}

export const CandidateList = ({ items }: CandidateListProps) => {
    return (
        <div>
            <div className="grid grid-cols-12 gap-5 p-5">
                {items.map((item) => (
                    <CandidateCard
                        key={item.candidate_id}
                        candidate_id={item.candidate_id}
                        candidate_name={item.candidate_name}
                        candidate_department={item.candidate_department}
                        candidate_photo={item.candidate_photo}
                        candidate_status={item.candidatus_status}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No candidates found
                </div>
            )}
        </div>
    );
};
