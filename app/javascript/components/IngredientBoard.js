import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import {IconContext}  from "react-icons"
import { FaAngleUp } from "react-icons/fa"

import IngredientSearch from "./IngredientSearch"

const Place_Button = styled.div`
    display:flex;
    margin-top: 10px;
`

const PlusButton = styled.button`
    color: #3CB371;
    background: #FDFDFD;
    border: 2px solid #F5F5F5;
    height: 42px;
    width: 41px;
    font-size: 1.6em;
    border-left: none;

    &:focus{
        outline: none;
    } 
`
const OpenBar = styled.div`
    border: 2px solid #F5F5F5;
    flex-grow: 4;
     
`
const Placeholder = styled.div`
    color: #C8C8C8;
    margin: 10px 0px 10px 10px;
`

const SearchBar = styled.div`
    
`

function IngredientBoard(props) {
    const [show, setShow] = useState(false)
    const [ingredientsList, setIngredientsList] = useState([])

    useEffect( async() => {
        const requestIngredientsList = await fetch("/ingredients.json")
        const parseJsonIngredientsList = await requestIngredientsList.json();
        setIngredientsList(parseJsonIngredientsList)
    }, [])

    const displaySearchBar = show && 
        <IngredientSearch ingredientsList={ingredientsList} mealList={props.mealList} setMealList={props.setMealList}/>

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

export default IngredientBoard