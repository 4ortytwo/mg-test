import { useDispatch, useSelector } from "react-redux";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { Table, Row } from "react-native-table-component";

import { RootState } from "../../redux/store";
import { NavProps } from "../../ParamList";
import { Driver } from "../../@types/RaceAPI";
import usePagination from "../../hooks/usePagination";

import { fetchDrivers } from "./driversSlice";

const styles = StyleSheet.create({
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#ffe0f0",
  },
  TableText: {
    margin: 10,
    height: 40,
    width: "100%",
  },
});

type DriversProps = NavProps<"Drivers">;

const testTable = {
  HeadTable: ["Name", "Perm. Num", "Nationality", "DoB"],
};

const Drivers = ({ navigation }: DriversProps) => {
  const itemsPerPage = 15;
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.drivers.loading);
  const drivers = useSelector((state: RootState) => state.drivers.drivers);

  useEffect(() => {
    if (!drivers.length) {
      dispatch(fetchDrivers(itemsPerPage.toString()));
    }
  }, []);

  const formattedDrivers = useMemo(
    () =>
      drivers.reduce((acc, current) => {
        return [
          ...acc,
          {
            driver: current,
            row: [
              `${current.givenName} ${current.familyName}`,
              current.permanentNumber || "none",
              current.nationality,
              current.dateOfBirth,
            ],
          },
        ];
      }, []),
    [drivers]
  );

  const { paginatedData, next } = usePagination(formattedDrivers, itemsPerPage);

  const openDriver = (driver: Driver) => {
    navigation.navigate("SingleDriver", driver);
  };

  return (
    <View>
      <View>
        <Table>
          <Row
            data={testTable.HeadTable}
            style={styles.HeadStyle}
            textStyle={styles.TableText}
          />
          <View>
            {loading && <ActivityIndicator size="large" />}
            <FlatList
              data={paginatedData}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openDriver(item.driver)}>
                  <Row
                    data={item.row}
                    textStyle={styles.TableText}
                    borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => `${item.driver.driverId}-${index}`}
              onEndReached={next}
              onEndReachedThreshold={0}
            />
          </View>
        </Table>
      </View>
    </View>
  );
};

export default Drivers;
