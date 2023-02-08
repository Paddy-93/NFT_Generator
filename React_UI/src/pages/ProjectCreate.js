import React, {useState} from 'react'
import { StyledForm } from '../AppStyles.styles.tw'
import CreateContractForm from '../components/ImageGen/CreateContractForm'
import FileUpload from '../components/ImageGen/FileUpload'
import LayerOrder from '../components/ImageGen/LayerOrder'
import PreviewCard from '../components/ImageGen/PreviewCard'


const ProjectCreate = () => {
 
  const [currentComponent, setCurrentComponent] = useState(0)
  const [layers, setLayers] = useState(null)
  const [directoryName, setDirectoryName] = useState(null)
  const [metaUri, setMetaUri] = useState("");

  const setDataCallback = (layers, directoryName) => {
    setLayers(layers)
    if(directoryName != null) { setDirectoryName(directoryName) }
  }

  const setMetaCallback = (_metaUri) => {
    console.log(_metaUri);
    const baseUri  = _metaUri.substr(0, _metaUri.indexOf('/1'));
    setMetaUri(baseUri);
  }

  const setNextComp = () => {
    setCurrentComponent(currentComponent+1);
  }

  const STEPS = [
    <FileUpload setDataCallback={setDataCallback} setNextStep={setNextComp} />,
    <LayerOrder initLayers={layers} directoryName={directoryName} setNextStep={setNextComp} setData={setDataCallback}/>,
    <PreviewCard layerOrder={layers} directoryName={directoryName} setNextStep={setNextComp} metaUriCallback={setMetaCallback}/>,
    <CreateContractForm layerOrder={layers} directory={directoryName} contractMeta={metaUri}/>,
  ]

  return (
    <StyledForm>
      {STEPS[currentComponent]}
      {/* <PreviewCard directoryName={"1663177506961>Racoons"}/> */}
      {/* <button className='float-left' onClick={()=>setComponent(-1)}>Prev</button>
      <button className='float-right' onClick={()=>setComponent(+1)}>Next</button> */}
    </StyledForm>
  )
}

export default ProjectCreate