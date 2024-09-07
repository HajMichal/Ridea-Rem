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

interface DataToPDF {
  photovoltaicCalcStore: PhotovoltaicCalculations;
  photovoltaicStore: PhotovoltaicsSlice["photovoltaicStore"];
}

const PhotovoltaicDocument = ({
  photovoltaicCalcStore,
  photovoltaicStore,
}: DataToPDF) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/photovoltaic/firstPage.png`}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <Image
        style={styles.image}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/photovoltaic/secondPage.png`}
      />
    </Page>
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
          {photovoltaicCalcStore.markup_costs.consultantFeeValue} /{" "}
          {photovoltaicCalcStore.markup_costs.officeFeeValue} /{" "}
          {photovoltaicCalcStore.markup_costs.officeFeeForBoss}
        </Text>
        <Image
          style={{ height: 50, marginTop: 10 }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/logoprzyjazna.png`}
        />

        <View style={styles.headerBackground}>
          <Text style={styles.header}>OSZCZĘDNOŚCI Z TWOJEJ INSTALACJI</Text>
        </View>

        <View style={{ width: "85%", marginTop: 30 }}>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>
              PRZEWIDYWANA PRODUKCJA ENERGII Z PV
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.estimated_kWh_prod.toFixed(2)} KWH
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>STOPIEŃ AUTOKONSUMPCJI</Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.autoconsumption} KWH -{" "}
              {(photovoltaicStore.autoconsumptionInPercent * 100).toFixed(2)}%
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>ZYSK Z KONSUMPCJI WŁASNEJ</Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.save_on_autoconsumption} ZŁ
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>
              PRZEWIDYWANA ILOŚĆ SPRZEDANYCH KWH DO ZE
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.energy_sold_to_distributor} KWH
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.saveTitle}>WARTOŚĆ SPRZEDANEJ ENERGII</Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.accumulated_funds_on_account.toFixed(2)} ZŁ
            </Text>
          </View>
        </View>

        <View style={styles.pricingSection}>
          <View style={styles.estimatedProfit}>
            <Text style={styles.estimatedProfitTitleBold}>
              ŚREDNIO MIESIĘCZNY ZYSK
            </Text>
            <Text style={styles.estimatedProfitTitle}>
              Z INSTALACJI FOTOWOLTAICZNEJ
            </Text>
            <Text
              style={{ ...styles.estimatedPrice, fontSize: 20, marginTop: 8 }}
            >
              {(
                photovoltaicCalcStore.yearly_profit_for_installation / 12
              ).toFixed(2)}
              ZŁ
            </Text>
            <View style={styles.brandUnderScore} />
          </View>
          <View style={styles.estimatedProfit}>
            <Text style={styles.estimatedProfitTitleBold}>
              ŚREDNIO ROCZNY ZYSK
            </Text>
            <Text style={styles.estimatedProfitTitle}>
              Z INSTALACJI FOTOWOLTAICZNEJ
            </Text>
            <Text style={styles.estimatedPrice}>
              {" "}
              {photovoltaicCalcStore.yearly_profit_for_installation.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </View>
          <View style={styles.estimatedProfit}>
            <Text style={styles.estimatedProfitTitleBold}>
              ŚREDNIO 10 LETNI ZYSK
            </Text>
            <Text style={styles.estimatedProfitTitle}>
              Z INSTALACJI FOTOWOLTAICZNEJ
            </Text>
            <Text
              style={{ ...styles.estimatedPrice, fontSize: 20, marginTop: 8 }}
            >
              {(
                photovoltaicCalcStore.yearly_profit_for_installation * 10
              ).toFixed(2)}{" "}
              ZŁ
            </Text>
            <View style={styles.brandUnderScore} />
          </View>
        </View>

        <View style={styles.headerBackground}>
          <Text style={styles.header}>FINANSE</Text>
        </View>

        <View style={styles.pricingSection}>
          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              KWOTA NETTO
            </Text>
            <Text style={{ ...styles.estimatedPrice, fontSize: 14 }}>
              {photovoltaicCalcStore.totalInstallationCosts.total_installation_cost.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </View>
          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              PODATEK VAT {(photovoltaicStore.vat23 ? tax23 : tax8) * 100}%
            </Text>
            <Text style={{ ...styles.estimatedPrice, fontSize: 14 }}>
              {photovoltaicCalcStore.totalInstallationCosts.fee_value.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </View>
          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              KWOTA BRUTTO
            </Text>
            <Text style={{ ...styles.estimatedPrice, fontSize: 14 }}>
              {photovoltaicCalcStore.totalInstallationCosts.total_gross_cost.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </View>
        </View>

        <View style={styles.headerBackground}>
          <Text style={styles.header}>DOTACJE I ULGI</Text>
        </View>

        <View style={{ width: "85%", marginTop: 20 }}>
          <View style={styles.saveRow}>
            <Text style={{ ...styles.saveTitle, fontWeight: 600 }}>
              ULGA TERMOMODERNIZACYJNA
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.termoModernization.toFixed(2)} ZŁ
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={{ ...styles.saveTitle, fontWeight: 600 }}>
              DOTACJE Z PROGRAMU &#34;
              {photovoltaicStore.isDotation_mojprad
                ? "MÓJ PRĄD"
                : "CZYSTE POWIETRZE"}
              &#34;
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isPromotion
                ? (
                    photovoltaicCalcStore.dotations_sum +
                    photovoltaicStore.promotionAmount
                  ).toFixed(2)
                : photovoltaicCalcStore.dotations_sum.toFixed(2)}{" "}
              ZŁ
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={{ ...styles.saveTitle, fontWeight: 600 }}>
              DODATKOWA PROMOCJA
            </Text>
            <Text style={styles.savePrice}>
              {" "}
              {photovoltaicStore.isPromotion
                ? photovoltaicStore.promotionAmount
                : "0"}{" "}
              ZŁ
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={{ ...styles.saveTitle, fontWeight: 600 }}>
              2 RATY GRATIS / VOUCHER HOLIDAY
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.twoInstallmentsFree ? "TAK" : "NIE"} /{" "}
              {photovoltaicStore.holidayVoucher ? "TAK" : "NIE"}
            </Text>
          </View>
        </View>

        <View style={styles.headerBackground}>
          <Text style={styles.header}>PODSUMOWANIE</Text>
        </View>

        <View
          style={{ ...styles.pricingSection, marginTop: -20, paddingTop: 5 }}
        >
          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              RATA PRZED DOTACJĄ
            </Text>
            <Text style={{ ...styles.estimatedPrice, fontSize: 14 }}>
              {photovoltaicCalcStore.loanForPurcharse.instalmentBeforeDotations.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
          </View>

          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              RATA PO DOTACJI
            </Text>
            <Text
              style={{ ...styles.estimatedPrice, fontSize: 20, marginTop: 8 }}
            >
              {photovoltaicCalcStore.loanForPurcharse.finallInstalmentPice.toFixed(
                2
              )}{" "}
              ZŁ
            </Text>
            <View style={styles.brandUnderScore} />
          </View>

          <View style={styles.estimatedProfit}>
            <Text style={{ ...styles.estimatedProfitTitle, fontSize: 12 }}>
              KWOTA PO DOTACJI
            </Text>
            <Text
              style={{ ...styles.estimatedPrice, fontSize: 20, marginTop: 8 }}
            >
              {(
                photovoltaicCalcStore.finall_installation_cost -
                photovoltaicCalcStore.termoModernization
              ).toFixed(2)}{" "}
              ZŁ
            </Text>
            <View style={styles.brandUnderScore} />
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
        ></Image>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 50, marginTop: 30, marginBottom: 10 }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/logoprzyjazna.png`}
        />
        <View style={styles.headerBackground}>
          <Text style={styles.header}>DANE TECHNICZNE TWOJEJ INSTALACJI</Text>
        </View>

        <Image
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: -500,
          }}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/static/pdf/background.png`}
        ></Image>
        <View style={{ width: "85%", marginTop: 30 }}>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MOC SYSTEMU PV</Text>
            <Text style={styles.savePrice}>
              {photovoltaicCalcStore.system_power} KW
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>ILOŚĆ MODUŁÓW</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.modulesCount} SZT
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MOC MODUŁU</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.panelPower === smallestPanel &&
                "DASSOLAR 410W"}
              {photovoltaicStore.panelPower === mediumPanel &&
                "NORD DASSOLAR 450W"}
              {photovoltaicStore.panelPower === largestPanel && "580W"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>ILOŚC OPTYMALIZATORÓW TIGO</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.tigoCount} SZT
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MENADŻER ENERGII - EMS</Text>
            <Text style={styles.savePrice}>
              {" "}
              {photovoltaicStore.emsDotation ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>ZABEZPIECZENIE ELEKTRYCZNE</Text>
            <Text style={styles.savePrice}>AC/DC</Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>STELAŻE ALUMINIOWE</Text>
            <Text style={styles.savePrice}>ALUMINIOWE</Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>
              MONTAŻ NA DACHU PŁASKIM - EKIERKI
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.eccentrics !== "None"
                ? photovoltaicStore.eccentrics === "standardEccentrics"
                  ? "STANDARDOWE"
                  : "CERTYFIKOWANE"
                : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MONTAŻ NA GRUNCIE</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isGroundMontage ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>
              SYSTEM DACHOWY - OBIĄŻENIOWY LUB BALASTOWY
            </Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isRoofWeightSystem ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>WYBRANY MAGAZYN ENERGII</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isEnergyStoreDotation
                ? photovoltaicStore.energyStore?.name
                : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>INWERTER HYBRYDOWY</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isInwerterChoosed ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MATEBOX</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isMatebox ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>MAGAZYN CIEPŁA</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.heatStoreDotation ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>POJEMNOŚĆ ZBIORNIKA CWU</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.heatStoreDotation
                ? photovoltaicStore.cwuTank.name
                : "BRAK"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>PRZEKOP W ZAKRESIE KLIENTA</Text>
            <Text style={styles.savePrice}>
              {photovoltaicStore.isDitch ? "TAK" : "NIE"}
            </Text>
          </View>
          <View style={styles.saveRow}>
            <Text style={styles.savePrice}>DŁUGOŚĆ OKABLOWANIA NAD STAN</Text>
            <Text style={styles.savePrice}>{photovoltaicStore.cableAC} M</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PhotovoltaicDocument;
