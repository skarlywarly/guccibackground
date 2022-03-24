import { useState, useEffect } from "react";
import fileSaver from "file-saver";

const GUCCI_ADDRESS = "0x572e33ffa523865791ab1c26b42a86ac244df784";

const App = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [bg, setBg] = useState("0000ff");

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, 350, 350);

    context.fillStyle = "#000000000";
    context.fillRect(0, 0, 350, 350);
  }, []);

  const generatePreview = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.clearRect(0, 0, 350, 350);

    const fillColor = `#${bg.replace("#", "")}`;
    context.fillStyle = fillColor;
    context.fillRect(0, 0, 350, 350);

    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 10, 10, 330, 330);
    };
    image.setAttribute("crossorigin", "anonymous");
    image.src = data?.image_url;
  };

  useEffect(() => {
    if (id) {
      (async () => {
        const res = await fetch(
          `https://api.opensea.io/api/v1/asset/${GUCCI_ADDRESS}/${id}/`
        );
        const r = await res.json();
        setData(r);
      })();
    }
  }, [id]);

  const onButtonClick = async () => {
    const canvas = document.getElementById("canvas");
    // @ts-ignore
    const dataUrl = canvas.toDataURL("image/png");

    const animalName = "guccified";

    fileSaver.saveAs(dataUrl, animalName);
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-center max-w-screen-sm">
        <div
          className="mt-4 text-3xl font-bold"
          style={{
            fontFamily: "Granjon",
          }}
        >
          GUCCIFIED
        </div>
        <input
          placeholder="Enter 10ktf x gucci Token Id"
          name="id"
          value={id}
          onChange={({ target: { value } }) => {
            setId(value);
          }}
          className="w-full my-2"
        />
        <input
          placeholder="Enter Background Color #"
          name="bg"
          value={bg}
          onChange={({ target: { value } }) => {
            setBg(value);
          }}
          className="w-full my-2"
        />
        <canvas id="canvas" width="350px" height="350px" />
        <div
          onClick={generatePreview}
          className="px-4 py-2 mt-2 text-lg font-bold border-2"
          style={{
            fontFamily: "Granjon",
          }}
        >
          GENERATE PREVIEW
        </div>
        <div
          className="px-4 py-2 mt-4 text-lg font-bold border-2"
          onClick={onButtonClick}
          style={{
            fontFamily: "Granjon",
          }}
        >
          DOWNLOAD
        </div>
      </div>
    </div>
  );
};

export default App;
