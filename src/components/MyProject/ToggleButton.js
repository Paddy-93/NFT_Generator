import React from 'react'
import ContractWriteButton from './ContractWriteButton'

const ToggleButton = ( { buttonText, writeFunction, args}) => {
  return (
    <div>
        <ContractWriteButton buttonText={buttonText} writeFunction={writeFunction} args={args} />
    </div>
  )
}

export default ToggleButton