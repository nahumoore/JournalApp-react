import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("testing in authReducer", () => {
  test("should call the login type", () => {
    const inicialState = {};
    const action = {
      type: types.login,
      payload: {
        uid: "abc",
        displayName: "Holanda",
      },
    };

    const state = authReducer(inicialState, action);
    expect(state).toEqual({
      uid: "abc",
      name: "Holanda",
    });
  });

  test("shouldn't change the state", () => {
    const inicialState = { uid: "abc", name: "Holanda" };
    const action = {
      type: types.logout
    };

    const state = authReducer(inicialState, action);
    expect(state).toEqual({});
  });

  test("should call the logout type", () => {
    const inicialState = { uid: "abc", name: "Holanda" };
    const action = {
      type: 'hgbhas'
    };

    const state = authReducer(inicialState, action);
    expect(state).toEqual(inicialState);
  });
});
