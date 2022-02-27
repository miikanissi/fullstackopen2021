import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    height: 46,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 10,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  },
  regularBorder: {
    borderColor: theme.colors.backgroundSecondary,
  },
  errorBorder: {
    borderColor: theme.colors.error,
  }
});

const TextInput = ({ style, error,...props }) => {
  const textInputStyle = [style, styles.container, error ? styles.errorBorder : styles.regularBorder];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
