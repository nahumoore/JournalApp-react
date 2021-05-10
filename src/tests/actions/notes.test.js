import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from "../../actions/notes";
import { db } from "../../firebase/firebaseConfig";
import { fileUpload } from "../../helpers/fileUpload";
import { types } from "../../types/types";

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(() => {
    return "https://img.com/imagen.jpg";
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "402abhEGnNMtZQLP5XJP",
      title: "Hola",
      body: "Mundo!",
    },
  },
};

let store = mockStore(initState);

describe("testing in notes-action", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should create a new note", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    //Delete the note
    const docId = actions[0].payload.id;
    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test("startUploading should update the url", async () => {
    const file = new File([], "foto.png");
    await store.dispatch(startUploading(file));

    const docRef = await db
      .doc("/TESTING/journal/notes/402abhEGnNMtZQLP5XJP")
      .get();
    expect(docRef.data().url).toBe("https://img.com/imagen.jpg");
  });
});
