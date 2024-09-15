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
import { TurbinesSlice } from "~/store/turbines/turbinesSlice";
import { TurbinesCalculationSlice } from "~/store/turbines/turbinesCalculationSlice";

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
    fontWeight: 600,
    marginTop: 7,
  },
  headerBackground: {
    width: "70%",
    height: 40,
    backgroundColor: "#a3c572",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  saveRow: {
    width: "100%",
    height: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 1,
  },
  saveTitle: { fontFamily: "Orkney", fontSize: 10 },
  savePrice: { fontFamily: "Orkney", fontWeight: 600, fontSize: 10 },
  estimatedProfit: {
    display: "flex",
    justifyContent: "center",
    height: 100,
    width: "35%",
  },
  estimatedProfitTitle: {
    fontFamily: "Orkney",
    fontSize: 8,
    textAlign: "center",
    width: "100%",
  },
  estimatedProfitTitleBold: {
    fontFamily: "Orkney",
    fontSize: 12,
    textAlign: "center",
    width: "100%",
    fontWeight: 600,
  },
  estimatedPrice: {
    fontSize: 14,
    fontFamily: "Orkney",
    fontWeight: 600,
    width: "100%",
    textAlign: "center",
    marginTop: 15,
  },
  brandUnderScore: {
    width: "70%",
    marginTop: -10,
    height: 10,
    backgroundColor: "#a3c572",
    alignSelf: "center",
    zIndex: -200,
  },
  pricingSection: {
    width: "90%",
    marginTop: 5,
    marginLeft: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    <Page size="A4" style={styles.page}></Page>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
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
          style={{ height: 50, marginTop: 10 }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/logoprzyjazna.png`}
        />

        <View style={styles.headerBackground}>
          <Text style={styles.header}>OSZCZĘDNOŚCI Z TWOJEJ INSTALACJI</Text>
        </View>

        <View style={{ width: "85%", marginTop: 30 }}></View>
      </View>
    </Page>
    <Page size="A4" style={styles.page}></Page>
  </Document>
);

export default TurbinesDocument;
