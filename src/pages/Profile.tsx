import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadProfileImage } from "../api/privateRequests";
import { updateUserImage } from "../state/slices/user.slice";

const Profile = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer>();
  const [error, setError] = useState("");

  const fileInputHandler = (e: any) => {
    const file = e.target.files[0];
    if (!file.type.includes("image")) {
      return setError("Please select a valid Image");
    }

    setSelectedFile(file);
    previewFile(file);
    console.log(file);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewImage(reader.result);
      }
    };
  };

  const fileSubmitHandler = (e: any) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      if (reader.result) uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("error while converting to base64");
    };
  };

  const uploadImage = async (base64EncodedImage: string | ArrayBuffer) => {
    try {
      const { data } = await uploadProfileImage(base64EncodedImage);

      dispatch(updateUserImage(data.image));
    } catch (err) {
      console.error(err);
      //TODO: SHOW ERROR IN UI
      console.log("Could not update image try again later");
    }
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <p>Upload Image</p>
      <form onSubmit={fileSubmitHandler}>
        <input
          type="file"
          onChange={fileInputHandler}
          accept="image/*"
          required
        />
        <button type="submit" disabled={!selectedFile}>
          Submit
        </button>
      </form>
      {error && <p>{error}</p>}
      {previewImage && <img src={previewImage.toString()} alt="previewImage" />}
    </div>
  );
};

export default Profile;
