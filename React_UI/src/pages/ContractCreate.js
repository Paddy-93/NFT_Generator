import React, {useState} from 'react'
import { StyledButton, StyledForm } from '../AppStyles.styles.tw'
import CreateContractForm from '../components/CreateContractForm'
import FileUpload from '../components/ImageGen/FileUpload'
import LayerOrder from '../components/ImageGen/LayerOrder'

const ContractCreate = () => {

  
  const [currentComponent, setCurrentComponent] = useState(0);
  const [layers, setLayers] = useState(null)
  const [directoryName, setDirectoryName] = useState(null)

  const setDataCallback = (layers, directoryName) => {
    setLayers(layers)
    console.log("HERE DIRECTORY NAME IS " + directoryName)
    setDirectoryName(directoryName);
  }

  const setNextComp = () => {
    setCurrentComponent(currentComponent+1);
  }

  const STEPS = [
    <FileUpload setDataCallback={setDataCallback} setNextStep={setNextComp} />,
    <LayerOrder initLayers={layers} directoryName={directoryName} />
  ]
  
  const displaySelect = () => {
    console.log(layers)
  }

  const setComponent = (index) => {
    if(currentComponent+index >=0 && currentComponent+index < STEPS.length)
      setCurrentComponent(currentComponent+index)
  }
  return (
    <StyledForm>
      {STEPS[currentComponent]}
      <button className='float-left' onClick={()=>setComponent(-1)}>Prev</button>
      <button className='float-right' onClick={()=>setComponent(+1)}>Next</button>
    </StyledForm>
  )
}

export default ContractCreate