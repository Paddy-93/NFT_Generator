
import styled from "styled-components";

export const AppStyles = styled.div.attrs({
  className: "w-full h-screen bg-gray-100 p-2"
})``;

export const StyledForm = styled.div.attrs({
    className: 'w-4/12 mt-2.5 mx-auto bg-slate-200 p-6 rounded-3xl text-center content-center'
})``;

export const StyledLabel = styled.div.attrs({
    className: 'block text-gray-700 font-bold w-4/12 pt-2'
})``;


export const StyledSearchLabel = styled.label.attrs({
    className: 'ml-3.5  text-gray-700 font-bold pt-2'
})``;

export const StyledInput = styled.input.attrs({
    className: "w-fit rounded-xl text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
})``;

export const StyledButton = styled.button.attrs({
    className: 'content-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
})``;

