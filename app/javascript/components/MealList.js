import React from 'react'
import styled from 'styled-components'

import {IconContext}  from "react-icons"
import { FaTrash } from "react-icons/fa"

const FoodText = styled.div`
    margin: 10px 0px 10px 10px;
    color: #606060;
`

const TrashIcon = styled.button` 
    background-color: white;
    height: 27px;
    border: 1px solid #dad8d8;
    border-radius: 50%;
    margin-top: 6px;
    display:none;

    &:focus{
        outline: none;
}  
`
const CenterIcon = styled.div`
    text-align: center;
`

const FoodRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 2px solid #f0f1f2;
    margin-top: 10px;

    &:hover ${FoodText}{
        color: #C8C8C8;
    }
    &:hover ${TrashIcon} {
        display: inline-block;
    }
`
const capitalize = str => {
        return str.charAt(0).toLowerCase() + str.slice(1);
}

function MealList(props) {

    const deleteFood = () => {
        props.setMealList(props.mealList.filter(food => food.food !== props.name))

        fetch(`/meals/${props.id}.json`, {
            method: 'DELETE',      
         }).then(response => response.json()).catch(error => error)

    }
    return(
        <>
            <FoodRow>
                <FoodText>
                    {props.quantity} {props.measure} of {capitalize(props.name)}
                </FoodText>
                <CenterIcon>
                    <TrashIcon onClick={deleteFood}>
                        <IconContext.Provider value={{ color: "#696363"}}>
                            <div>
                                <FaTrash/>
                            </div>
                        </IconContext.Provider>
                    </TrashIcon>  
                </CenterIcon>
            </FoodRow>
        </>
    )
}

export default MealList