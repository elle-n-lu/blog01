import axios from "axios";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { ImPencil } from "react-icons/im";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import { createApollo } from "../utils/createApolloClient";
import Avatar from "../components/Avatar";
import {
  useMeQuery,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "../generated/graphql";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface userProfileProps {
  // picture: ImageFile | null;
}

const userProfile: React.FC<userProfileProps> = ({}) => {
  const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

  const { data, loading } = useMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateUrl] = useUpdateAvatarMutation();
  const [click, setClick] = useState(false);
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const buttonClass =
    "mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  const chooseFile = (e: any) => {
    setImage(e.target.files[0]);
  };

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
    setClick(true);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
    setClick(false);
  };

  if (loading) {
    return <div>...</div>;
  }

  const submitAc = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const filename = data?.me?.username as string;
    e.preventDefault();
    // let file : string | Blob
    const file = await fetch(cropData)
      .then((res) => res.blob())
      .then((blob) => {
        return new File([blob], filename + ".jpg", {
          type: "image/png,image/jpg",
        });
      });
    const formData = new FormData();
    formData.append("image", file);
    console.log("url info", image, formData, cropData);
    await axios
      .post("http://127.0.0.1:4000/upload", formData, {})
      .then((res) => console.log(res));

    await updateUrl({
      variables: { avatarUrl: `http://127.0.0.1:4000/images/${filename}.jpg` },
      update: (cache) => {
        cache.evict({ fieldName: "Profiles:{}" });
        console.log("cache", cache);
      },
    });
  };

  const dropdownClass =
    "inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100";
  const dropdownItemClass =
    " right-0 z-10 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none";
  return (
    <>
      <Navbar />

      <div className="grid grid-cols-2 grid-rows-3 mt-8 mx-8 ">
        <form className="  self-center" onSubmit={(e)=>submitAc}>
          <div className="" style={{ width: "256px", height: "256px" }}>
            <Avatar />
          </div>
          <div className=" absolute left-48 top-72">
            <button
              className="flex hover:shadow-lg items-center px-2 py-1 absolute left-3/4 top-3/4 border bg-white border-slate-500 rounded-lg"
              aria-expanded="true"
              aria-haspopup="true"
              type="submit"
            >
              <ImPencil className=" mr-2 " />
              Edit
            </button>
          </div>

          <div
            className=" absolute left-52 top-56 mt-2 text-sm border bg-white border-slate-500 rounded-lg"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div style={{ width: "100%" }}>
              <label
                className=" inline-block my-2 hover:bg-slate-300"
                htmlFor="file-input"
              >
                upload avatar..
              </label>
              <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
                onChange={onChange}
              />
              {click && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative md:w-1/2 w-full">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg justify-between flex flex-col md:w-full bg-white outline-none focus:outline-none py-2 px-4 xl:py-24 xl:px-64 ">
                      <Cropper
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
                      <div className=" flex mx-6">
                        <button
                          className="text-red-500 border w-1/3 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mt-8 mr-1 mb-1 ease-linear transition-all duration-150"
                          onClick={getCropData}
                        >
                          crop
                        </button>
                        <button
                          className="text-green-500 border w-1/3 ml-32 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mt-8 mr-1 mb-1 ease-linear transition-all duration-150"
                          onClick={() => setClick(false)}
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>

        <Formik
          initialValues={{
            username: data?.me?.username,
            email: data?.me?.email,
          }}
          onSubmit={async (values) => {
            const { errors, data } = await updateProfile({
              variables: {
                email: values.email as string,
                username: values.username as string,
              },
              update: (cache) => {
                cache.evict({ fieldName: "Profiles:{}" });
                console.log("cache", cache);
              },
            });

            // console.log(values, e);
          }}
        >
          {() => (
            <Form>
              <div className=" row-span-2 col-start-2 col-span-2 justify-self-center ">
                <InputField label="username" name="username" />
                <InputField label="email" name="email" />
                <button className={buttonClass} type="submit">
                  edit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default createApollo()(userProfile);
