import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import Component from "./Component"

import {IconContext}  from "react-icons"
import {FaForward, FaFastForward} from 'react-icons/fa'

const SquarePagination = styled.button`
    background: white;
    color: #696363;
    width: 30px;
    height: 30px;
    border-top: 2px solid #f0f1f2;
    border-bottom: 2px solid #f0f1f2;
    border-left: 1px solid #f0f1f2;
    border-right: 1px solid #f0f1f2;

    &:focus {
        outline: none;
    }

    &:hover {
        background: #f0f1f2;
    }

    &:first-child {
        border-left: 2px solid #f0f1f2;
    }
`

const IconPagination = styled.button`
    background: white;
    color: #696363;
    width: 30px;
    height: 30px;
    padding-top: 4px;
    border-top: 2px solid #f0f1f2;
    border-bottom: 2px solid #f0f1f2;
    border-left: 1px solid #f0f1f2;
    border-right: 1px solid #f0f1f2;

    &:focus {
        outline: none;
    }

    &:hover {
        background: #f0f1f2;
    }

    &:nth-last-child(2) {
        text-align: end;
    }

    &:nth-last-child(1) {
        border-right: 2px solid #f0f1f2;
    }
`

const FlexPagination = styled.div`
    display:flex;
    justify-content: flex-end;
    margin-right: 10px;
    margin-top: 20px;
`

function Pagination(props) {
    const [currentPage, setCurrentPage] = useState(1)
    const [foodPerPage, setFoodPerPage] = useState(5)
    const [matchFoodList, setMatchFoodList] = useState([]);
    const [previousPagination, setPreviousPagination] = useState(0);

    const pageNumbers = []
    const itemsRef = []

    useEffect(() => {
        const foodsMatch = foodSearchMatch(props.foodListUnique)
        setMatchFoodList(foodsMatch)
        updatePaginationLastFoodAdded(foodsMatch.length)
    }, [props.foodListUnique, props.foodSearch])

    useEffect(() => {
        if(itemsRef.length && itemsRef[previousPagination])  itemsRef[previousPagination].style.backgroundColor= "#fff";
        if(itemsRef.length && itemsRef[currentPage-1])  itemsRef[currentPage-1].style.backgroundColor= "#f0f1f2";
        setPreviousPagination(currentPage-1)
    },[itemsRef])

    const updatePaginationLastFoodAdded = (foodListSize) => {
        if(Math.ceil(foodListSize / foodPerPage) < currentPage) setCurrentPage(Math.ceil(foodListSize / foodPerPage))
    }

    const foodSearchMatch = foodList => {
        return foodList.filter(food => compareSearchWithList(food)).map(food => displayComponent(food))
    }
    
    const compareSearchWithList = food=> {
        return food.name.toLowerCase().includes(props.foodSearch.toLowerCase())
    }

    const displayComponent = ({id, name}) => { 
        return <Component key={id} id={id} name={name} componentList={props.componentList} setComponentList={props.setComponentList}/>
    }

    
    const renderFoods = () => {
        const indexOfLastFood = currentPage * foodPerPage;
        const indexOfFirstFood = indexOfLastFood - foodPerPage;
        const currentFood = matchFoodList.slice(indexOfFirstFood, indexOfLastFood);

        return currentFood.map((food, index) => {
           return  <div key={index}>{food}</div>
        });
    
    }
    
    for (let i = 1; i <= Math.ceil(matchFoodList.length / foodPerPage); i++) {
        pageNumbers.push(i)
    }

    const nextPage = () => {
        if(currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
            itemsRef[currentPage].focus()
        } else {
            setCurrentPage(1)
            itemsRef[0].focus()
        }
    }

    const lastPage = () => {
        setCurrentPage(pageNumbers.length)
        itemsRef[pageNumbers.length-1].focus()
        
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (

            <SquarePagination
                key={number}
                id={number}
                ref = {ref => itemsRef.push(ref)} 
                onClick={() => setCurrentPage(number)}
                >
                {number}
            </SquarePagination>
        );
        });

    const renderButtons = pageNumbers.length ? <> 
        <IconPagination onClick={nextPage}>
            <IconContext.Provider value={{ color: "#696363"}}>
                <div>
                    <FaForward/>
                </div>
            </IconContext.Provider>
        </IconPagination>        
        <IconPagination onClick={lastPage}>
            <IconContext.Provider value={{ color: "#696363"}}>
                <div>
                    <FaFastForward/>
                </div>
            </IconContext.Provider>
        </IconPagination>    
    </> : ""

    return(
        <>
        {renderFoods()}                
        <FlexPagination>
            {renderPageNumbers}
            {renderButtons}
        </FlexPagination>
      </>
    )
}

export default Pagination

