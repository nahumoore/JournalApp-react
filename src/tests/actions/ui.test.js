import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "../../actions/ui";
import { types } from "../../types/types";

describe("testing in ui-action", () => {
  test("should work all the actions", () => {
    const action = setError("HELP");

    expect(action).toEqual({
      type: types.uiSetError,
      payload: "HELP",
    });

    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError,
    });

    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading,
    });

    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading,
    });
  });
});
