import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { StyledButton } from '../../AppStyles.styles.tw';
import { simpleNftJson } from '../../contracts/SimpleNftJson';
import { useParams } from 'react-router'

function ContractWriteButton( { buttonText="Update", writeFunction, args  }) {

    const {contractId} = useParams();

    const { config } = usePrepareContractWrite({
        addressOrName: contractId,
        contractInterface: simpleNftJson.abi,
        functionName: writeFunction,
        args: [args]
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