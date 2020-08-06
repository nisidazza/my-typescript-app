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
        onSubmit(){
            return;
        },
        shouldRemember: true
    };
    return render(<LoginForm {...defaultProps} {...props} />)
}

describe("<LoginForm />", () => {
  test("should display a blank login form, with remember me checked by default", async () => {
      const {findByTestId} = renderLoginForm();

      const loginForm = await findByTestId("login-form");

      expect(loginForm).toHaveFormValues({
          username: "",
          password: "",
          remember: true
      });
  });
  
});
