import React from 'react'
import { Link } from 'react-router-dom'
import { StyledNav } from '../styled'


const LINKS = [
    {to: "/new", text: "New Project"},
    {to: "/myproject", text: "My Project"}
  ]

const Navbar = () => {
  return (
    <StyledNav>
       
        { 
            LINKS.map((item, idx) => {
                return (
                    <span key={ idx } className="ml-3.5"> <Link exact to={item.to}>{ item.text } </Link> </span>
                )
            })
        }
        
    </StyledNav>
  )
}

export default Navbar