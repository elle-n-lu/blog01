import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const Demo: React.FC = () => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const [click, setClick] = useState(false)
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
      <label className=" hover:bg-slate-300" htmlFor="file-input">
                upload avatar..
              </label>
        <input id="file-input" type="file" onChange={onChange}/>
        <button>Use default img</button>
        <br />
        <br />
        
        {/* <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative md:w-1/2 w-full">
          {/*content*/}
          {/* <div className="border-0 rounded-lg shadow-lg justify-between flex flex-col md:w-full bg-white outline-none focus:outline-none py-2 px-4 xl:py-24 xl:px-64 "> */}
           
        < Cropper
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
        <button onClick={()=>setClick(false)} >cancel</button>
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        
      </div>
      <div>
        <div className=" inline-block p-4 box-border" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div
            className=" overflow-hidden"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
        <div
          className="inline-block p-4 box-border"
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default Demo;
