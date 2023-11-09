import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import { type PhotovoltaicCalculations } from "~/store/photovoltaic/photovoltaicCalculationSlice";
import { type PhotovoltaicsSlice } from "~/store/photovoltaic/photovoltaicSlice";

Font.register({
  family: "Orkney",
  fonts: [
    { src: `${process.env.NEXT_PUBLIC_BASE_URL}/static/Orkney.otf` },
    {
      src: `${process.env.NEXT_PUBLIC_BASE_URL}/static/Orkneybold.otf`,
      fontWeight: 600,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: "Orkney",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  pricingSection: {
    margin: 10,
    padding: 10,
    paddingLeft: 50,
    paddingTop: 50,
    flexGrow: 1,
  },
  image: {
    width: "auto",
    height: "auto",
  },
  title: {
    fontSize: 40,
    fontWeight: 600,
    fontFamily: "Orkney",
    marginTop: -30,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  eachRow: {
    paddingHorizontal: 20,
    backgroundColor: "#FEEB1A",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    padding: 12,
    fontSize: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 3,
    flexDirection: "row",
  },
  priceRow: {
    paddingHorizontal: 20,
    backgroundColor: "#FEEB1A",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    padding: 10,
    fontSize: 12,
    display: "flex",
    width: "75%",
    marginVertical: 3,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50,
  },
  paymentReturnTime: {
    paddingHorizontal: 20,
    backgroundColor: "#FEEB1A",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    padding: 10,
    fontSize: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    marginVertical: 3,
    flexDirection: "row",
  },
  boldFont: {
    fontWeight: 600,
    fontFamily: "Orkney",
  },
  imageSection: {
    width: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoImage: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginLeft: 10,
  },
  signatureImage: {
    transform: "rotate(90deg)",
    width: 250,
    height: "auto",
    marginLeft: -90,
    marginTop: -310,
  },
  pageNum: {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 30,
    fontFamily: "Orkney",
    textAlign: "center",
  },
});

interface DataToPDF {
  photovoltaicCalcStore: PhotovoltaicCalculations;
  photovoltaicStore: PhotovoltaicsSlice["photovoltaicStore"];
  energyStore_dotation: number | undefined;
  photovoltaics_dotation: number | undefined;
}

const MyDocument = ({
  photovoltaicCalcStore,
  photovoltaicStore,
  energyStore_dotation,
  photovoltaics_dotation,
}: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/firstPage.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/secondPage.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/thirdPage.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.pricingSection}>
        <Text style={styles.title}>OFERTA</Text>
        <Text style={styles.subTitle}>KOSZTA I OSZCZĘDNOŚCI</Text>

        <View style={styles.eachRow}>
          <Text>TWOJE OBECNE ZUŻYCIE ENERGII </Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.recentYearTrendUsage} kWh
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>TARCZA SOLIDARNOŚCIOWA</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.usageLimit} kWh
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>KOSZTY ENERGII ELEKTRYCZNEJ </Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.total_energy_trend_fee.toFixed(2)} zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>KOSZTY OPŁAT DYSTRYBUCJI</Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.total_payment_energy_transfer.toFixed(2)} zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIDYWANA WYSOKOŚC RACHUNKI ZA 2023 </Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.yearly_bill_without_photovolatics.toFixed(2)}{" "}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>ŚREDNI KOSZT KAŻDEJ kWh </Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.estiamted_price_for_trend_in_1KWH.toFixed(2)}{" "}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIDYWANA PRODUKCJA ENERGI Z PV </Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.estimated_kWh_prod.toFixed(2)} kWh
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>STOPIEŃ AUTOKONSUMPCJI </Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.autoconsumption} kWh -{" "}
            {(photovoltaicStore.autoconsumptionInPercent * 100).toFixed(2)}%
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIDYWANA ILOŚĆ SPRZEDANYCH kWh DO ZE</Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.energy_sold_to_distributor} kWh
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>WARTOŚĆ SPRZEDANEJ ENERGII (0,72 zł/kWh)</Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.accumulated_funds_on_account.toFixed(2)} zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>INDYWIDUALNY PROJEKT INSTALACJI</Text>
          <Text style={styles.boldFont}>TAK</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>WIELKOŚĆ MAGAZYNU ENERGII</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.energyStoreDotation
              ? photovoltaicStore.energyStorePower
              : "BRAK"}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text>ZYSK ROCZNY Z PV </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 600,
              marginRight: 20,
              paddingTop: 10,
            }}
          >
            {photovoltaicCalcStore.yearly_profit_for_installation.toFixed(2)} zł
          </Text>
        </View>
        <View style={styles.paymentReturnTime}>
          <Text>ZWROT NASTĄPI PO CZASIE:</Text>
          <Text>
            {photovoltaicCalcStore.payment_return_time.years ?? 0}{" "}
            {photovoltaicCalcStore.payment_return_time.years === 1
              ? "ROK "
              : "LAT "}
            I {photovoltaicCalcStore.payment_return_time.months ?? 0}{" "}
            {photovoltaicCalcStore.payment_return_time.months === 1
              ? "MIESIĄCA"
              : "MIESIĘCY"}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 8, marginTop: 10, marginLeft: 10 }}>
            /nr.zam/ model INW/Z{" "}
            {photovoltaicCalcStore.markup_costs.consultantFeeValue} /{" "}
            {photovoltaicCalcStore.markup_costs.officeFeeValue} /{" "}
            {photovoltaicCalcStore.markup_costs.officeFeeForBoss}
          </Text>
        </View>
      </View>
      <View style={styles.imageSection}>
        <Image
          style={styles.logoImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
        />
        <Image
          style={styles.signatureImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
        />
        <Text style={styles.pageNum}>03</Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.pricingSection}>
        <Text style={styles.title}>OFERTA</Text>
        <Text style={styles.subTitle}>DANE TECHNICZNE INSTALACJI</Text>

        <View style={styles.eachRow}>
          <Text>MOC SYSTEMU PV</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.voucher
              ? photovoltaicCalcStore.system_power + 0.8
              : photovoltaicCalcStore.system_power}{" "}
            kW
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>ILOŚĆ PANELI</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.modulesCount} szt.
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>MOC PANELA</Text>
          <Text style={styles.boldFont}>{photovoltaicStore.panelPower}</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>INWERTER HYBRYDOWY</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.isInwerterChoosed ? "1 szt." : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>ILOŚĆ OPTYMALIZATORÓW TIGO</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.tigoCount ?? 0} szt.
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>SYSTEM OGRZEWANIA ELEKTRYCZNEGO MAGAZNU</Text>
          <Text style={styles.boldFont}>2 kW</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>MENADŻER ENERGII - EMS</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.heatStoreDotation ? "1 szt." : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>ZABEZPIECZENIE ELEKTRYCZNE</Text>
          <Text style={styles.boldFont}>AC/DC</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>STELARZE</Text>
          <Text style={styles.boldFont}>ALUMINIOWE</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>MONTAŻ NA DACHU PŁASKIM - EKIERKI</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.isEccentricsChoosed ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>MONTAŻ NA GRUNCIE</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.isGroundMontage ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>MONTAŻ NA WIELU POWIERZCHNIACH</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.isSolarEdgeChoosed ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>MAGAZYN ENERGII</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.energyStoreDotation
              ? photovoltaicStore.energyStorePower + "W"
              : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>INWERTER HYBRYDOWY</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.isInwerterChoosed ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>MAGAZYN CIEPŁA</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.heatStoreDotation ? "TAK" : "NIE"}
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>WIELKOŚĆ ZBIORNIKA CWU</Text>
          <Text style={styles.boldFont}>
            {photovoltaicStore.heatStoreDotation
              ? photovoltaicStore.tankSize
              : "BRAK"}
          </Text>
        </View>
      </View>
      <View style={styles.imageSection}>
        <Image
          style={styles.logoImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
        />
        <Image
          style={styles.signatureImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
        />
        <Text style={styles.pageNum}>04</Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.pricingSection}>
        <Text style={styles.title}>OFERTA</Text>
        <Text style={styles.subTitle}>WYCENA INSTALACJI I DOTACJE</Text>
        <View style={styles.eachRow}>
          <Text>WARTOŚĆ NETTO</Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.totalInstallationCosts.total_installation_cost.toFixed(
              2
            )}{" "}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PODATEK VAT 8%</Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.totalInstallationCosts.fee_value.toFixed(2)}{" "}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>WARTOŚĆ BRUTTO</Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.totalInstallationCosts.total_gross_cost.toFixed(
              2
            )}{" "}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>CENA 1 RATY PRZED ODLICZENIEM DOTACJI</Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.loanForPurcharse.instalmentBeforeDotations.toFixed(
              2
            )}{" "}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>ULGA TERMOMODERNIZACYJNA</Text>
          <Text style={styles.boldFont}>
            {photovoltaicCalcStore.termoModernization.toFixed(2)} ZŁ
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#FEEB1A",
            borderBottomLeftRadius: "25%",
            borderTopRightRadius: "25%",
            marginTop: 3,
          }}
        >
          <View style={styles.eachRow}>
            <Text>DOTACJA `&#34;`MÓJ PRĄD 5.0`&#34;`</Text>
            <Text style={styles.boldFont}>
              {photovoltaicCalcStore.dotations_sum} ZŁ
            </Text>
          </View>
          <View style={{ fontSize: 12, paddingLeft: 12, paddingBottom: 12 }}>
            <Text>INSTALACJA FOTOWOLTAICZNA - {photovoltaics_dotation} ZŁ</Text>
            <Text>
              MAGAZYN CIEPŁA (BUFOR) -{" "}
              {photovoltaicStore.heatStoreDotation
                ? photovoltaicCalcStore.heatStoreCalcDotation
                : "0"}{" "}
              ZŁ
            </Text>
            <Text>
              SYSTEM ZARZĄDZANIA ENERGIĄ (EMS/HEMS) -{" "}
              {photovoltaicStore.emsDotation ? energyStore_dotation : "0"} ZŁ
            </Text>
            <Text>
              DOTACJA NA MAGAZYN ENERGII -{" "}
              {photovoltaicStore.energyStoreDotation
                ? photovoltaicCalcStore.energyStoreDotationValue
                : "0"}{" "}
              ZŁ
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 150,
            marginRight: -300,
            backgroundColor: "#FEEB1A",
            borderBottomLeftRadius: "50%",
            padding: 22,
          }}
        >
          <Text style={{ fontSize: 12 }}>
            OSTATECZNY KOSZT INSTALACJI PO DOFINANSOWANIU:
          </Text>
          <Text style={{ fontSize: 50, marginTop: 4 }}>
            {photovoltaicCalcStore.finall_installation_cost.toFixed(2)} zł
          </Text>
          <Text style={{ fontSize: 12, marginLeft: 10 }}>DOSTĘPNE:</Text>
          <Text style={{ fontSize: 12, marginLeft: 10 }}>
            {photovoltaicStore.installmentNumber} RAT W WYSOKOŚCI{" "}
            <Text style={styles.boldFont}>
              {photovoltaicCalcStore.loanForPurcharse.finallInstalmentPice.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.imageSection}>
        <Image
          style={styles.logoImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
        />
        <Image
          style={styles.signatureImage}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
        />
        <Text style={styles.pageNum}>05</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
