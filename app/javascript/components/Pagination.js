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
const FOODPERPAGE = 5;

function Pagination(props) {
    const [currentPage, setCurrentPage] = useState(1)
    const [foodMatchList, setFoodMatchList] = useState([]);
    const [previousPagination, setPreviousPagination] = useState(0);

    const pageNumbers = []
    const pagesRef = []

    useEffect(() => {
        const foodMatch = searchFoodMatch(props.foodListWithWords)
        setFoodMatchList(foodMatch)
        updatePaginationLastComponentAdded(foodMatch.length)
    }, [props.foodListWithWords, props.foodWords])

    useEffect(() => {
        resetBackgroundOldPage();
        setBackgroundNewPage(); 
        setPreviousPagination(currentPage)
    },[pagesRef])

    const resetBackgroundOldPage = () => {
        if(pagesRef.length && pagesRef[previousPagination-1])  pagesRef[previousPagination-1].style.backgroundColor= "#fff"
    }

    const setBackgroundNewPage = () => {
        if(pagesRef.length && pagesRef[currentPage-1])  pagesRef[currentPage-1].style.backgroundColor= "#f0f1f2";
    }

    const updatePaginationLastComponentAdded = (foodListSize) => {
        if(foodMatchList.length && Math.ceil(foodListSize / FOODPERPAGE) < currentPage) updateCurrentPage(Math.ceil(foodListSize / FOODPERPAGE))
    }

    const searchFoodMatch = foodList => {
        return foodList.filter(food => compareSearchWithList(food)).map(foodMatch => props.foodListComplete.map(foodComplete => foodComplete.id === foodMatch.id && displayComponent(foodComplete)))
    }
    
    const compareSearchWithList = food => {
        const numberTrueForValidate = props.foodWords.length
        return food.name.filter(name => (props.foodWords.filter(searchWord => name.includes(searchWord.toLowerCase()))).length).length >= numberTrueForValidate
    }

    const displayComponent = ({id, name}) => { 
        return <Component key={id} id={id} name={name} componentList={props.componentList} setComponentList={props.setComponentList}/>
    }

    const updateCurrentPage = newCurrentPage => {
        if(newCurrentPage !== 0) {
            setPreviousPagination(currentPage)
            setCurrentPage(newCurrentPage)
        }
    }
    
    for (let i = 1; i <= Math.ceil(foodMatchList.length / FOODPERPAGE); i++) {
        pageNumbers.push(i)
    }

    const nextPage = () => {
        if(currentPage < pageNumbers.length) {
            updateCurrentPage(currentPage + 1);
            pagesRef[currentPage].focus()
        } else {
            updateCurrentPage(1)
            pagesRef[0].focus()
        }
    }

    const lastPage = () => {
        updateCurrentPage(pageNumbers.length)
        pagesRef[pageNumbers.length-1].focus()
        
    }

    const renderFoodsPerPage = () => {
        const indexOfLastFood = currentPage * FOODPERPAGE;
        const indexOfFirstFood = indexOfLastFood - FOODPERPAGE;        
        const currentFood = foodMatchList.slice(indexOfFirstFood, indexOfLastFood);

        return currentFood.map((food, index) => {
           return  <div key={index}>{food}</div>
        });
    
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (

            <SquarePagination
                key={number}
                id={number}
                ref = {ref => pagesRef.push(ref)} 
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
        {renderFoodsPerPage()}                
        <FlexPagination>
            {renderPageNumbers}
            {renderButtons}
        </FlexPagination>
      </>
    )
}

export default Pagination

