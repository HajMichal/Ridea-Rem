import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { type HeatHomeCalculations } from "~/store/homeHeat/heatHomeCalculationSlice";
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
    height: 45,
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
    fontSize: 25,
    fontWeight: 600,
    fontFamily: "Orkney",
    textAlign: "center",
    width: "100%",
  },
  mainPage: {
    display: "flex",
    marginTop: 38.7,
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
    width: 230,
  },
  addonRowTittle: {
    fontSize: 10,
    fontFamily: "Orkney",
    marginLeft: 20,
    width: 210,
    marginTop: -20,
  },
  rowData: {
    fontSize: 14,
    fontFamily: "Orkney",
    marginRight: 10,
    textAlign: "right",
  },
  rowCost: {
    fontSize: 14,
    fontFamily: "Orkney",
    fontWeight: 600,
    textAlign: "right",
    width: 80,
  },
  image: {
    width: "auto",
    height: "auto",
  },
});

interface DataToPDF {
  heatHomeCalcStore: HeatHomeCalculations;
  heatHomeStore: HeatHomeType;
}

const HeatHomeDocument = ({ heatHomeCalcStore, heatHomeStore }: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/heatHome/termo33.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.mainPage}>
        <Image
          style={styles.logo}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/heatHome/logo.png`}
        />
        <Text style={styles.title}>WYCENA</Text>
        <View style={{ marginTop: 20, marginBottom: 24 }}>
          <View style={styles.yellowRow}>
            <Text
              style={{
                width: "100%",
                fontSize: "10px",
                textAlign: "center",
                marginTop: -2,
              }}
            >
              GRUBOŚĆ OCIEPLENIA DOBRANA NA PODSTAWIE AUDYTU ENERGETYCZNEGO
            </Text>
          </View>
          <View style={styles.defaultRow}>
            <Text style={styles.rowTitle}>OCIEPLENIE DOMU</Text>
            <Text style={styles.rowData}>{heatHomeStore.areaToHeat} m2</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.heatedAreaCost +
                heatHomeCalcStore.heatingThicknessCost}{" "}
              zł
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
            <Text style={styles.addonRowTittle}>(ATTICA/OGNIOMUR)</Text>
          </View>
          <View style={{ marginTop: -20 }}>
            <View style={styles.defaultRow}>
              <Text style={styles.rowTitle}>KOSZTY DODATKOWE</Text>
              <Text style={styles.rowCost}>
                {heatHomeStore.additionalAmount} zł
              </Text>
            </View>
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
        <View style={{ marginTop: 24 }}>
          <View style={styles.defaultRow}>
            <Text style={styles.rowTitle}>DOTACJA</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.dotationValue} zł
            </Text>
          </View>
          <View style={styles.yellowRow}>
            <Text style={styles.rowTitle}>TERMOMODERNIZACJA</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.termoModernization} zł
            </Text>
          </View>
          <View style={styles.defaultRow}>
            <Text style={styles.rowTitle}>
              KWOTA RATY PRZY {heatHomeStore.installmentNumber} RATACH
            </Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.installmentPrice.finallInstalmentPice} zł
            </Text>
          </View>
          <View style={styles.yellowRow}>
            <Text style={styles.rowTitle}>KWOTA OSTATECZNA</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.finallPrice} zł
            </Text>
          </View>
          <View style={styles.defaultRow}>
            <Text style={styles.rowTitle}>AUDYT ENERGETYCZNY</Text>
            <Text style={styles.rowCost}>
              {heatHomeCalcStore.energeticAuditCost} zł
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
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/heatHome/termo3.png`}
      />
    </Page>
  </Document>
);

export default HeatHomeDocument;
