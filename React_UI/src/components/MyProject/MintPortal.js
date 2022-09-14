import React, { useState } from 'react'
import { useParams } from 'react-router';
import { useContractRead } from 'wagmi';
import { StyledForm, StyledInput, StyledLabel } from '../../AppStyles.styles.tw'
import ContractWriteButton from './ContractWriteButton';
import { simpleNftJson  } from '../../contracts/SimpleNftJson';
import { utils } from 'ethers';

const MintPortal = () => {
  const [amountInput, setAmountInput] = useState(1);
  const [cost, setCost] = useState(.05)
  
  const { contractId } = useParams();

  const { data, isError, isLoading } = useContractRead({
    addressOrName: contractId,
    contractInterface: simpleNftJson.abi,
    functionName: 'cost',
    onSuccess(data) {
      setCost(utils.formatEther(data._hex));
      // console.log('Success', utils.formatEther(data._hex))
    },
  })

  const handleInputChange = (ev) => {
    setAmountInput(ev.target.value)
  }
  return (
    <StyledForm>
      <div className = 'flex justify-center mb-2'>
        <StyledLabel className='' htmlFor="amountInput">Mint Amount : </StyledLabel>
        <StyledInput  onChange={handleInputChange} type="input" name="amountInput" value={amountInput}/>
        
      </div>
      <ContractWriteButton buttonText='Mint' writeFunction="mint" args={amountInput} etherAmt={cost*amountInput}/>
    </StyledForm>
  )
}

export default MintPortal