import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { GET_AUTHORIZED_USER } from "../graphql/queries";
import { useApolloClient, useQuery } from "@apollo/client";

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
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const { data } = useQuery(GET_AUTHORIZED_USER);
  const authorizedUser = data ? data.authorizedUser : undefined;

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab text={"Repositories"}/>
        </Link>
        {authorizedUser ? (
          <>
            <Link to="/review">
              <AppBarTab text={"Create Review"}/>
            </Link>
            <Link to="/my-reviews">
              <AppBarTab text={"My Reviews"}/>
            </Link>
            <AppBarTab onPress={onSignOut}>Sign out</AppBarTab>
          </>
        ) : (
          <>
            <Link to="/sign-in" >
              <AppBarTab text={"Sign In"}/>
            </Link>
            <Link to="/sign-up">
              <AppBarTab text={"Sign Up"}/>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
