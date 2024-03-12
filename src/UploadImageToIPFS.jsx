import React, { useState } from "react";
import axios from "axios";
export const UploadImageToIPFS = () => {
  //Secret Keys
  const API_Key = "75eee743cb61fa32d0b9";
  const API_Secret =
    "a3fb531276c269df94ab69d0388da2236ffaad494e11bfe3cc70b56918e00858";

  // Create Function take image from pc
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  //create uplaod function to ipfs

  const uploadFileToPinata = async () => {
    const formData = new FormData();

    formData.append("file", image);
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            pinata_api_key: API_Key,
            pinata_secret_api_key: API_Secret,
          },
        }
      );

      console.log(res.data);

      const { IpfsHash } = res.data;
      setImageUrl(`https://gateway.pinata.cloud/ipfs/${IpfsHash}`);
    } catch (error) {
      console.log(error);
    }
    console.log(image);
  };

  //https://gateway.pinata.cloud/ipfs/QmS2G3vofUcLYgzGb8KUzvyzaxWWzYyYb47xmU1pi4zthb

  return (
    <div>
      <h1>Upload your image to IPFS</h1>
      <input type="file" onChange={handleFileChange} />

      <br />

      <button onClick={uploadFileToPinata}>Uplaod To Pinata</button>

      {imageUrl && <img src={imageUrl} alt="ipfsImage" />}
    </div>
  );
};
