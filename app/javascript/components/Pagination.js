import React, {useState} from 'react'
import styled from 'styled-components'

import {IconContext}  from "react-icons"
import {FaForward, FaFastForward} from 'react-icons/fa'

const SquaresPagination = styled.button`
    background: white;
    color: #696363;
    width: 30px;
    height: 30px;
    border-top: 2px solid #F5F5F5;
    border-bottom: 2px solid #F5F5F5;
    border-left: 1px solid #F5F5F5;
    border-right: 1px solid #F5F5F5;

    &:focus {
        outline: none;
        background: #F5F5F5;
    }

    &:hover {
        background: #F5F5F5;
    }

    &:first-child {
        border-left: 2px solid #F5F5F5;
    }
    &:last-child {
        border-right: 2px solid #F5F5F5;
    }
`

const FlexPagination = styled.div`
    display:flex;
    justify-content: flex-end;
    margin-right: 10px;
    margin-top: 20px;
`


function Pagination() {
    const [todos, setTodos] = useState(5)
    const [todosPerPage, setTodosPerPage] = useState(4)

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos / todosPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
    return (

        <SquaresPagination
        key={number}
        id={number}
        >
        {number}
        </SquaresPagination>
    );
    });

    return(
        <>        
        <FlexPagination>
          {renderPageNumbers}
          <SquaresPagination>
            <IconContext.Provider value={{ color: "#696363"}}>
                <div>
                    <FaForward/>
                </div>
            </IconContext.Provider>
        </SquaresPagination>        
          <SquaresPagination>
            <IconContext.Provider value={{ color: "#696363"}}>
                <div>
                    <FaFastForward/>
                </div>
            </IconContext.Provider></SquaresPagination>        
        </FlexPagination>
      </>
    );
}

export default Pagination


