import {connect} from "react-redux";

const Notification = (props) => {
  const notification = props.notification;
  const style = {
    border: "2px solid",
    padding: 10,
  };
  return <div>{notification !== null && <div style={style}>{notification}</div>}</div>;
};

const stateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(stateToProps)(Notification);
