import React from 'react'
import{Switch} from "antd";
import { InfoCard } from "../_components/info-card";
import { CheckCircle, Clock } from "lucide-react";
import { DataTable } from "./_components/data-table";

const EventPage = () => {
  return (
    <div className="p-6 space-y-4">
      Dashboard

      <div className="p-6 space-y-4">
      admin home
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={1}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={1}
          variant="success"
       />
       <InfoCard
          icon={CheckCircle}
          label="omer"
          numberOfItems={1}
          variant="success"
       />
      </div>
      <div className="p-6">
        <DataTable columns={columns} data={Voter} />
      </div>
      
    </div>
    </div>
  );
}

export default EventPage