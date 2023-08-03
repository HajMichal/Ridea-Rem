import React from "react";
import { api } from "~/utils/api";

const Dashboard = () => {
  api.dataFlow.downloadSQLiteFile.useQuery();
  return (
    <div>
      <div>Fotowoltaika</div>
      <div>Pompy ciepła</div>
      <div>Fotowoltaika dla firm</div>
      <div>Magazyn energii</div>
    </div>
  );
};

export default Dashboard;
