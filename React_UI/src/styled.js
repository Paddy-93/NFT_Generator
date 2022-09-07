import styled from 'styled-components';

export const StyledNav = styled.div`
    color: #074f6a !important;
    font-size: 25px;
    margin-top:1%;
    margin-bottom:1%;
    font-weight: 600;
    display: flex;


    a:link { 
        text-decoration: none;
        color: #074f6a;
    }

    /* A link that has been visited */
    a:visited {
        color: #074f6a;
    }
    a:hover { text-decoration: none; color: #ddd  }
    a:active { text-decoration: none; }
`

export const StyledSearch = styled.div`
    color: #074f6a !important;
    font-size: 35px;
    margin-bottom:1%;
    font-weight: bold;
    text-align:center;

`