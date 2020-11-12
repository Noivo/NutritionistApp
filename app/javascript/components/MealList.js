import React from 'react'
import styled from 'styled-components'

import {IconContext}  from "react-icons"
import { FaTrash } from "react-icons/fa"

const IngredientText = styled.div`
    margin: 10px 0px 10px 10px;
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

const IngredientRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 2px solid #F5F5F5;
    margin-top: 10px;

    &:hover ${IngredientText}{
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

    const deleteIngredient = () => {
        props.setMealList(props.mealList.filter(ingredient => ingredient.ingredient !== props.name))

        fetch(`/meals/${props.id}.json`, {
            method: 'DELETE',      
         }).then(response => response.json()).catch(error => error)

    }
    return(
        <>
            <IngredientRow>
                <IngredientText>
                    {props.quantity} {props.measure} of {capitalize(props.name)}
                </IngredientText>
                <CenterIcon>
                    <TrashIcon onClick={deleteIngredient}>
                        <IconContext.Provider value={{ color: "#696363"}}>
                            <div>
                                <FaTrash/>
                            </div>
                        </IconContext.Provider>
                    </TrashIcon>  
                </CenterIcon>
            </IngredientRow>
        </>
    )
}

export default MealList