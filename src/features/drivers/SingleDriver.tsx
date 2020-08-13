import React from "react";
import { View, Text as RNText, StyleSheet } from "react-native";

import { Center } from "../Center";
import { NavProps } from "../../ParamList";

type SingleDriverProps = NavProps<"SingleDriver">;

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flexDirection: "row",
  },
  text: { textAlign: "left", marginBottom: 10 },
  column: { marginRight: 30 },
});

const Text = ({ children }) => <RNText style={styles.text}>{children}</RNText>;

const SingleDriver = ({
  route: {
    params: {
      driverId,
      permanentNumber,
      code,
      givenName,
      familyName,
      dateOfBirth,
      nationality,
    },
  },
}: SingleDriverProps) => {
  return (
    <Center>
      <View style={styles.container}>
        <View style={styles.column}>
          <Text>DriverID:</Text>
          <Text>Code:</Text>
          <Text>Name:</Text>
          <Text>Nationality:</Text>
          <Text>Date of Birth:</Text>
          <Text>Permanent Number:</Text>
        </View>
        <View>
          <Text>{driverId}</Text>
          <Text>{code || "none"}</Text>
          <Text>
            {givenName} {familyName}
          </Text>
          <Text>{nationality}</Text>
          <Text>{dateOfBirth}</Text>
          <Text>{permanentNumber || "none"}</Text>
        </View>
      </View>
    </Center>
  );
};

export default SingleDriver;
