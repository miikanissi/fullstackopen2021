import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Linking,
  FlatList,
  Alert,
} from "react-native";
import Button from "./Button";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

import theme from "../theme";
import Text from "./Text";
import formatInThousands from "../utils/formatInThousands";
import formatDate from "../utils/formatDate";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  wrap: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatarBox: {
    flexGrow: 0,
    marginRight: 20,
  },
  flexBox: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  description: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  flexItem: {
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  flexItemCount: {
    marginBottom: 5,
  },
  languageBox: {
    marginTop: 10,
    flexDirection: "row",
  },
  language: {
    color: "white",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  separator: {
    height: 10,
  },
  ratingBox: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderColor: theme.colors.primary,
    borderStyle: "solid",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: "blue",
    textAlign: "center",
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
});

const CountItem = ({ label, count, id }) => {
  return (
    <View style={styles.flexItem}>
      <Text
        style={styles.flexItemCount}
        fontWeight="bold"
        testID={`${id}/${label}`}
      >
        {formatInThousands(count)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryInfo = ({ repository, singleView }) => {
  if (!repository) {
    return null;
  }

  const {
    id,
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
  } = repository;

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.avatarBox}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        </View>
        <View style={styles.flexBox}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
            testID={`${id}/fullName`}
          >
            {fullName}
          </Text>
          <Text
            style={styles.description}
            color="textSecondary"
            testID={`${id}/description`}
          >
            {description}
          </Text>
          {language ? (
            <View style={styles.languageBox}>
              <Text style={styles.language} testID={`${id}/lang`}>
                {language}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View>
        <CountItem count={stargazersCount} label="Stars" id={id} />
        <CountItem count={forksCount} label="Forks" id={id} />
        <CountItem count={reviewCount} label="Reviews" id={id} />
        <CountItem count={ratingAverage} label="Rating" id={id} />
      </View>
      {singleView && (
        <Button
          onPress={() => {
            Linking.openURL(url);
          }}
        >
          Open in Github
        </Button>
      )}
    </View>
  );
};

const ReviewItem = ({ review, reviewsOnly = false, refetch }) => {
  const { id, text, rating, createdAt, user, repository, repositoryId } =
    review;

  const [deleteReview] = useMutation(DELETE_REVIEW);
  const history = useHistory();

  const handleViewRepository = () => {
    history.push(`/${repositoryId}`);
  };

  const handleDeleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "DELETE",
          onPress: async () => {
            if (refetch) {
              await deleteReview({ variables: { id: review.id } });
              await refetch({ includeReviews: true });
            }
          },
        },
      ]
    );
  };

  const AllButtons = (
    <View style={styles.buttonBox}>
      <Button
        style={{ backgroundColor: "blue" }}
        onPress={handleViewRepository}
      >
        View Repository
      </Button>
      <Button style={{ backgroundColor: "red" }} onPress={handleDeleteReview}>
        Delete Review
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.ratingBox}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <View style={styles.flexBox}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
          >
            {reviewsOnly ? repository.fullName : user.username}
          </Text>
          <Text
            style={styles.description}
            color="textSecondary"
            testID={`${id}/description`}
          >
            {formatDate(createdAt)}
          </Text>
          <Text>{text}</Text>
          {reviewsOnly && AllButtons}
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItem = ({
  repository,
  reviews = [],
  handleFetchMore,
  singleView = false,
  refetch,
}) => {
  const listHeaderComponent = repository ? (
    <RepositoryInfo repository={repository} singleView={singleView} />
  ) : null;

  return reviews.length ? (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} reviewsOnly={!repository} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={listHeaderComponent}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  ) : (
    <RepositoryInfo repository={repository} singleView={singleView} />
  );
};

export default RepositoryItem;
