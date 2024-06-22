import { Navbar, SideBar } from "~/components";

function Klimatyzacja() {
  return (
    <main className="flex h-full max-h-screen overflow-hidden bg-backgroundGray font-orkney font-normal laptop:justify-center">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="p-5">
          <h1>Kalkulator w trakcie budowy</h1>
          <h3>Wkrótce dostępny!</h3>
        </div>
      </div>
    </main>
  );
}
export default Klimatyzacja;
