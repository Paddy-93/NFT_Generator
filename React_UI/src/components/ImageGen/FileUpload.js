import React, { useState } from 'react';
import { StyledHeader , StyledButton1, StyledH1, StyledButton} from '../../AppStyles.styles.tw';
import UploadService from "../../services/FileUploadService";

const FileUpload = ({ setDataCallback, setNextStep }) => {
    //const [file,setFile] = useState({});
    const [selectedFile, setSelectedFile] = useState(undefined);
    
    const selectFiles = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const clickHandler  = () => {
      var uploadServ = UploadService.upload(selectedFile, (event) => {
      }).then(result =>{
        setDataCallback(result.data.layerOrder, result.data.directoryName)
        setNextStep();
      });
      console.log(uploadServ);
    }

    return (
      <div>
        <StyledH1>Upload Your Files in .zip Format</StyledH1>
        <input type="file" onChange={selectFiles} id="your-file-input" name="userPhoto" />
        <StyledButton onClick={() => clickHandler()}>Upload Image</StyledButton>
      </div>
  
    )
  }

export default FileUpload