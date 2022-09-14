import React, {useState} from 'react'
import { StyledButton, StyledForm } from '../AppStyles.styles.tw'
import CreateContractForm from '../components/ImageGen/CreateContractForm'
import FileUpload from '../components/ImageGen/FileUpload'
import LayerOrder from '../components/ImageGen/LayerOrder'
import PreviewCard from '../components/ImageGen/PreviewCard'


const ProjectCreate = () => {
 
  const [currentComponent, setCurrentComponent] = useState(0)
  const [layers, setLayers] = useState(null)
  const [directoryName, setDirectoryName] = useState(null)
  const [numEditions, setNumEditions]  = useState(10000)

  const setDataCallback = (layers, directoryName) => {
    setLayers(layers)
    if(directoryName != null) { setDirectoryName(directoryName) }
  }

  const setNextComp = () => {
    setCurrentComponent(currentComponent+1);
  }

  const STEPS = [
    <FileUpload setDataCallback={setDataCallback} setNextStep={setNextComp} />,
    <LayerOrder initLayers={layers} directoryName={directoryName} setNextStep={setNextComp} setData={setDataCallback}/>,
    <PreviewCard directoryName={directoryName} setNextStep={setNextComp}/>,
    <CreateContractForm layerOrder={layers} directory={directoryName} />,
  ]

  const setComponent = (index) => {
    if(currentComponent+index >=0 && currentComponent+index < STEPS.length)
      setCurrentComponent(currentComponent+index)
  }
  return (
    <StyledForm>
      {STEPS[currentComponent]}
      {/* <PreviewCard directoryName={"1663177506961>Racoons"}/> */}
      <button className='float-left' onClick={()=>setComponent(-1)}>Prev</button>
      <button className='float-right' onClick={()=>setComponent(+1)}>Next</button>
    </StyledForm>
  )
}

export default ProjectCreate