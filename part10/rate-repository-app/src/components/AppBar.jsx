import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    display: "flex",
    flexDirection: "row",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab text={"Repositories"}/>
        </Link>
        <Link to="/signin">
          <AppBarTab text={"Sign In"}/>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
