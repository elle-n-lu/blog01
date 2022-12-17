import axios from "axios";
import React, { useState } from "react";

interface uploadProps {}

const upload: React.FC<uploadProps> = ({}) => {
  const [image, setImage] = useState<any>("");

  const changeImage = (e: any) => {
    setImage(e.target.files[0]);
    console.log('image', image)
  };
  const [src, setSrc] = useState("");

  const submitAc = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    await axios
      .post("http://127.0.0.1:4000/upload", formData, {})
      .then((res) => console.log(res));
  //  console.log('form', image.name)
  setSrc(`http://127.0.0.1:4000/images/${image.name}`)
    
  };
  return (
    <div className=" mx-auto mt-4">
      <form onSubmit={()=>submitAc}>
        <input type="file" name="image" onChange={changeImage} />
        <button className=" bg-blue-400 p-2" type="submit">
          submit
        </button>
        
      </form>
      <img src={src} width="256" height="256" />
    </div>
  );
};

export default upload;
