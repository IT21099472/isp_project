import React from 'react'
import{Switch} from "antd";

const EventPage = () => {
  return (
    <div className="p-6 space-y-4">
      Dashboard
      <div className="toggle"><Switch /></div>
    </div>
  );
}

export default EventPage