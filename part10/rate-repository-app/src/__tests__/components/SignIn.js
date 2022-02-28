import {render, fireEvent, waitFor} from "@testing-library/react-native";
import {SignInContainer} from "../../components/SignIn";

const credentials = {username: "tam", password: "password"};

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const {getByTestId, getByPlaceholderText} = render(
        <SignInContainer onSubmit={onSubmit} />
      );
      fireEvent.changeText(getByPlaceholderText("Username"), credentials.username);
      fireEvent.changeText(getByPlaceholderText("Password"), credentials.password);
      fireEvent.press(getByTestId("submitButton"));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual(credentials);
      });
    });
  });
});
