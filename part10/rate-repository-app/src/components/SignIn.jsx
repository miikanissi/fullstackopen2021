import { Formik } from "formik";
import { View, Button, StyleSheet } from "react-native";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import AuthStorage from "../utils/authStorage";

const styles = StyleSheet.create({
  container:{
    fontSize: theme.fontSizes.body,
    backgroundColor: theme.colors.backgroundPrimary,
    display: "flex",
    marginBottom: 10,
    padding: 10,
  },
  input:{
    paddingLeft: 10,
    height: 46,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: theme.colors.backgroundSecondary,
    fontSize: theme.fontSizes.subheading,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextExtry={true}
      />
      <Button onPress={onSubmit} title="Sign In" />
    </View>
  );
};

const SignIn = () => {
  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });
 const initialValues = {
    username: "",
    password: "",
  };
  const [signIn] = useSignIn();
  const storage = new AuthStorage();
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const {data} = await signIn({ username, password });
      storage.setAccessToken(data.authenticate.accessToken);
    } catch (error) {
      console.log("Error occured during Sign In: ", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
