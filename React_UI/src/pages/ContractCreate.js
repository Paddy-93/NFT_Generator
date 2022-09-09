import React, {useState} from 'react'
import { StyledForm } from '../AppStyles.styles.tw'
import CreateContractForm from '../components/CreateContractForm'
import FileUpload from '../components/ImageGen/FileUpload'
import LayerOrder from '../components/ImageGen/LayerOrder'

const ContractCreate = () => {
  const renderCard = () => {
    
  }
  const [selectedItems, setSelectedItems] = useState(null);
  const onSelect = (selectedItems) => {
    setSelectedItems(selectedItems)
  }
  const displaySelect = () => {
    // console.StyledForm
    debugger;
    console.log(selectedItems)
  }
  return (
    <StyledForm>
        <h1 className="text-center text-gray-700 text-2xl font-bold">Customize and Deploy a New Mintable NFT Contract</h1>
        {/* <FileUpload/> */}
        <LayerOrder/>
        <button onClick={displaySelect}>click me</button>

    </StyledForm>
  )
}

export default ContractCreate