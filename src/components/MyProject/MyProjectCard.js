import React, {useState, useEffect} from 'react'
import { useSigner, useContractRead, useContractReads } from 'wagmi'

import { StyledButton, StyledForm, StyledInput, StyledLabel } from '../../AppStyles.styles.tw';
import { utils, BigNumber } from 'ethers';
import ToggleButton from './ToggleButton';

import ContractWriteButton from './ContractWriteButton';
import { simpleNftJson } from '../../contracts/SimpleNftJson';

const MyProjectCard = () => {
  const { data: signer } = useSigner()

  const initialTextInputData = [
    {name: "hiddenMetaUri", value: "", label: "Hidden Metadata URI ", readFunction: "hiddenMetadataUri", inputType: "text", writeFunction: "setHiddenMetadataUri"},
    {name: "metaURI", value: "", label: "Metadata URI ", readFunction: "uriPrefix", inputType: "text", writeFunction: "setUriPrefix"},
    {name:"price", value: 0.5, label: "Price ", readFunction:"cost", inputType: "number", writeFunction: "setCost"},
    {name: "maxMintAmount", value: 5, label: "Max Mint Amount ", readFunction: "maxMintAmountPerTx", inputType: "number", writeFunction: "setMaxMintAmountPerTx"},
    {name:"pause", value: null, label: "Paused ", readFunction:"paused", inputType: "toggle", writeFunction: "setPaused"},
    {name: "reveal", value: null, label: "Revealed ", readFunction: "revealed", inputType: "toggle", writeFunction: "setRevealed"}
    
  ]

  const [textInputData, setTextInputData] = useState(initialTextInputData);
  const [isLoaded, setIsLoaded] = useState(false);

  /*Create Contract Object*/
  const simpleNftContract = {
    addressOrName: '0x528cbda59d3f7436d6223e946a358d6e71638275',
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
  const { data, isError, isLoading } = useContractReads({
    contracts: contractReads,
    onSuccess(data) {
      const newData =  textInputData.map((item,idx) =>{
        console.log("IN HERE")
        if(data[idx]._hex){
          item.value = Number(data[idx]._hex) 
        } else {
          item.value = data[idx];
        }
        console.log(item)
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
              } else if(inputField.name === 'pause') {
                return (
                    <div><ToggleButton buttonText={inputField.value === true ? "Unpause" : "Pause"} writeFunction={inputField.writeFunction} args={!inputField.value}/></div>
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