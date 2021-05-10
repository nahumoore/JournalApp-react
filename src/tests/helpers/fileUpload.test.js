import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "diivawrjp",
  api_key: "635161867461763",
  api_secret: "86OKfdFjfSBvmP4ePP_4DfW9Nus",
});

describe("testing in fileUpload", () => {
  test("should upload a file and return the url", async () => {
    const resp = await fetch(
      "https://image.flaticon.com/icons/png/512/1458/1458496.png"
    );
    const blob = await resp.blob();

    const file = new File([blob], "foto.png");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    //Borrar imagen
    const segments = url.split('/');
    const imageId = segments[ segments.length - 1 ].replace('.png', '');

    await cloudinary.v2.api.delete_resources( imageId, {}, ()=> {console.log('');});
  });

  test("should return an error", async () => {
    const file = new File([], "foto.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
