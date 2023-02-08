import React, { useState } from 'react';
import { StyledH1, StyledButton} from '../../AppStyles.styles.tw';
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
        // console.log("NOW SET DIRECTORY " + result.data.directoryName)
        setDataCallback(result.data.layerOrder, result.data.directoryName)
        setNextStep();
      });
      console.log(uploadServ);
    }

    return (
      <div>
        <div>
          <StyledH1>Upload Your Files in .zip Format</StyledH1>
          <input type="file" onChange={selectFiles} id="your-file-input" name="userPhoto" />
        </div>
        <StyledButton onClick={() => clickHandler()}>Upload Zip</StyledButton>
      </div>
  
    )
  }

export default FileUpload