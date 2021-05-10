import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe("testing the actions in auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("loign and logout should create the respective action", () => {
    const uid = "ABC123";
    const displayName = "Nahuel";

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: { uid, displayName },
    });

    expect(logoutAction).toEqual({ type: types.logout });
  });

  test("should do the logout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });
    expect(actions[1]).toEqual({
        type: types.notesLogoutCleaning,
      });
  });

  test('should start the startLoginEmailPassword', async() => {

    await store.dispatch(startLoginEmailPassword('testing@test.com', '123456'));
    const actions = store.getActions();

    expect(actions[1]).toEqual({
        type: types.login,
        payload: {
            uid: '6K67aN76IsTsBWqV77YLHvgftWO2',
            displayName: null
        }
    })
      
  })
  
});
