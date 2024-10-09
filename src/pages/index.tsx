import React from "react";

const Index = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h2 className="font-orkney">Wygląda na to, że zostałeś wylogowany</h2>
      <h3 className="font-orkney underline" onClick={() => location.reload()}>
        ODŚWIEŻ STRONĘ
      </h3>
    </div>
  );
};

export default Index;
