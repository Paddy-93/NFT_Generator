import React from 'react'
import ContractWriteButton from './ContractWriteButton'

const ToggleButton = ( { buttonText, writeFunction, args}) => {
  return (
        <ContractWriteButton buttonText={buttonText} writeFunction={writeFunction} args={args} />

  )
}

export default ToggleButton