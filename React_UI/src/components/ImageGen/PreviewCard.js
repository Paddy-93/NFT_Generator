import React, { useState } from 'react'
import { StyledButton, StyledInput } from '../../AppStyles.styles.tw';
import PrevNextButton from '../PrevNextButton';
import UploadService from "../../services/FileUploadService";

const PreviewCard = ({directoryName, layerOrder, metaUriCallback, setNextStep}) => {
    // const partialDirName = directoryName.split("?")[1];
    // console.log("NEW CARD "+directoryName);
    const [previewIndex, setPreviewIndex] = useState(1);
    const [numEditions, setNumEditions] = useState(10000);

    const submitGenImages = async() => {
       console.log("LAYERS "+layerOrder+ " DIR NAME " + directoryName+ " NUM EDITIONS " +numEditions)
       var data = await UploadService.genImages(layerOrder, directoryName, numEditions);
       metaUriCallback(data.data);
       setNextStep();
    }

    const onChangeNumEditions = (ev) => {
        setNumEditions(ev.target.value);
    }
    
    const onNextHandler = () => {
        if(previewIndex < 10)
            setPreviewIndex(previewIndex+1);
    }

    const onPrevHandler = () => {
        if(previewIndex > 1)
            setPreviewIndex(previewIndex-1);
    }
  return (
    <div>
    <img src={`http://localhost:3001/images/${directoryName}/images/${previewIndex}.png`} alt="" style={{width:"500px", height: "400px"}}/>
    {/* <button>{`<`}</button>
    <button>{'>'}</button> */}
    <PrevNextButton nextButtonClick={onNextHandler} prevButtonClick={onPrevHandler}/>
    <StyledInput type="number" onChange={onChangeNumEditions} value={numEditions}/>
    <StyledButton onClick={submitGenImages}>Continue</StyledButton>

    </div>
  )
}

export default PreviewCard