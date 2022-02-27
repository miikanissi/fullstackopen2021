import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    display: "flex",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text={"Repositories"}/>
    </View>
  );
};

export default AppBar;
