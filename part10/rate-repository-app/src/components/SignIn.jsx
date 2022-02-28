import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import Button from "./Button";
import useSignIn from "../hooks/useSignIn";

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
};

const valSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
    <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <Button onPress={onSubmit} testID="submitButton">
        Sign in
      </Button>
    </View>
  );
};

export const SignInContainer = ({
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
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;
    await signIn({ username, password });
    navigate("/");
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
