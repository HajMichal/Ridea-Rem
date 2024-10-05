/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
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
import {
  largestPanel,
  mediumPanel,
  smallestPanel,
} from "~/constans/panelPowers";
import { tax23, tax8 } from "~/constans/taxPercentage";
import { type TurbinesSlice } from "~/store/turbines/turbinesSlice";
import { type TurbinesCalculationSlice } from "~/store/turbines/turbinesCalculationSlice";

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
  image: {
    width: "auto",
    height: "auto",
  },
  header: {
    fontFamily: "Orkney",
    color: "#3F3F3F",
    fontWeight: 600,
    marginTop: 7,
    fontSize: 14,
  },
  headerBackground: {
    width: "80%",
    height: 24,
    backgroundColor: "#a3c572",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  saveRow: {
    width: "100%",
    height: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 1,
  },
  saveTitle: { fontFamily: "Orkney", fontSize: 8 },
  savePrice: { fontFamily: "Orkney", fontWeight: 600, fontSize: 8 },
  brandUnderScore: {
    width: "70%",
    marginTop: -6,
    height: 6,
    backgroundColor: "#a3c572",
    alignSelf: "center",
    zIndex: -200,
  },
  subHeaderRow: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  subHeader: {
    fontFamily: "Orkney",
    color: "#3F3F3F",
    fontWeight: 600,
    fontSize: 10,
  },
  costsSummarySection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  costsSummaryText: {
    width: "40%",
    fontFamily: "Orkney",
    fontSize: 12,
  },
  costsSummaryPrice: {
    width: "30%",
    fontFamily: "Orkney",
    fontSize: 12,
    textAlign: "center",
  },
  columnPriceSection: {
    width: "70%",
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  centerContent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  pageAlign: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
});

