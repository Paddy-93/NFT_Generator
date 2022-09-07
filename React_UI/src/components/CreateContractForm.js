import React, {useState} from 'react'
import { useSigner } from 'wagmi'

import { ContractFactory, utils } from 'ethers';
import { simpleNftJson } from '../contracts/SimpleNftJson';
import { StyledButton, StyledForm, StyledInput, StyledLabel } from '../AppStyles.styles.tw';


const CreateContractForm = () => {
    const { data: signer } = useSigner()

    const initialConstructors = [
      {name: "contractName", value: "", label: "Contract Name "},
      {name: "symbol", value: "", label: "Symbol "},
      {name: "metadata", value: "", label: "Metadata "},
      {name: "hiddenMetaData", value: "", label: "Hidden Metadata "},    
      {name:"price", value: ".05", label: "Price "},
      {name: "totalSupply", value: 10000, label: "Total Supply "},
      {name: "maxMintAmount", value: 5, label: "Max Mint Amount "}
    ]

    const [nftConstructors, setNftConstructors] = useState(initialConstructors);

    const handleCreateClick = async() => {
      const [contractName, symbol, metadata, hiddenMetaData, price, totalSupply, maxMintAmount] = nftConstructors;
      let factory = new ContractFactory(simpleNftJson.abi, simpleNftJson.bytecode, signer);

      debugger;
      let contract = await factory.deploy(contractName.value,symbol.value,utils.parseEther(price.value),totalSupply.value,maxMintAmount.value, hiddenMetaData.value, metadata.value, false);
      // console.log(contract.address);
      // console.log(contract.deployTransaction.hash);
      await contract.deployed()
    }

    const handleInputChange = (ev) => {
      const newConstructor =  nftConstructors.map((constructor,idx) =>{
        if(constructor.name === ev.target.id){
          constructor.value = ev.target.value;
        }
        return constructor;  
      })
      setNftConstructors(newConstructor);
    }

    return (
      <StyledForm>
            {
            nftConstructors.map((constructor, index) => {
                return (
                  <div key={constructor.name} className='flex justify-center mb-2'>
                    <StyledLabel className='' htmlFor={constructor.name}>{constructor.label} : </StyledLabel>
                    <StyledInput  onChange={handleInputChange} type="input" name={constructor.name} id={constructor.name} value={constructor.value}/>
                  </div>
                )
              })
            }
            <br/>
            <StyledButton className='place-content-center w-/12' onClick={handleCreateClick}>Create New NFT</StyledButton>
      </StyledForm>
      )
}

export default CreateContractForm

