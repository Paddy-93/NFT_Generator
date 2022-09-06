import React from 'react'
import { Link } from 'react-router-dom'
import { StyledNav } from '../styled'
import SearchContract from './SearchContract'


const LINKS = [
    {to: "/", text: "Home"},
    {to: "/new", text: "New Project"}
  ]

const Navbar = () => {
  return (
      <div>
    <StyledNav>
       
        { 
            LINKS.map((item, idx) => {
                return (
                    <span key={ idx } className="ml-3.5"> 
                    <Link exact to={item.to}>{ item.text } </Link> 
                    {idx != LINKS.length-1 ? ' |' : '' }
                    </span>
                )
            })
        }
        
    </StyledNav>
    <SearchContract/>
    </div>
  )
}

export default Navbar