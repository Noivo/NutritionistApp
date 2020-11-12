import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import IngredientAdd from "./IngredientAdd"
import Pagination from "./Pagination"

const Background = styled.div`
    background-color: #FDFDFD;
    padding-bottom: 20px;
`

const Input = styled.input`
    width: calc(100% - 61px);
    margin: 20px 20px;
    border: 2px solid #F5F5F5;
    height: 40px;
    padding-left: 15px;

    &:focus{
        outline: none;
    } 
`


function IngredientSearch(props) {
    const [ingredientSearch, setIngredientSearch] = useState("");
    const [ingredientsList, setIngredientsList] = useState([])

    useEffect(() => {        
        removeDuplicateIngredients(props.ingredientsList)
    }, [props.mealList])

    const removeDuplicateIngredients = ingredientsList => {
        const duplicateIngredients =  ingredientsList.filter(element => props.mealList.some(ingredient => element.name === ingredient.ingredient)).map(duplicate => duplicate.name)
        setIngredientsList(ingredientsList.filter(ingredient => !(duplicateIngredients.includes(ingredient.name))))
    }
    
    const showPagination = ingredientSearch && <Pagination /> 

    const dynamicSearch = () => {
        return ingredientsList.map(ingredient => ingredient.name.toLowerCase().includes(ingredientSearch.toLowerCase()) && 
        <IngredientAdd key={ingredient.id} id={ingredient.id} name={ingredient.name} mealList={props.mealList} setMealList={props.setMealList}/>)
    }

    const displayIngredients =  ingredientSearch ? dynamicSearch() : "" 
    
    return(
        <>
            <Background>
              <Input type= 'text' value={ingredientSearch} onChange={e => setIngredientSearch(e.target.value)} placeholder='Search for a food'>
              </Input>
              {displayIngredients}   
              {showPagination}                       
            </Background>
        </>
    )
}

export default IngredientSearch;

// useEffect( async() => {
//     const requestIngredientsList = await fetch("/ingredients.json")
//     const parseJsonIngredientsList = await requestIngredientsList.json();
//     setIngredientsList(parseJsonIngredientsList)
//     removeDuplicateIngredients(parseJsonIngredientsList)
// }, [props.mealList])