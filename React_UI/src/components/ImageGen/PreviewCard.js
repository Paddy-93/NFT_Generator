import React, { useState } from 'react'
import { StyledButton } from '../../AppStyles.styles.tw';
import PrevNextButton from '../PrevNextButton';

const PreviewCard = ({directoryName, setNextStep}) => {
    // const partialDirName = directoryName.split("?")[1];
    // console.log("NEW CARD "+directoryName);
    const [previewIndex, setPreviewIndex] = useState(1);
    
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
    <StyledButton onClick={setNextStep}>Continue</StyledButton>

    </div>
  )
}

export default PreviewCard