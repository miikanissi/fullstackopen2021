import React from "react";
import { Pressable, View, StyleSheet } from "react-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    minWidth: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
  },
  text: {
    color: theme.colors.backgroundPrimary,
  },
});

const Button = ({ children, style, ...props }) => {
  const buttonStyle = [styles.container, style];
  return (
    <Pressable {...props}>
      <View style={buttonStyle}>
        <Text style={styles.text} fontWeight="bold">
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
