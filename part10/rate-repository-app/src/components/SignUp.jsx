import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import FormikTextInput from "./FormikTextInput";
import Button from "./Button";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const initValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const valSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required("Username with length 1-30 is required"),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required("Password with length 5-50 is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="username"
          placeholder="Username with length 1-30"
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password with length 5-50"
          secureTextEntry
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="passwordConfirmation"
          placeholder="Password confirmation"
          secureTextEntry
        />
      </View>
      <Button onPress={onSubmit}>Sign up</Button>
    </View>
  );
};

export const SignUpContainer = ({
  initialValues = initValues,
  validationSchema = valSchema,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await signUp({ username, password });
    await signIn({ username, password });
    navigate("/");
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
