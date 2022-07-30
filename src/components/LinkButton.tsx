import React, { useCallback } from "react";
import {
  Alert, Linking,
  StyleSheet, Text, TouchableOpacity
} from "react-native";

interface IProps {
  url: string;
  title: string;
}

const LinkButton = ({ url, title }: IProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#22A7F0",
    width: 100,
    textTransform: "uppercase",
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    padding: 10,
  },
});
