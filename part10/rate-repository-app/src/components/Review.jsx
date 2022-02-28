import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-native";

import Button from "./Button";
import FormikTextInput from "./FormikTextInput";
import useReview from "../hooks/useReview";

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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const valSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner username is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required("Rating between 0 and 100 is required"),
  text: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="repositoryName" placeholder="Repository Name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="text" placeholder="Review" multiline />
      </View>
      <Button onPress={onSubmit}>Create a review</Button>
    </View>
  );
};

const ReviewContainer = ({
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Review = () => {
  const [createReview] = useReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, text } = values;
    const rating = parseInt(values.rating);

    const payload = await createReview({
      ownerName,
      repositoryName,
      rating,
      text,
    });
    const { repositoryId } = payload.data.createReview;

    history.push(`/${repositoryId}`);
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;
