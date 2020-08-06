import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

/*render helps render components and returns find helper methods.
- fireEvent is for simulating events on DOM elements.
- waitForElement is useful when waiting for UI changes to occur.*/

import LoginForm, { Props } from "../LoginForm";

//render helper function to handle props overriding
/*/f the Props interface changes, TypeScript will throw a compiler error and the test helper will need to be updated, 
ensuring our tests are kept updated.*/
function renderLoginForm(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    onPasswordChange() {
      return;
    },
    onRememberChange() {
      return;
    },
    onUsernameChange() {
      return;
    },
    onSubmit() {
      return;
    },
    shouldRemember: true,
  };
  return render(<LoginForm {...defaultProps} {...props} />);
}

describe("<LoginForm />", () => {
  test("should display a blank login form, with remember me checked by default", async () => {
    const { findByTestId } = renderLoginForm();

    const loginForm = await findByTestId("login-form");

    expect(loginForm).toHaveFormValues({
      username: "",
      password: "",
      remember: true,
    });
  });

  test("should allow entering a username", async () => {
    const onUsernameChange = jest.fn();
    const { findByTestId } = renderLoginForm({ onUsernameChange });
    const username = await findByTestId("username");

    //fireEvent utility helps us to modify the form's state.
    fireEvent.change(username, { target: { value: "test" } });

    expect(onUsernameChange).toHaveBeenCalledWith("test");
  });

  test("should allow entering a password", async () => {
    const onPasswordChange = jest.fn();
    const { findByTestId } = renderLoginForm({ onPasswordChange });
    const username = await findByTestId("password");

    //with fireEvent.change we simulate a form change event on the inputs and we assert that the right value was passed to the prop callback
    fireEvent.change(username, { target: { value: "password" } });

    expect(onPasswordChange).toHaveBeenCalledWith("password");
  });

  test("should allow toggling remember me", async () => {
    const onRememberChange = jest.fn();
    const { findByTestId } = renderLoginForm({
      onRememberChange,
      shouldRemember: false,
    });
    const remember = await findByTestId("remember");
    //fireEvent.click toggles the checkbox on and off
    fireEvent.click(remember);
    /*since we set the initial value of the props to false,
    after the first click shouldRemember should be true*/
    expect(onRememberChange).toHaveBeenCalledWith(true);

    fireEvent.click(remember);

    expect(onRememberChange).toHaveBeenCalledWith(false);
  });

  test("should submit the form with username, password and remember", async () => {
    const onSubmit = jest.fn();
    const { findByTestId } = renderLoginForm({
      onSubmit,
      shouldRemember: false,
    });
    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const remember = await findByTestId("remember");
    const submit = await findByTestId("submit");

    fireEvent.change(username, { target: { value: "test" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.click(remember);
    fireEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith("test", "password", true);
  });
});
