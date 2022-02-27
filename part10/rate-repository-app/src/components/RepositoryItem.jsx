import { Image, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const itemFormatter = (num) => {
  return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num;
};
const styles = StyleSheet.create({
  container: {
    fontSize: theme.fontSizes.body,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  avatarImage: {
    padding: 10,
    flexGrow: 0,
  },
  statsBox: {
    paddingLeft: 25,
    width: "25%",
    justifyContent: "center",
  },
  languageBox: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textTertiary,
    alignSelf: 'flex-start',
    borderRadius: 10,
    borderColor: theme.colors.backgroundPrimary,
    padding: 4,
  },
  flexItem: {
    paddingTop: 2,
    flexGrow: 0,
    borderColor: theme.colors.backgroundSecondary,
    alignItems: "flex-start",
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.avatarImage}>
          <Image
            style={styles.avatar}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View style={styles.flexItem}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text fontWeight="bold" style={styles.languageBox}>
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.statsBox}>
          <Text fontWeight="bold">{itemFormatter(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statsBox}>
          <Text fontWeight="bold">{itemFormatter(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statsBox}>
          <Text fontWeight="bold">{itemFormatter(item.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statsBox}>
          <Text fontWeight="bold">{itemFormatter(item.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
