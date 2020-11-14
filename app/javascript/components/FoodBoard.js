import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import {IconContext}  from "react-icons"
import { FaAngleUp } from "react-icons/fa"

import FoodSearch from "./FoodSearch"

const Place_Button = styled.div`
    display:flex;
    margin-top: 10px;
`

const PlusButton = styled.button`
    color: #59b399;
    background: #fafafb;
    border: 2px solid #f0f1f2;
    height: 42px;
    width: 41px;
    font-size: 1.6em;
    border-left: none;

    &:focus{
        outline: none;
    } 
`
const OpenBar = styled.div`
    border: 2px solid #f0f1f2;
    flex-grow: 4;
     
`
const Placeholder = styled.div`
    color: #C8C8C8;
    margin: 10px 0px 10px 10px;
`

function foodBoard(props) {
    const [show, setShow] = useState(false)
    const [foodList, setFoodList] = useState([])

    useEffect( async() => {
        const requestfoodList = await fetch("/foods.json")
        const parseJsonfoodList = await requestfoodList.json();
        setFoodList(parseJsonfoodList)
    }, [])

    const displaySearchBar = show &&
        <FoodSearch foodList={foodList} mealList={props.mealList} setMealList={props.setMealList}/>

    const displayIconButton = show ? 
        <IconContext.Provider value={{ color: "#3CB371"}}>
            <div>
                <FaAngleUp/>
            </div>
        </IconContext.Provider> : '+'
        

    return(
        <>
            <Place_Button onClick={() => setShow(!show)}>
                <OpenBar>
                    <Placeholder>
                        Add new food
                    </Placeholder>
                </OpenBar>
                <PlusButton>
                    {displayIconButton}
                </PlusButton>
            </Place_Button>
            {displaySearchBar}
        </>
    )
}

export default foodBoard