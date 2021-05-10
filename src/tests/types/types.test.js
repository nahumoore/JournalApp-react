import { types } from "../../types/types";

describe("testing in types", () => {
  const testTypes = {
    login: "[Auth] Login",
    logout: "[Auth] Logout",

    uiSetError: "[UI] SetError",
    uiRemoveError: "[UI] RemoveError",

    uiStartLoading: "[UI] Startloading",
    uiFinishLoading: "[UI] Finishloading",

    notesAddNew: "[Notes] NewNote",
    notesDelete: "[Notes] DeleteNote",
    notesActive: "[Notes] SetActiveNote",
    notesLoad: "[Notes] LoadNotes",
    notesUpdated: "[Notes] UpdatedNote",
    notesFileUrl: "[Notes] UpdateImageUrl",
    notesLogoutCleaning: "[Notes] LogoutCleaning",
  };

  test("should be the same objet", () => {
    expect(types).toEqual(testTypes);
  });
});
