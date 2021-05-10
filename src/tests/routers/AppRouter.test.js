import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { firebase } from "../../firebase/firebaseConfig";

import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";
import { act } from "@testing-library/react";

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "ABC",
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Testing <AppRouter />", () => {
  test("should call the component if you are authenticated", async () => {
    let user;

    await act(async () => {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword("testing@test.com", "123456");
      user = userCred.user;

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalledWith("6K67aN76IsTsBWqV77YLHvgftWO2", null);
  });
});
