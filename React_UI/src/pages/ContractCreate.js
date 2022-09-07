import React from 'react'
import { StyledForm } from '../AppStyles.styles.tw'
import CreateContractForm from '../components/CreateContractForm'

const ContractCreate = () => {
  const renderCard = () => {
    
  }
  return (
    <StyledForm>
        <h1 className="text-center text-gray-700 text-2xl font-bold">Customize and Deploy a New Mintable NFT Contract</h1>
        <CreateContractForm />

    </StyledForm>
  )
}

export default ContractCreate