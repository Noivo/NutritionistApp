import React from 'react'
import styled from 'styled-components'

import {IconContext}  from "react-icons"
import { FaTrash } from "react-icons/fa"

const FoodText = styled.div`
    margin: 10px 0px 10px 10px;
    color: #606060;
`

const PaddingTopTrash = styled.div`
    padding-top: 2px;
`

const TrashIcon = styled.button` 
    background-color: white;
    height: 27px;
    border: 1px solid #dad8d8;
    border-radius: 50%;
    margin-top: 6px;
    padding-top: 1px;
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

function ComponentList(props) {

    const deleteComponent = async() => {
        try{
            const deleteComponent = await fetch(`/meals/${props.mealId}/components/${props.id}.json`, {
                method: 'DELETE',      
             })
    
             deleteComponent && props.setComponentList(props.componentList.filter(food => food.name !== props.name))
        } catch(error) {console.log(error)}
    }

    return(
            <FoodRow>
                <FoodText>
                    {props.quantity} {props.measure} of {capitalize(props.name)}
                </FoodText>
                <CenterIcon>
                    <TrashIcon onClick={deleteComponent}>
                        <IconContext.Provider value={{ color: "#696363"}}>
                            <PaddingTopTrash>
                                <FaTrash/>
                            </PaddingTopTrash>
                        </IconContext.Provider>
                    </TrashIcon>  
                </CenterIcon>
            </FoodRow>
    )
}

export default ComponentList