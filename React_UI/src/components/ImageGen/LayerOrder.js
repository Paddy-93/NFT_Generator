import React, {useState} from 'react'
import { StyledButton, StyledForm, StyledH1 } from '../../AppStyles.styles.tw';
import UploadService from "../../services/FileUploadService";

const LayerOrder = ({ initLayers, directoryName}) => {
    const [initialLayers, setInitialLayers] = useState(initLayers)
    const [newLayers, setNewLayers] = useState([])
    const [numEditions, setNumEditions] = useState(10000)


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

    const handleNumEditionChange = (ev) => {
        setNumEditions(ev.target.value);
    }

    const handleSubmit = () => {
        console.log("SUBMIT "+numEditions)      
        UploadService.genImages(newLayers, directoryName, numEditions);
    }


  return (
    <div>
        <StyledH1>Select Your Layer Order</StyledH1>
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
                return (
                <StyledButton key={item} onClick={()=>addToNewOrder(item,idx)} className='ml-2 mb-2'> {item} </StyledButton>
                )
            })
        }
        </div>
       <div>
           <label>Number of Images</label> <br/>
           <input onChange={handleNumEditionChange} type='number' min='0'>{}</input>
       </div>

        <StyledButton onClick={handleSubmit} >Submit</StyledButton>
        
    </div>
  )
}

export default LayerOrder