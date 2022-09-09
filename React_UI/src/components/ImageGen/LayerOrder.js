import React, {useState} from 'react'
import { StyledButton, StyledForm } from '../../AppStyles.styles.tw';

const LayerOrder = () => {
    const [initialLayers, setInitialLayers] = useState(['Background', 'Body tail', 'Eye Wear', 'Eyes', 'Hats', 'Mouth'])
    const [newLayers, setNewLayers] = useState([])


    const addToNewOrder = (item,idx) => {
        setNewLayers([...newLayers,item])
        var tempLayers = [...initialLayers]; 
        tempLayers.splice(idx,1);
        setInitialLayers(tempLayers)
    }

    const addToInitialOrder = (item,idx) => {
        setInitialLayers([...initialLayers,item])
        var tempLayers = [...newLayers]; 
        tempLayers.splice(idx,1);
        setNewLayers(tempLayers)
    }

  return (
    <div>
        <div className='min-h-[50%] mb-4 h-4/6 bg-white'>
            {
                newLayers.map((item,idx) => {
                    console.log("INDEX "+idx);
                    return (
                        <div>
                        <StyledButton key={item} onClick={()=>addToInitialOrder(item,idx)} className='ml-2 mb-2'> {item} </StyledButton>
                        </div>
                    )
                })
            }
        </div>
        <div>
        {
            initialLayers.map((item,idx) => {
                console.log("RENDER "+idx)
                return (
                <StyledButton key={item} onClick={()=>addToNewOrder(item,idx)} className='ml-2 mb-2'> {item} </StyledButton>
                )
            })
        }
        </div>
        <hr/>

        <StyledButton >Submit</StyledButton>
        
    </div>
  )
}

export default LayerOrder