interface TurbinesDocumentType {
  turbinesStore: TurbinesSlice["turbinesStore"];
  turbinesCalcStore: TurbinesCalculationSlice["turbinesCalcStore"];
}
const TurbinesDocument = ({
  turbinesStore,
  turbinesCalcStore,
}: TurbinesDocumentType) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/turbines/turbiny1.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/turbines/turbiny2.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageAlign}>
        <Text
          style={{
            right: 0,
            position: "absolute",
            fontSize: 6,
            marginRight: 5,
            marginTop: 5,
          }}
        >
          /nr.zam/ model INW/Z{" "}
          {turbinesCalcStore.officeMarkup.consultantFeeValue} /{" "}
          {turbinesCalcStore.officeMarkup.officeFeeValue} /{" "}
          {turbinesCalcStore.officeMarkup.officeFeeForBoss}
        </Text>
        <Image
          style={{ height: 40, marginTop: 40 }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/logoprzyjazna.png`}
        />

        <View style={styles.headerBackground}>
          <Text style={styles.header}>DANE TECHNICZNE</Text>
        </View>

        <View style={{ width: "70%", marginTop: 10 }}>
          {/* - - - - - - - - WIND TURBINES SECTION - - - - - - - -  */}
          <View style={styles.subHeaderRow}>
            <Text style={styles.subHeader}>TURBINY WIATROWE</Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>ILOŚĆ FAZ U KLIENTA</Text>
            <Text style={styles.savePrice}>
              {turbinesStore.threePhases ? 3 : 1}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>DOSPEL DRAGON 500+</Text>
            <Text style={styles.savePrice}>
              {turbinesStore.turbine500Count} szt.
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>DOSPEL DRAGON 1000+</Text>
            <Text style={styles.savePrice}>
              {turbinesStore.turbine1000Count} szt.
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>DOSPEL DRAGON 1500+</Text>
            <Text style={styles.savePrice}>
              {turbinesStore.turbine1500Count} szt.
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>DOSPEL DRAGON 3000+</Text>
            <Text style={styles.savePrice}>
              {turbinesStore.turbine3000Count} szt.
            </Text>
          </View>

          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>
              DOPŁATA DO INWERTERA 3 FAZOWEGO
            </Text>
            <Text style={styles.savePrice}>
              {turbinesStore.isThreePhasesInverter ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>
              DOPŁATA DO INWERTERA HYBRYDOWEGO
            </Text>
            <Text style={styles.savePrice}>
              {turbinesStore.isHybridInverter ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>ŁĄCZNA MOC TURBIN WIATROWYCH</Text>
            <Text style={styles.savePrice}>
              {turbinesStore.turbinesDetails.totalPower * 1000} W
            </Text>
          </View>

          {/* - - - - - - - - ENERGY STORE SECTION - - - - - - - -  */}
          <View style={styles.subHeaderRow}>
            <Text style={styles.subHeader}>MAGAZYN ENERGII</Text>
          </View>

          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>WYBRANY MAGAZYN ENERGII</Text>
            <Text style={styles.savePrice}>
              {turbinesStore.energyStore.name}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>T30 CONTROLER BATERY SOLAX</Text>
            <Text style={styles.savePrice}>
              {/* {turbinesStore.isBatteryController ? "TAK" : "NIE"} */}
              {turbinesStore.energyStore.price !== 0 ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>LICZNIK DO MAGAZYNU ENERGII</Text>
            <Text style={styles.savePrice}>
              {/* {turbinesStore.isEnergyMenagerCounter ? "TAK" : "NIE"} */}
              {turbinesStore.energyStore.price !== 0 ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>MATE BOX</Text>
            <Text style={styles.savePrice}>
              {turbinesStore.isMatebox ? "TAK" : "NIE"}
            </Text>
          </View>
          {/* <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>TRIPLE T30 BATERY SOLAX</Text>
            <Text style={styles.savePrice}>
              {turbinesStore.batteryCapacity} kWh
            </Text>
          </View> */}
        </View>

        <View style={styles.headerBackground}>
          <Text style={styles.header}>PODSUMOWANIE FINANSOWE</Text>
        </View>

        <View style={{ width: "70%", marginTop: 10 }}>
          <View style={styles.costsSummarySection}>
            <Text style={styles.costsSummaryText} />
            <Text style={{ ...styles.costsSummaryPrice, fontWeight: 600 }}>
              NETTO
            </Text>
            <Text style={{ ...styles.costsSummaryPrice, fontWeight: 600 }}>
              BRUTTO
            </Text>
          </View>
          <View style={styles.costsSummarySection}>
            <Text style={styles.costsSummaryText}>TURBINY WIATROWE</Text>
            <Text style={styles.costsSummaryPrice}>
              {turbinesCalcStore.turbinesTotalCosts.netCost} ZŁ
            </Text>
            <Text style={styles.costsSummaryPrice}>
              {turbinesCalcStore.turbinesTotalCosts.grossCost} ZŁ
            </Text>
          </View>

          <View style={styles.costsSummarySection}>
            <Text style={styles.costsSummaryText}>MAGAZYN ENERGII</Text>
            <Text style={styles.costsSummaryPrice}>
              {turbinesCalcStore.energyStoreTotalCosts.netCost} ZŁ
            </Text>
            <Text style={styles.costsSummaryPrice}>
              {turbinesCalcStore.energyStoreTotalCosts.grossCost} ZŁ
            </Text>
          </View>

          <View style={styles.costsSummarySection}>
            <Text style={{ ...styles.costsSummaryText, fontWeight: 600 }}>
              SUMA
            </Text>
            <View style={{ width: "30%" }}>
              <Text style={{ ...styles.costsSummaryPrice, width: "100%" }}>
                {turbinesCalcStore.turbinesTotalCosts.netCost +
                  turbinesCalcStore.energyStoreTotalCosts.netCost}{" "}
                ZŁ
              </Text>
              <View style={styles.brandUnderScore} />
            </View>
            <View style={{ width: "30%" }}>
              <Text style={{ ...styles.costsSummaryPrice, width: "100%" }}>
                {turbinesCalcStore.turbinesTotalCosts.grossCost +
                  turbinesCalcStore.energyStoreTotalCosts.grossCost}{" "}
                ZŁ
              </Text>
              <View style={styles.brandUnderScore} />
            </View>
          </View>
        </View>
        <View style={styles.columnPriceSection}>
          <Text
            style={{
              ...styles.costsSummaryPrice,
              fontWeight: 600,
              marginBottom: 5,
            }}
          >
            RATA PRZED DOTACJĄ
          </Text>
          <View style={{ width: "30%" }}>
            <Text style={{ ...styles.costsSummaryPrice, width: "100%" }}>
              {turbinesCalcStore.loanForPurcharse.instalmentBeforeDotations} ZŁ
            </Text>
            <View style={styles.brandUnderScore} />
          </View>
        </View>
      </View>
      <Image
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -500,
        }}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/background.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageAlign}>
        <Image
          style={{ height: 40, marginTop: 40 }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/logoprzyjazna.png`}
        />
        <View style={{ width: "55%", marginTop: 30, textAlign: "center" }}>
          <Text style={styles.header}>
            INSTALACJA ZOSTANIE OBJĘTA PROGRAMEM "MOJA ELEKTROWNIA WIATROWA"
          </Text>
        </View>

        <View style={{ width: "70%", marginTop: 10 }}>
          <Text style={{ fontSize: 8 }}>
            Dofinansowanie w formie dotacji do 50% kosztów kwalifikowanych, nie
            więcej niż 30 tys. zł na jedną współfinansowaną mikroinstalację
            wiatrową o zainstalowanej mocy elektrycznej nie mniejszej niż 1 kW
            oraz nie większej niż 20 kW, lecz nie więcej niż 5 tys. zł/1 kW.
          </Text>
          <Text style={{ fontSize: 8 }}>
            Dofinansowanie w formie dotacji do 50% kosztów kwalifikowanych, nie
            więcej niż 17 tys. zł na jeden magazyn energii elektrycznej –
            akumulator o pojemności minimalnej 2 kWh, lecz nie więcej niż 6 tys.
            zł/1 kWh.
          </Text>
          <View
            style={{
              ...styles.centerContent,
              marginTop: 30,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 12 }}>PRZYBLIŻONA KWOTA DOTACJI: </Text>
            <Text style={{ fontSize: 12 }}>
              {turbinesStore.estimatedDotationSum} ZŁ
            </Text>
          </View>
        </View>

        <View style={styles.headerBackground}>
          <Text style={styles.header}>KWOTY PO ODLICZENIU DOTACJI</Text>
        </View>

        <View style={styles.centerContent}>
          <View
            style={{
              ...styles.columnPriceSection,
              alignItems: "center",
              width: "50%",
            }}
          >
            <Text
              style={{
                ...styles.costsSummaryPrice,
                fontWeight: 600,
                marginBottom: 5,
              }}
            >
              KWOTA PO DOTACJI
            </Text>
            <View style={{ width: "30%" }}>
              <Text style={{ ...styles.costsSummaryPrice, width: "100%" }}>
                {turbinesCalcStore.turbinesTotalCosts.grossCost +
                  turbinesCalcStore.energyStoreTotalCosts.grossCost -
                  turbinesStore.estimatedDotationSum}{" "}
                ZŁ
              </Text>
              <View style={styles.brandUnderScore} />
            </View>
          </View>

          <View
            style={{
              ...styles.columnPriceSection,
              alignItems: "center",
              width: "50%",
            }}
          >
            <Text
              style={{
                ...styles.costsSummaryPrice,
                fontWeight: 600,
                marginBottom: 5,
              }}
            >
              RATA PO DOTACJI
            </Text>
            <View style={{ width: "30%" }}>
              <Text style={{ ...styles.costsSummaryPrice, width: "100%" }}>
                {turbinesCalcStore.loanForPurcharse.finallInstalmentPice} ZŁ
              </Text>
              <View style={styles.brandUnderScore} />
            </View>
          </View>
        </View>
      </View>
      <Image
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -500,
        }}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/background.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/turbines/turbiny3.png`}
      />
    </Page>
  </Document>
);

export default TurbinesDocument;
