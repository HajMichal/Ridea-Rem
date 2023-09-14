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
import ESTIMATED_SELL_PRICE_TO_OSD from "../static";

import { type PhotovoltaicCalculations } from "~/store/photovoltaicCalculationSlice";
import { type PhotovoltaicsSlice } from "~/store/photovoltaicSlice";

interface photovoltaicStore {
  southRoof: boolean;
  voucher: boolean;
  isGroundMontage: boolean;
  isRoofWeightSystem: boolean;
  isSolarEdgeChoosed: boolean;
  energyManageSystem: boolean;
  isEccentricsChoosed: boolean;
  isInwerterChoosed: boolean;
  taxCredit: number;
  usageLimit: number;
  modulesCount: number;
  consultantMarkup: number;
  autoconsumptionInPercent: number;
  energyPriceInLimit: number;
  energyPriceOutOfLimit: number;
  recentYearTrendUsage: number;
  tigoCount: number;
  tankSize: string;
  panelPower: number;
}

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
    fontSize: 45,
    fontWeight: 600,
    fontFamily: "Orkney",
    // marginTop: 30,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 20,
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
    marginTop: 100,
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
});

interface DataToPDF {
  photovoltaicCalcStore: PhotovoltaicCalculations;
  photovoltaicStore: photovoltaicStore;
}

const MyDocument = ({
  photovoltaicCalcStore,
  photovoltaicStore,
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
          <Text>{photovoltaicStore.recentYearTrendUsage} kWh</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>TARCZA SOLIDARNOŚCIOWA</Text>
          <Text>{photovoltaicStore.usageLimit} kWh</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>KOSZTY ENERGII ELEKTRYCZNEJ </Text>
          <Text>{photovoltaicCalcStore.total_energy_trend_fee} zł</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>KOSZTY OPŁAT DYSTRYBUCJI</Text>
          <Text>{photovoltaicCalcStore.total_payment_energy_transfer} zł</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIDYWANA WYSOKOŚC RACHUNKU ZA 2023 </Text>
          <Text>
            {photovoltaicCalcStore.yearly_bill_without_photovolatics} zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>ŚREDNI KOSZT KAŻDEJ kWh </Text>
          <Text>
            {photovoltaicCalcStore.estiamted_price_for_trend_in_1KWH} zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIDYWANA PRODUKCJA ENERGI Z PV </Text>
          <Text>{photovoltaicCalcStore.estimated_kWh_prod} kWh</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>STOPIEŃ AUTOKONSUMPCJI </Text>
          <Text>
            {photovoltaicCalcStore.autoconsumption} kWh -{" "}
            {photovoltaicStore.autoconsumptionInPercent * 100}%
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>PRZEWIDYWANA ILOŚĆ SPRZEDANYCH kWh DO ZE</Text>
          <Text>{photovoltaicCalcStore.energy_sold_to_distributor} kWh</Text>
        </View>
        <View style={styles.eachRow}>
          <Text>WARTOŚĆ SPRZEDANEJ ENERGII (0,72 zł/kWh)</Text>
          <Text>{photovoltaicCalcStore.accumulated_funds_on_account} zł</Text>
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
            {photovoltaicCalcStore.accumulated_funds_on_account} zł
          </Text>
        </View>
        <View style={styles.paymentReturnTime}>
          <Text>ZWROT NASTĄPI PO CZASIE:</Text>
          <Text>
            {photovoltaicCalcStore.payment_return_time.years}{" "}
            {photovoltaicCalcStore.payment_return_time.years === 1
              ? "ROK "
              : "LAT "}
            I {photovoltaicCalcStore.payment_return_time.months}{" "}
            {photovoltaicCalcStore.payment_return_time.months === 1
              ? "MIESIĄCA"
              : "MIESIĘCY"}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 50, height: 50, marginTop: 50, marginLeft: 10 }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
        />
        <Image
          style={{
            transform: "rotate(90deg)",
            width: 250,
            height: "auto",
            marginLeft: -90,
            marginTop: -260,
          }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 600,
            marginBottom: 30,
            fontFamily: "Orkney",
            textAlign: "center",
          }}
        >
          03
        </Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
