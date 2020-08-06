import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

/*render helps render components and returns find helper methods.
- fireEvent is for simulating events on DOM elements.
- waitForElement is useful when waiting for UI changes to occur.*/

import LoginForm, { Props } from "../LoginForm";

describe("<LoginForm />", () => {
  test("should display a blank login form, with remember me checked by default", async () => {});
});
