import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate} from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Review from "./Review";
import SingleRepository from "./SingleRepository";
import UserReviews from "./UserReviews";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList /> }/>
        <Route path="/signin" element={<SignIn /> } exact/>
        <Route path="/signup" element={<SignUp/> } exact/>
        <Route path="/review" element={<Review/> } exact/>
        <Route path="/myreviews" element={<UserReviews/> } exact/>
        <Route path="/:id" element={<SingleRepository/> } exact/>
        <Route path="*" element={<Navigate to="/" /> }/>
      </Routes>
    </View>
  );
};

export default Main;
