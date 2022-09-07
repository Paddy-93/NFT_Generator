import React, { useState } from 'react'
import { StyledButton, StyledInput, StyledLabel, StyledSearchLabel } from '../AppStyles.styles.tw';
import { useNavigate } from "react-router-dom";

const SearchContract = () => {
    const [searchInput, setSearchInput] = useState('');
    let navigate = useNavigate(); 

    const routeChange = () =>{ 
      let path = `projects/${searchInput}`; 
      navigate(path);
    }

    const handleInputChange = (ev) => {
        setSearchInput(ev.target.value)
    }

  return (
    <span className='center align-center justify-center mb-2'>
        <StyledSearchLabel className='' htmlFor="searchInput">Find a Project : </StyledSearchLabel>
        <StyledInput  onChange={handleInputChange} placeholder="Contract Address" type="input" name="searchInput" id={"searchInput"} value={searchInput}/>
        <StyledButton onClick={routeChange} className='ml-2'>GO</StyledButton>

    </span>
  )
}

export default SearchContract