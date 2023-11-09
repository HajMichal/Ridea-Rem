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
import { type ForCompanySlice } from "~/store/forCompany/forCompanySlice";
import { type ForCompanyCalculation } from "~/store/forCompany/forCompanyCalculationSlice";

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
  eachPanelData: {
    fontFamily: "Orkney",
    fontWeight: 600,
    zIndex: -10,
    fontSize: 10,
    paddingLeft: 25,
    paddingRight: 25,
    width: 130,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 3,
    marginBottom: 5,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#FEEB1A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  panelImage: {
    width: 130,
    height: 130,
    marginTop: 50,
    marginBottom: -14,
  },
});

interface DataToPDF {
  forCompanyCalcStore: ForCompanyCalculation;
  forCompanyStore: ForCompanySlice["forCompanyStore"];
}

const ForCompanyDocument = ({
  forCompanyCalcStore,
  forCompanyStore,
}: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/forCompany/forCompanyFirst.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/forCompany/forCompanySecond.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/forCompany/forCompanyThird.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop: 30,
          marginRight: -40,
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/blackLogo.png`}
          style={{ marginBottom: 50, marginTop: 20, width: 50, height: 50 }}
        />
        <Text style={styles.title}>OFERTA</Text>
        <Text style={styles.subTitle}>O RÓŻNYCH MOCACH PANELI</Text>
        <View style={{ marginTop: -20 }}>
          <View
            style={{ display: "flex", flexDirection: "row", columnGap: 50 }}
          >
            <View style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/forCompany/panel.png`}
                style={styles.panelImage}
              />
              <Text
                style={{
                  fontWeight: 800,
                  fontFamily: "Orkney",
                  zIndex: -10,
                  fontSize: 13,
                  width: 130,
                  textAlign: "center",
                  paddingTop: 8,
                  paddingBottom: 6,
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 40,
                  backgroundColor: "#FEEB1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                400W
              </Text>
              <Text
                style={{
                  fontFamily: "Orkney",
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: 8,
                  marginBottom: 8,
                  width: 130,
                }}
              >
                SUNTECH
              </Text>
              <Text style={styles.eachPanelData}>
                {forCompanyCalcStore.calculateModuleCount.modulesCount400} SZTUK
              </Text>
              <Text style={styles.eachPanelData}>
                MOC {forCompanyCalcStore.allSystemPowers.systemPower400} W
              </Text>
              <Text style={styles.eachPanelData}>
                {forCompanyCalcStore.baseInstallationsPricing.systemPower400} zł
              </Text>
            </View>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/forCompany/panel.png`}
                style={styles.panelImage}
              />
              <Text
                style={{
                  fontWeight: 800,
                  fontFamily: "Orkney",
                  zIndex: -10,
                  fontSize: 13,
                  width: 130,
                  textAlign: "center",
                  paddingTop: 8,
                  paddingBottom: 6,
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 40,
                  backgroundColor: "#FEEB1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                455W
              </Text>
              <Text
                style={{
                  fontFamily: "Orkney",
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: 8,
                  marginBottom: 8,
                  width: 130,
                }}
              >
                SUNLINK
              </Text>
              <Text style={styles.eachPanelData}>
                {forCompanyCalcStore.calculateModuleCount.modulesCount455} SZTUK
              </Text>
              <Text style={styles.eachPanelData}>
                MOC {forCompanyCalcStore.allSystemPowers.systemPower455} W
              </Text>
              <Text style={styles.eachPanelData}>
                {forCompanyCalcStore.baseInstallationsPricing.systemPower455} zł
              </Text>
            </View>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/forCompany/panel.png`}
                style={styles.panelImage}
              />
              <Text
                style={{
                  fontWeight: 800,
                  fontFamily: "Orkney",
                  zIndex: -10,
                  fontSize: 13,
                  width: 130,
                  textAlign: "center",
                  paddingTop: 8,
                  paddingBottom: 6,
                  borderBottomLeftRadius: 40,
                  borderTopRightRadius: 40,
                  backgroundColor: "#FEEB1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                500W
              </Text>
              <Text
                style={{
                  fontFamily: "Orkney",
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: 8,
                  marginBottom: 8,
                  width: 130,
                }}
              >
                LONGI
              </Text>
              <Text style={styles.eachPanelData}>
                {forCompanyCalcStore.calculateModuleCount.modulesCount500} SZTUK
              </Text>
              <Text style={styles.eachPanelData}>
                MOC {forCompanyCalcStore.allSystemPowers.systemPower500} W
              </Text>
              <Text style={styles.eachPanelData}>
                {forCompanyCalcStore.baseInstallationsPricing.systemPower500} zł
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 40,
            paddingLeft: 50,
            paddingRight: 50,
            width: "100%",
          }}
        >
          <View style={styles.eachRow}>
            <Text>MONTAŻ NA GRUNCIE</Text>
            <Text style={styles.boldFont}>
              {forCompanyStore.isGroundMontage
                ? forCompanyStore.groundPanelCount +
                  "SZTUK - " +
                  forCompanyCalcStore.addonGruntPrice +
                  "zł"
                : "NIE"}
            </Text>
          </View>
          <View style={styles.eachRow}>
            <Text>MONTAŻ NA DACHU PŁASKIM - EKIERKI</Text>
            <Text style={styles.boldFont}>
              {forCompanyStore.isEccentricsChoosed
                ? forCompanyStore.eccentricsCount +
                  "SZTUK - " +
                  forCompanyCalcStore.addonEkierkiPrice +
                  "zł"
                : "NIE"}
            </Text>
          </View>
          <View style={styles.eachRow}>
            <Text>OPTYMALIZATORY TIGO</Text>
            <Text style={styles.boldFont}>
              {forCompanyStore.isTigoChoosed
                ? forCompanyStore.tigoCount +
                  "SZTUK - " +
                  forCompanyCalcStore.addonTigoPrice +
                  "zł"
                : "NIE"}
            </Text>
          </View>
          <View style={styles.eachRow}>
            <Text>SYSTEM OBCIĄŻENIOWO BALASTOWY</Text>
            <Text style={styles.boldFont}>
              {forCompanyStore.isRoofWeightSystem
                ? forCompanyStore.roofWeightSystemCount +
                  " SZTUK - " +
                  forCompanyCalcStore.addonBloczkiPrice +
                  " zł"
                : "NIE"}
            </Text>
          </View>
          <View style={styles.eachRow}>
            <Text>STOPIEŃ AUTOKONSUMPCJI ENERGII</Text>
            <Text style={styles.boldFont}>
              {forCompanyStore.autoconsumptionInPercent * 100 + "%"}
            </Text>
          </View>
          <Text style={{ zIndex: 50, fontSize: 8, marginTop: 50 }}>
            /nr.zam/ model INW/Z{" "}
            {forCompanyCalcStore.officeMarkup.consultantFeeValue} /{" "}
            {forCompanyCalcStore.officeMarkup.officeFeeValue} /{" "}
            {forCompanyCalcStore.officeMarkup.officeFeeForBoss}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{
            transform: "rotate(90deg)",
            width: 180,
            height: "auto",
            marginLeft: -80,
            marginTop: 70,
          }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/signatureIdeaRem.png`}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 600,
            marginBottom: 30,
            marginLeft: -100,
            fontFamily: "Orkney",
            textAlign: "center",
          }}
        >
          03
        </Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.pricingSection}>
        <Text style={styles.title}>OFERTA</Text>
        <Text style={styles.subTitle}>CENA INSTALACJI FOTOWOLTAICZNEJ</Text>
        <View style={styles.eachRow}>
          <Text>WYBRANA MOC MODUŁU</Text>
          <Text style={styles.boldFont}>
            SOLAR - {forCompanyStore.panelPower} W
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>ILOŚĆ PANELI</Text>
          <Text style={styles.boldFont}>
            {forCompanyCalcStore.modulesCount}
            SZTUK
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>WARTOŚĆ SYSTEMU NETTO</Text>
          <Text style={styles.boldFont}>
            {forCompanyCalcStore.totalInstallationCosts.netPrice}
            zł
          </Text>
        </View>
        <View style={styles.eachRow}>
          <Text>VAT {forCompanyStore.vatValue * 100}%</Text>
          <Text style={styles.boldFont}>
            {forCompanyCalcStore.totalInstallationCosts.feeValue}
            zł
          </Text>
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
            OSTATECZNY KOSZT INSTALACJI BRUTTO:
          </Text>
          <Text style={{ fontSize: 50, marginTop: 4 }}>
            {forCompanyCalcStore.totalInstallationCosts.grossPrice} zł
          </Text>
          <Text style={{ fontSize: 12, marginLeft: 10 }}>DOSTĘPNE:</Text>
          <Text style={{ fontSize: 12, marginLeft: 10 }}>
            {forCompanyStore.installmentNumber} RAT W WYSOKOŚCI{" "}
            <Text style={styles.boldFont}>
              {forCompanyCalcStore.loanForPurcharse.finallInstalmentPice} zł
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
        <Text style={styles.pageNum}>04</Text>
      </View>
    </Page>
  </Document>
);

export default ForCompanyDocument;
