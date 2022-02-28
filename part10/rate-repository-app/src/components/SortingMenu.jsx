import React from "react";
import { Picker } from "@react-native-picker/picker";

const SortingMenu = ({ setSortingCriteria, sorting }) => {
  return (
    <Picker
      selectedValue={sorting}
      onValueChange={(itemValue) => setSortingCriteria(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="latest_repos" />
      <Picker.Item
        label="Highest Rated Repositories"
        value="highest_rated_repos"
      />
      <Picker.Item
        label="Lowest Rated Repositories"
        value="lowest_rated_repos"
      />
    </Picker>
  );
};

export default SortingMenu;
