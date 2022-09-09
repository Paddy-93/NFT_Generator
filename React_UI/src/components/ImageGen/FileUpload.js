import React, { useState } from 'react';
import UploadService from "../../services/FileUploadService";

const FileUpload = () => {
    //const [file,setFile] = useState({});
    const [selectedFile, setSelectedFile] = useState(undefined);
    const selectFiles = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
   
    const clickHandler  = () => {
      var uploadServ = UploadService.upload(selectedFile, (event) => {
      }).then(result =>{
        console.log("HERE RESULT")
         console.log(result);
      });
      console.log(uploadServ);
    }

    return (
      <>
        <input type="file" onChange={selectFiles} id="your-file-input" name="userPhoto" />
        <input type="submit" value="Upload Image" name="submit" onClick={() => clickHandler()}/>
      </>
  
    )
  }

export default FileUpload