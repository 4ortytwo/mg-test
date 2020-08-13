import { useDispatch, useSelector } from "react-redux";
import { ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Table, Row } from "react-native-table-component";

import { RootState } from "../../redux/store";
import { NavProps } from "../../ParamList";

import { fetchRaces } from "./racesSlice";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#ffe0f0" },
  text: { textAlign: "center", fontWeight: "300" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#f5f1f3" },
});

type RacesProps = NavProps<"Races">;

const tableUtil = {
  HeadTable: [
    "Season",
    "Round",
    "Race Name",
    "Date",
    "Time",
    "Circuit",
    "Locality",
    "Country",
  ],
  widthArr: [50, 60, 140, 100, 90, 140, 100, 130],
};

const Races = ({ navigation }: RacesProps) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.races.loading);
  const races = useSelector((state: RootState) => state.races.races);

  useEffect(() => {
    if (!races.length) {
      dispatch(fetchRaces());
    }
  }, []);

  const flatRaces = races?.reduce((acc, current) => {
    return [
      ...acc,
      {
        race: current,
        row: [
          current.season,
          current.round,
          current.raceName,
          current.date,
          current.time,
          current.Circuit.circuitName,
          current.Circuit.Location.locality,
          current.Circuit.Location.country,
        ],
      },
    ];
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableUtil.HeadTable}
              widthArr={tableUtil.widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            {loading && <ActivityIndicator size="large" />}
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              {flatRaces.map((item, index) => (
                <Row
                  key={index}
                  data={item.row}
                  widthArr={tableUtil.widthArr}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: "#f8dee6" },
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Races;
