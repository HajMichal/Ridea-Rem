import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useRouter } from "next/router";
import { SideBar } from "~/components/SideBar";
import { Select } from "@mantine/core";

import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";

interface JsonFileData {
  kalkulator: {
    dane: {
      dwa: number;
      cztery: number;
      szesc: number;
      osiem: number;
      dwanascie: number;
      dwadziescia: number;
      trzydziesci: number;
      piecdziesiat: number;
    };
    dotacje: object;
    koszty_dodatkowe: object;
    magazyn_ciepla: number;
    tarcza_solidarnosciowa: number[];
  };
}

const Fotowoltaika = () => {
  const [southRoof, setSouthRoof] = useState(false);
  const [solarEdge, setSolarEdge] = useState(false);
  const [eccentrics, setEccentrics] = useState(false);
  const [roofWeightSystem, setRoofWeightSystem] = useState(false);
  const [groundMontage, setGroundMontage] = useState(false);
  const [hybridInverter, setHybridInverter] = useState(false);
  const [voucherHoliday, setVoucherHoliday] = useState(false);
  const [companyFee, setCompanyFee] = useState(false);
  const [heatStore, setHeatStore] = useState(false);
  const [energyManageSystem, setEnergyManageSystem] = useState(false);
  const [taxCredit, setTaxCredit] = useState(0); // wynik w procentach
  const [tankSize, setTankSize] = useState<string>("Zbiornik 100L");
  const [optymalizatorsInstall, setOptymalizatorsInstall] = useState(0);
  const [consultantMarkup, setConsultantMarkup] = useState(0);
  const [usageLimit, setUsageLimit] = useState<number>(2000);
  const [energyPriceInLimit, setEnergyPriceInLimit] = useState<number>();
  const [energyPriceOutOfLimit, setEnergyPriceOutOfLimit] = useState<number>();
  const [recentYearTrendUsage, setRecentYearTrendUsage] = useState<number>();
  const [autoconsumption_step, setAutoconsumption_step] = useState<number>(0.1); // D19 stopien autokonsupcji w procentach (ex: 0.3)

  const { data: sessionData } = useSession();
  const router = useRouter();

  // const { mutate } = api.dataFlow.setJSONFile.useMutation();
  const { data } = api.dataFlow.downloadFile.useQuery<JsonFileData>();
  console.log(data);

  const { mutate: set_limit_price_trend, data: limit_price_trend } =
    api.photovoltaics.price_trend.useMutation(); // D3
  const { mutate: set_outOfLimit_price_trend, data: outOfLimit_price_trend } =
    api.photovoltaics.price_trend.useMutation(); // D4
  const { mutate: set_system_power, data: system_power } =
    api.photovoltaics.system_power.useMutation(); // D17
  const { mutate: set_estimated_kWh_prod, data: estimated_kWh_prod } =
    api.photovoltaics.estimated_kWh_production.useMutation(); // D18
  const { mutate: set_autoconsumption, data: autoconsumption } =
    api.photovoltaics.autoconsumption.useMutation(); // D20
  const {
    mutate: set_total_payment_energy_transfer,
    data: total_payment_energy_transfer, // D13
  } = api.photovoltaics.total_payment_energy_transfer.useMutation();
  const {
    mutate: set_energy_sold_to_distributor,
    data: energy_sold_to_distributor, // D21
  } = api.photovoltaics.energy_sold_to_distributor.useMutation();
  const {
    mutate: set_accumulated_funds_on_account,
    data: accumulated_funds_on_account, // D23
  } = api.photovoltaics.accumulated_funds_on_account.useMutation();
  const {
    mutate: set_total_energy_trend_fee,
    data: total_energy_trend_fee, // D23
  } = api.photovoltaics.total_energy_trend_fee.useMutation();
  const {
    mutate: set_yearly_bill_without_photovolatics,
    data: yearly_bill_without_photovolatics,
  } = api.photovoltaics.yearly_bill_without_photovolatics.useMutation();
  const { mutate: set_yearly_total_fees, data: yearly_total_fees } =
    api.photovoltaics.yearly_total_fees.useMutation();
  const {
    mutate: set_yearly_costs_with_photovoltaics,
    data: yearly_costs_with_photovoltaics,
  } = api.photovoltaics.yearly_costs_with_photovoltaics.useMutation();
  const { mutate: set_total_save, data: total_save } =
    api.photovoltaics.total_save.useMutation();
  const {
    mutate: set_installationAndPer1KW_price,
    data: installationAndPer1KW_price,
  } = api.photovoltaics.price_for_1_KW.useMutation();

  // useEffect(() => {
  //   if (sessionData === null) {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //     void router.push("/api/auth/signin");
  //   }
  // }, [sessionData, router]);

  // D5 = C6 -> Ilość energii zużywanej średnio rocznie
  // D20 -> autokonsumpcja -> D18*D19 =
  //      D18 -> szacowana produkcja -> if(F9){ 1020 * C11 } esle if(!F9) {920 * C11}
  //          F9 -> Dach południowy (tak/nie)
  //          C11 -> moc systemu = E11 * (moc panela = 400) / 1000
  //                E11 -> ilość modułow (wybiera user)
  //      D19 -> stopien autokonspucji w %
  // D21 -> odsprzedana energia -> D18 - D20
  // D23 -> zgromadzone srodki na koncie rozliczeniowym -> D21 * (srednia cena sprzedazy kWh = 0.72)
  // H3 = E4 -> limit zuzycia
  // G3 = F3 = G2<dobór instalacji> * 49.1%
  // G4 = F4 = G3<dobór instalacji>  * 49.1%

  // D13 -> Łączna opłata za przesył energii elektrycznej  if( (D5 - D20) > H3 ) { (G3 * H3) + (G4 * (D5 - D20 - H3)) } else { (D5 - D20) * G3 }

  useEffect(() => {
    if (system_power) {
      set_estimated_kWh_prod({
        southRoof: southRoof,
        system_power: system_power,
      });
    }
  }, [system_power, southRoof, set_estimated_kWh_prod]);
  useEffect(() => {
    if (autoconsumption_step && estimated_kWh_prod)
      set_autoconsumption({
        autoconsumption_step: autoconsumption_step,
        estimated_kWh_prod: estimated_kWh_prod,
      });
  }, [
    autoconsumption_step,
    estimated_kWh_prod,
    set_estimated_kWh_prod,
    set_autoconsumption,
  ]);
  useEffect(() => {
    if (
      autoconsumption &&
      energyPriceInLimit &&
      energyPriceOutOfLimit &&
      recentYearTrendUsage
    )
      set_total_payment_energy_transfer({
        autoconsumption: autoconsumption,
        priceInLimit: energyPriceInLimit,
        priceOutOfLimit: energyPriceOutOfLimit,
        recentYearTrendUsage: recentYearTrendUsage,
        usageLimit: usageLimit,
      });
  }, [
    autoconsumption,
    energyPriceInLimit,
    usageLimit,
    energyPriceOutOfLimit,
    recentYearTrendUsage,
    set_autoconsumption,
    set_total_payment_energy_transfer,
  ]);
  useEffect(() => {
    if (autoconsumption && estimated_kWh_prod)
      set_energy_sold_to_distributor({
        autoconsumption: autoconsumption,
        estimated_kWh_prod: estimated_kWh_prod,
      });
  }, [
    autoconsumption,
    estimated_kWh_prod,
    set_energy_sold_to_distributor,
    set_autoconsumption,
  ]);
  useEffect(() => {
    if (energy_sold_to_distributor)
      set_accumulated_funds_on_account({
        energy_sold_to_distributor: energy_sold_to_distributor,
      });
  }, [energy_sold_to_distributor, set_accumulated_funds_on_account]);
  useEffect(() => {
    if (
      accumulated_funds_on_account &&
      autoconsumption &&
      energyPriceInLimit &&
      energyPriceOutOfLimit &&
      recentYearTrendUsage
    ) {
      set_total_energy_trend_fee({
        accumulated_funds_on_account: accumulated_funds_on_account,
        autoconsumption: autoconsumption,
        priceInLimit: energyPriceInLimit,
        priceOutOfLimit: energyPriceOutOfLimit,
        usageLimit: usageLimit,
        recentYearTrendUsage: recentYearTrendUsage,
      });
    }
  }, [
    accumulated_funds_on_account,
    autoconsumption,
    energyPriceInLimit,
    energyPriceOutOfLimit,
    usageLimit,
    recentYearTrendUsage,
    set_total_energy_trend_fee,
  ]);
  useEffect(() => {
    if (limit_price_trend && outOfLimit_price_trend && recentYearTrendUsage)
      set_yearly_bill_without_photovolatics({
        limit_price_trend: limit_price_trend,
        outOfLimit_price_trend: outOfLimit_price_trend,
        recentYearTrendUsage: recentYearTrendUsage,
        usageLimit: usageLimit,
      });
  }, [
    usageLimit,
    recentYearTrendUsage,
    outOfLimit_price_trend,
    limit_price_trend,
    set_yearly_bill_without_photovolatics,
  ]);
  useEffect(() => {
    if (energyPriceInLimit && energyPriceOutOfLimit && recentYearTrendUsage)
      set_yearly_total_fees({
        energyPriceInLimit: energyPriceInLimit,
        energyPriceOutOfLimit: energyPriceOutOfLimit,
        recentYearTrendUsage: recentYearTrendUsage,
        usageLimit: usageLimit,
      });
  }, [
    usageLimit,
    recentYearTrendUsage,
    energyPriceInLimit,
    energyPriceOutOfLimit,
    set_yearly_total_fees,
  ]);
  useEffect(() => {
    if (
      // eslint-disable-next-line
      (total_energy_trend_fee || total_energy_trend_fee === 0) &&
      // eslint-disable-next-line
      (total_payment_energy_transfer || total_payment_energy_transfer === 0)
    )
      set_yearly_costs_with_photovoltaics({
        total_energy_trend_fee: total_energy_trend_fee,
        total_payment_energy_transfer: total_payment_energy_transfer,
      });
  }, [
    total_energy_trend_fee,
    total_payment_energy_transfer,
    set_yearly_costs_with_photovoltaics,
  ]);
  useEffect(() => {
    if (yearly_costs_with_photovoltaics && yearly_bill_without_photovolatics)
      set_total_save({
        yearly_bill_without_photovolatics: yearly_bill_without_photovolatics,
        yearly_costs_with_photovoltaics: yearly_costs_with_photovoltaics,
      });
  }, [
    yearly_costs_with_photovoltaics,
    yearly_bill_without_photovolatics,
    set_total_save,
  ]);
  useEffect(() => {
    if (system_power && data) {
      set_installationAndPer1KW_price({
        system_power: system_power,
        dane: data?.kalkulator.dane,
      });
    }
  }, [data, system_power, set_installationAndPer1KW_price]);

  const inLimitOnChange = useCallback(
    (e: { target: { valueAsNumber: number } }) => {
      set_limit_price_trend(e.target.valueAsNumber);
      setEnergyPriceInLimit(e.target.valueAsNumber);
    },
    [set_limit_price_trend]
  );
  const outOfLimitOnChange = useCallback(
    (e: { target: { valueAsNumber: number } }) => {
      set_outOfLimit_price_trend(e.target.valueAsNumber);
      setEnergyPriceOutOfLimit(e.target.valueAsNumber);
    },
    [set_outOfLimit_price_trend]
  );

  return (
    <main className="flex h-full min-h-screen justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] font-orkney">
      <SideBar />
      <div className="w-full">
        <Navbar />
        <div className="container flex flex-col  justify-center gap-12 px-4 py-16 text-white">
          <div>
            <label className="font-bold">Cena energii</label>
            <div className="my-1 flex gap-1">
              <input
                type="number"
                className="text-black"
                onBlur={inLimitOnChange}
              />
              <p>w limicie (G2)</p>
            </div>
            <div className="my-1 flex gap-1">
              <input
                type="number"
                className="text-black"
                onBlur={outOfLimitOnChange}
              />
              <p>poza limitem(G3)</p>
            </div>
          </div>

          <div>
            <label className="font-bold">Cena prądu w limicie kWh</label>
            <div className="flex gap-1">
              <p>{limit_price_trend}</p>
              <p>PLN/kWh</p>
              <label>Limit zużycia (E4)</label>
              <Select
                onChange={(e) => {
                  setUsageLimit(Number(e));
                }}
                className="max-w-xs text-black"
                defaultValue={"2000"}
                data={["2000", "2600", "3000"]}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <p>cena prądu po przekroczeniu 2000kWh: </p>
            <p>{outOfLimit_price_trend}</p>
            <p>PLN/kWh</p>
          </div>
          <div>
            <p>Ilość energii zużywanej średnio rocznie w kWh (C6)</p>
            <input
              type="number"
              onBlur={(e) => {
                setRecentYearTrendUsage(e.target.valueAsNumber);
              }}
              className="text-black"
            />
          </div>
          <div>
            <p>Ilość modułów (E11)</p>
            <input
              type="number"
              onBlur={(e) => set_system_power(e.target.valueAsNumber)}
              className="text-black"
            />
          </div>
          <div>
            <p>Stopień autokonsumpcji energii z PV (H6)</p>
            <Select
              onChange={(e) => {
                setAutoconsumption_step(Number(e));
              }}
              className=" max-w-xs text-black"
              defaultValue={"0.1"}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              data={[
                { value: "0.1", label: "10%" },
                { value: "0.2", label: "20%" },
                { value: "0.3", label: "30%" },
                { value: "0.4", label: "40%" },
                { value: "0.5", label: "50%" },
                { value: "0.6", label: "60%" },
                { value: "0.7", label: "70%" },
                { value: "0.8", label: "80%" },
              ]}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="">Dach południowy (F9)</label>
            <Select
              onChange={(e) => setSouthRoof(e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"false"}
              allowDeselect
              className="max-w-xs text-black"
            />
          </div>
          <div>
            Łączna opłata za przesył energii elektrycznej{" "}
            {total_payment_energy_transfer} PLN
          </div>
          <div>
            Łączna opłata energii elektrycznej {total_energy_trend_fee} PLN
          </div>
          <div>
            Rachunek roczny z fotowoltaiką {yearly_costs_with_photovoltaics}
            PLN
          </div>
          <div className="flex gap-2">
            <p>Rachunek roczny za prąd bez fotowoltaiki</p>
            {yearly_bill_without_photovolatics}
            <p>PLN/rok</p>
          </div>
          <div className="flex gap-2">
            <p>Roczna łączna opłata energii elektrycznej </p>
            {yearly_total_fees?.yearly_total_trend_fee}
            <p>PLN/rok</p>
          </div>
          <div className="flex gap-2">
            <p>Roczna łączna opłata za przesył energii elektrycznej </p>
            {yearly_total_fees?.yearly_total_fee_for_energy_transfer}
          </div>
          <div className="flex gap-2">
            <p>ŁĄCZNIE OSZCZĘDZASZ </p>
            {total_save}
            <p>PLN/rok</p>
          </div>
          <div>
            <label>Montaż na wielu powierzchniach dachu z Solar Edge</label>
            <Select
              onChange={(e) => setSolarEdge(e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"false"}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>Montaż dach płaski - Ekierki ( kąt dachu poniżej 20º)</label>
            <Select
              onChange={(e) => setEccentrics(e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"false"}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>
              System dachowy obciążeniowy, balastowy. (tylko na membramie, każdy
              inny kotwiony do dachu)
            </label>
            <Select
              onChange={(e) => setRoofWeightSystem(e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"false"}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>
              Montaż NA GRUNCIE (konstrukcja wbijana lub wylane stopy betonowe)
            </label>
            <Select
              onChange={(e) => setGroundMontage(e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"false"}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>
              Zainstalowanie optymalizatorów TIGO do zacienionych modułów
              (Wybierz 1 + ilość opymaliz.)
            </label>
            <input
              type="number"
              onBlur={(e) => setOptymalizatorsInstall(e.target.valueAsNumber)}
            />
          </div>
          <div>
            <label>Montaż , dowóz , uruchomienie ( narzut doradcy )</label>
            <Select
              onChange={(e) => {
                setConsultantMarkup(Number(e));
              }}
              className=" max-w-xs text-black"
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"0"}
              data={[
                { value: "0", label: "0" },
                { value: "100", label: "100" },
                { value: "200", label: "200" },
                { value: "300", label: "300" },
                { value: "400", label: "400" },
                { value: "500", label: "500" },
                { value: "550", label: "550" },
                { value: "600", label: "600" },
                { value: "650", label: "650" },
                { value: "700", label: "700" },
                { value: "750", label: "750" },
                { value: "800", label: "800" },
                { value: "850", label: "850" },
                { value: "900", label: "900" },
                { value: "950", label: "950" },
                { value: "1000", label: "1000" },
              ]}
            />
          </div>
          <div>
            <label>Inwerter hybrydowy</label>
            <Select
              onChange={(e) => setHybridInverter(e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"false"}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>Voucher Holiday</label>
            <Select
              onChange={(e) => setVoucherHoliday(e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"false"}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>Podatek VAT FIRMA 23%</label>
            <Select
              onChange={(e) => setCompanyFee(e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"false"}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>Magazyn ciepła wraz z montażem</label>
            <Select
              onChange={(e) => setHeatStore(e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"false"}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>Wielkość zbiornika CWU</label>
            <Select
              onChange={(e) => setTankSize(e!)}
              defaultValue={"Zbiornik 100L"}
              data={[
                { value: "Zbiornik 100L", label: "Zbiornik 100L" },
                { value: "Zbiornik 140L", label: "Zbiornik 140L" },
                { value: "Zbiornik 200L", label: "Zbiornik 200L" },
                {
                  value: "Zbiornik 200L z wężownicą",
                  label: "Zbiornik 200L z wężownicą",
                },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              className="max-w-xs text-black"
            />
          </div>
          <div>
            <label>Systemem zarządzania energią HMS</label>
            <Select
              onChange={(e) => setEnergyManageSystem(e == "true")}
              data={[
                { value: "true", label: "Tak" },
                { value: "false", label: "Nie" },
              ]}
              icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
              defaultValue={"false"}
              className="max-w-xs text-black"
            />
          </div>
          {/* DOtacja do magazynu ciepła  */}
          {heatStore && (
            <>
              <div>
                <label>Mój prąd fotowoltaika</label>
                (Obliczenia)
              </div>
              <div>
                <label>Manager energii</label>
                (Obliczenia)
              </div>
              <div>
                <label>Ulga podatkowa</label>
                <Select
                  onChange={(e) => setTaxCredit(Number(e))}
                  data={[
                    { value: "0", label: "0%" },
                    { value: "12", label: "12%" },
                    { value: "32", label: "32%" },
                  ]}
                  icon={<MdOutlinePlaylistAddCheckCircle size="1.5rem" />}
                  defaultValue={"0"}
                  className="max-w-xs text-black"
                />
              </div>
            </>
          )}
          <div>
            <p>Cena za 1KW: {installationAndPer1KW_price?.price_per_1KW} PLN</p>
          </div>
          <div>
            <p>
              WYLICZONA CENA ZA INSTALACJĘ BAZA:{" "}
              {installationAndPer1KW_price?.base_installation_price} PLN
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Fotowoltaika;
