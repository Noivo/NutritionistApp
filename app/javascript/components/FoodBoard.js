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
const iconArrowUp = <IconContext.Provider value={{ color: "#3CB371"}}>
    <div>
        <FaAngleUp/>
    </div>
    </IconContext.Provider> 

function DisplaySearchBar(props) {
    return props.show && <FoodSearch foodList={props.foodList} mealId={props.mealId} componentList={props.componentList} setComponentList={props.setComponentList}/>
}

function FoodBoard(props) {
    const [show, setShow] = useState(false)
    const [foodList, setFoodList] = useState([])

    useEffect( () => {
        async function requestFoodList(){
            const requestFoodList = await fetch("/foods.json")
            const parseJsonFoodList = await requestFoodList.json();
            setFoodList(parseJsonFoodList)
        }
        requestFoodList()
        
    }, [])

    const displayIconButton = show ? iconArrowUp : '+'

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
            <DisplaySearchBar show={show} foodList={foodList} mealId={props.mealId} componentList={props.componentList} setComponentList={props.setComponentList} />
        </>
    )
}

export default FoodBoard