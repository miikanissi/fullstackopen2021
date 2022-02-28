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
  topContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  countItem: {
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  languageText: {
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
  reviewRatingContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderColor: theme.colors.primary,
    borderStyle: "solid",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewRatingText: {
    color: "blue",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
});

const CountItem = ({ label, count, id }) => {
  return (
    <View style={styles.countItem}>
      <Text
        style={styles.countItemCount}
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
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
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
            style={styles.descriptionText}
            color="textSecondary"
            testID={`${id}/description`}
          >
            {description}
          </Text>
          {language ? (
            <View style={styles.languageContainer}>
              <Text style={styles.languageText} testID={`${id}/lang`}>
                {language}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.bottomContainer}>
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
    <View style={styles.buttonContainer}>
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
      <View style={styles.topContainer}>
        <View style={styles.reviewRatingContainer}>
          <Text style={styles.reviewRatingText}>{rating}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
          >
            {reviewsOnly ? repository.fullName : user.username}
          </Text>
          <Text
            style={styles.descriptionText}
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
