import { StyleSheet} from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  item:{
    color: theme.colors.textTertiary,
    fontSize: theme.fontSizes.subheading,
    paddingLeft: 15,
  }
});

const AppBarTab = ({ text })=>{
  return <Text style={styles.item}>{text}</Text>;
};

export default AppBarTab;
