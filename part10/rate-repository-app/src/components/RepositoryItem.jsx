import { Text } from "react-native";

const properties = [
  "id",
  "fullName",
  "description",
  "language",
  "forksCount",
  "stargazersCount",
  "ratingAverage",
  "reviewCount",
  "ownerAvatarUrl",
];

const RepositoryItem = ({ item }) => {
  return (
    <>
      {Object.values(item).map((e, index) => (
        <Text key={index}>
          {properties[index]}: {e}
        </Text>
      ))}
    </>
  );
};

export default RepositoryItem;
