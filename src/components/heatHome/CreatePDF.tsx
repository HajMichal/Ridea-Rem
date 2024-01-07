import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { HeatHomeCalculations } from "~/store/homeHeat/heatHomeCalculationSlice";
import { type HeatHomeType } from "~/store/homeHeat/heatHomeSlice";

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
    backgroundColor: "#fafafa",
    fontFamily: "Orkney",
  },
  logo: {
    width: 60,
    alignSelf: "center",
    marginBottom: 50,
  },
  panelBottom: {
    height: 180,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    zIndex: -1,
  },
  title: {
    fontSize: 40,
    fontWeight: 600,
    fontFamily: "Orkney",
    textAlign: "center",
    width: "100%",
  },
  mainPage: {
    display: "flex",
    marginTop: 50,
  },
  yellowRow: {
    width: 470,
    height: 30,
    backgroundColor: "#FEEB1A",
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 6,
    flexDirection: "row",
  },
  defaultRow: {
    width: 470,
    height: 30,
    borderRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 6,
    flexDirection: "row",
  },
  pageNum: {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 30,
    fontFamily: "Orkney",
    textAlign: "center",
  },
  rowTitle: {
    fontSize: 14,
    fontFamily: "Orkney",
    fontWeight: 600,
    width: 210,
  },
  rowData: {
    fontSize: 14,
    fontFamily: "Orkney",
    marginRight: 10,
  },
  rowCost: {
    fontSize: 14,
    fontFamily: "Orkney",
    fontWeight: 600,
  },
});

interface DataToPDF {
  heatHomeCalcStore: HeatHomeCalculations;
  heatHomeStore: HeatHomeType;
}

const HeatHomeDocument = ({ heatHomeCalcStore, heatHomeStore }: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}></Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.mainPage}>
        <Image
          style={styles.logo}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
        />
        <Text style={styles.title}>WYCENA</Text>
        <View style={{ marginTop: 20, marginBottom: 56 }}>
          <View style={styles.yellowRow}>
            <Text style={styles.rowTitle}>OCIEPLENIE DOMU</Text>
            <Text style={styles.rowData}>{heatHomeStore.areaToHeat} m2</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.heatedAreaCost} zł
            </Text>
          </View>
          <View style={styles.defaultRow}>
            <Text style={styles.rowTitle}>GRUBOŚĆ OCIEPLENIA</Text>
            <Text style={styles.rowData}>{heatHomeStore.heatThickness} cm</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.heatingThicknessCost} zł
            </Text>
          </View>
          <View style={styles.yellowRow}>
            <Text style={styles.rowTitle}>PARAPETY</Text>
            <Text style={styles.rowData}>
              {heatHomeStore.windowSillCount} mb
            </Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.windowSillCost} zł
            </Text>
          </View>
          <View style={styles.defaultRow}>
            <Text style={styles.rowTitle}>ELEWACJA - TYNK</Text>
            <Text style={styles.rowData}>{heatHomeStore.plasterArea} m2</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.plasterAreaCost} zł
            </Text>
          </View>
          <View style={styles.yellowRow}>
            <Text style={styles.rowTitle}>WYKOŃCZENIE GÓRNE</Text>
            <Text style={styles.rowData}>{heatHomeStore.topFinish} mb</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.topFinishCost} zł
            </Text>
          </View>
          <View style={styles.defaultRow}>
            <Text style={styles.rowTitle}>KOSZTY DODATKOWE</Text>
            <Text style={styles.rowCost}>
              {heatHomeStore.additionalAmount} zł
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.yellowRow}>
            <Text style={styles.rowTitle}>WARTOŚĆ NETTO</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.totalCost.nett} zł
            </Text>
          </View>
          <View style={styles.defaultRow}>
            <Text style={styles.rowTitle}>PODATEK VAT 8%</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.totalCost.vat} zł
            </Text>
          </View>
          <View style={styles.yellowRow}>
            <Text style={styles.rowTitle}>WARTOŚĆ BRUTTO</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.totalCost.gross} zł
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={styles.defaultRow}>
            <Text style={styles.rowTitle}>DOTACJA</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.dotationValue} zł
            </Text>
          </View>
          <View style={styles.yellowRow}>
            <Text style={styles.rowTitle}>KWOTA OSTATECZNA</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.finallCost} zł
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 6,
            marginTop: -45,
            marginLeft: 525,
            position: "absolute",
            zIndex: 1000,
          }}
        >
          /nr.zam/ model INW/Z{" "}
          {heatHomeCalcStore.markupCosts.consultantFeeValue} /{" "}
          {heatHomeCalcStore.markupCosts.officeFeeValue} /{" "}
          {heatHomeCalcStore.markupCosts.officeFeeForBoss}
        </Text>
        <Image
          style={styles.panelBottom}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/heatHome/bottomPanel.png`}
        />
      </View>
    </Page>
    <Page size="A4" style={styles.page}></Page>
  </Document>
);

export default HeatHomeDocument;
