import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { activeNote } from "../../../actions/notes";
import { NoteScreen } from "../../../components/notes/NoteScreen";

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "1",
    name: "Nahuel",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: 1234,
      title: "Hola",
      body: "Mundo!",
      date: 0,
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe("Testing in <NoteScreen />", () => {
  test("should do the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should shot the activeNote", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola de nuevo",
      },
    });

    expect(activeNote).toHaveBeenLastCalledWith(1234, {
      body: "Mundo!",
      title: "Hola de nuevo",
      id: 1234,
      date: 0,
    });
  });
});
