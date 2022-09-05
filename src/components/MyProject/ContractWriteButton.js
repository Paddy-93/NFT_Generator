import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { StyledButton } from '../../AppStyles.styles.tw';
import { simpleNftJson } from '../../contracts/SimpleNftJson';

function ContractWriteButton( { buttonText="Update", writeFunction, args,  }) {
  const { config } = usePrepareContractWrite({
    addressOrName: '0x528cbda59d3f7436d6223e946a358d6e71638275',
    contractInterface: simpleNftJson.abi,
    functionName: writeFunction,
    args: args
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
  const myFunct = writeFunction;
  const myArgs = args; 
  const checkClick = () => {
      console.log(writeFunction)
      console.log(args);
      debugger;
  }

  return (
    <StyledButton onClick={() => write()}>
        {buttonText}
      </StyledButton>
  )
}


export default ContractWriteButton;