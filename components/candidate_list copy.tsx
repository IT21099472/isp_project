import { Candidate } from "@prisma/client";
import { CandidateCardd  } from "@/components/candidate_card copy";

interface CandidateListProps {
    items: Candidate[];
}

export const CandidateList = ({ items }: CandidateListProps) => {
    return (
        <>
                {items.map((item) => (
                    <CandidateCardd
                        key={item.candidate_id}
                        candidate_id={item.candidate_id}
                        candidate_name={item.candidate_name}
                        candidate_department={item.candidate_department}
                        candidate_photo={item.candidate_photo}
                        candidate_status={item.candidatus_status}
                        event_id={item.event_id}
                    />
                ))}
          
            </>
           
    );
};
