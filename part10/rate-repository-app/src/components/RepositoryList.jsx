import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { withRouter } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import SortingMenu from "./SortingMenu";
import FilterInput from "./FilterInput";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { filter, setFilter, sorting, setSortingCriteria } = this.props;
    return (
      <>
        <FilterInput filter={filter} setFilter={setFilter} />
        <SortingMenu
          setSortingCriteria={setSortingCriteria}
          sorting={sorting}
        />
      </>
    );
  };

  render() {
    const { repositories, navigate, onEndReach } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate.push(`/${item.id}`)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sorting, setSorting] = useState("latest_repos");
  const [filter, setFilter] = useState("");
  const { repositories, fetchMore } = useRepositories({
    sortCriteria: sorting,
    filter,
    first: 8,
  });

  const onEndReach = () => {
    fetchMore();
  };

  const RepositoryListContainerWithRouter = withRouter(RepositoryListContainer);

  return (
    <RepositoryListContainerWithRouter
      repositories={repositories}
      setSortingCriteria={setSorting}
      filter={filter}
      setFilter={setFilter}
      sorting={sorting}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
