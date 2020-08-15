import { useDispatch, useSelector } from "react-redux";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { TableWrapper, Table, Row } from "react-native-table-component";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootState } from "../../redux/store";
import { NavProps } from "../../ParamList";
import { Driver } from "../../@types/ErgastAPI";
import usePagination from "../../hooks/usePagination";

import { fetchDrivers } from "./driversActions";

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
  const isAndroid = Platform.OS === "android";
  const itemsPerPage = 20;
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.drivers.error);
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
      <Table>
        <Row
          data={testTable.HeadTable}
          style={styles.HeadStyle}
          textStyle={styles.TableText}
          borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}
        />
        <View>
          {loading && <ActivityIndicator size="large" />}
          {error && <Text>Sorry. Drivers could not be fetched.</Text>}
          {paginatedData?.length && (
            <FlatList
              style={{ marginBottom: 40 }}
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
              onEndReachedThreshold={isAndroid ? 0.5 : 0}
            />
          )}
        </View>
      </Table>
    </View>
  );
};

export default Drivers;
