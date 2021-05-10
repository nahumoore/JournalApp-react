import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { MemoryRouter } from "react-router";
import { types } from "../../../types/types";

// jest.mock("../../../actions/auth", () => ({
//   startGoogleLogin: jest.fn(),
//   startLoginEmailPassword: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("testing in <RegisterScreen />", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("should snapshot the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should do the dispatch of the respective action", () => {
    const emailField = wrapper.find('input[name="email"]');

    emailField.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    const actions = store.getActions();

    expect(actions[0]).toBe(undefined);
  });

  test("should show the error msg", () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: "Email no es correcto",
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
    expect(wrapper.find(".auth__alert-error").text().trim()).toBe(
      initState.ui.msgError
    );
  });
});
