import React from "react";

const Index = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <h2 className="font-orkney">Wygląda na to, że zostałeś wylogowany</h2>
      <h3
        className="font-orkney underline hover:cursor-pointer"
        onClick={() => location.reload()}
      >
        ODŚWIEŻ STRONĘ
      </h3>
    </div>
  );
};

export default Index;
