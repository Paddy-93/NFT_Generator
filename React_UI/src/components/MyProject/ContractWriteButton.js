import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { StyledButton } from '../../AppStyles.styles.tw';
import { simpleNftJson } from '../../contracts/SimpleNftJson';
import { useParams } from 'react-router'
import { utils } from 'ethers';

function ContractWriteButton( { buttonText="Update", writeFunction, args, etherAmt=0  }) {

    const {contractId} = useParams();

    const { config } = usePrepareContractWrite({
        addressOrName: contractId,
        contractInterface: simpleNftJson.abi,
        functionName: writeFunction,
        args: [args],
        overrides: {
          value: utils.parseEther(etherAmt+"")
        }
    })

    const handleClick =()=> {
      // console.log("ETEHER " + etherAmt);
    }

    const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return (
    <StyledButton onClick={() => write()}>
        {buttonText}
      </StyledButton>
  )
}


export default ContractWriteButton;