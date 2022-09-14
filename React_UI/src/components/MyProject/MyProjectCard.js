import React, {useState} from 'react'
import { useContractReads } from 'wagmi'

import { StyledForm, StyledInput, StyledLabel } from '../../AppStyles.styles.tw';
import { useParams } from 'react-router'
import { utils } from 'ethers';
import ToggleButton from './ToggleButton';

import ContractWriteButton from './ContractWriteButton';
import { simpleNftJson } from '../../contracts/SimpleNftJson';

const MyProjectCard = () => {
  // const { data: signer } = useSigner()
  const { contractId } = useParams()

  const initialTextInputData = [
    {name: "hiddenMetaUri", value: "", label: "Hidden Metadata URI ", readFunction: "hiddenMetadataUri", inputType: "text", writeFunction: "setHiddenMetadataUri"},
    {name: "metaURI", value: "", label: "Metadata URI ", readFunction: "uriPrefix", inputType: "text", writeFunction: "setUriPrefix"},
    {name:"price", value: 0.5, label: "Price ", readFunction:"cost", inputType: "number", writeFunction: "setCost"},
    {name: "maxMintAmount", value: 5, label: "Max Mint Amount ", readFunction: "maxMintAmountPerTx", inputType: "number", writeFunction: "setMaxMintAmountPerTx"},
    {name: "reveal", value: null, label: "Hide", readFunction: "revealed", inputType: "toggle", writeFunction: "setRevealed", falseLabel: "Reveal"},
    {name:"pause", value: null, label: "Unpause", readFunction:"paused", inputType: "toggle", writeFunction: "setPaused", falseLabel: "Pause"},
  ]

  const [textInputData, setTextInputData] = useState(initialTextInputData);
  const [isLoaded, setIsLoaded] = useState(false);

  /*Create Contract Object*/
  const simpleNftContract = {
    addressOrName: contractId,
    contractInterface: simpleNftJson.abi,
  }

  /*Set array with functions we need to read*/
  const contractReads = initialTextInputData.map((item, idx)=> {
    return (
      {
        ...simpleNftContract,
        functionName: item.readFunction,
      }
    )
  })

  /*Update initial values with data read from contract*/
  useContractReads({
    contracts: contractReads,
    onSuccess(data) {
      const newData =  textInputData.map((item,idx) =>{
        if(data[idx]._hex){
          item.name === 'price' ? item.value = utils.formatEther(data[idx]._hex) : item.value = Number(data[idx]._hex)  
        } else {
          item.value = data[idx];
        }
        // console.log(item)
        return item;  
      })
      setTextInputData(newData);
      setIsLoaded(true);
    },
  })

  const handleInputChange = (ev) => {
    
    const newInputData =  textInputData.map((inputField,idx) =>{
      if(inputField.inputType === 'number' && ev.target.value === ''){
        ev.target.value = 0;
      }
      if(inputField.name === ev.target.id){
        inputField.value = ev.target.value;
      }
      return inputField;  
    })
    setTextInputData(newInputData);
  }

  if(isLoaded){
    return (
      <StyledForm>
            {
            textInputData.map((inputField, index) => {
                if(!(inputField.inputType==='toggle')){
                  return (
                    <div key={inputField.name} className='flex justify-center mb-2'>
                      
                      <StyledLabel className='' htmlFor={inputField.name}>{inputField.label} : </StyledLabel>
                    
                      <StyledInput className="mr-2" onChange={handleInputChange} type={inputField.inputType} min="0" step=".1" name={inputField.name} id={inputField.name} value={inputField.value}/>
                    
                      <ContractWriteButton  writeFunction={inputField.writeFunction} args={inputField.name === 'price' ? utils.parseEther(inputField.value+"") : inputField.value}/>
    
                    </div>
                  )
              } else {
                return (
                    <div className='mb-2 '>
                        <ToggleButton className='w-40' buttonText={inputField.value === true ? inputField.label : inputField.falseLabel} writeFunction={inputField.writeFunction} args={!inputField.value}/>
                      </div>
                    
                )
              }
              })
            }
      </StyledForm>
      )
  } else {
    return <></>
  }

}

export default MyProjectCard