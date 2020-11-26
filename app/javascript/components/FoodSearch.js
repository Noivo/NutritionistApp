import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import FoodAvailable from "./FoodAvailable"

const Background = styled.div`
    background-color: #fafafb;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f1f2;
    border-right: 2px solid #f0f1f2;
    border-left: 2px solid #f0f1f2;
`

const Input = styled.input`
    width: calc(100% - 61px);
    margin: 20px 20px;
    border: 2px solid #f0f1f2;
    height: 40px;
    padding-left: 15px;
    color: #808284;

    &:focus{
        outline: none;
    } 
`

function ShowFoodAvailable(props){
    return props.foodWords && <FoodAvailable foodListWithWords={props.foodListWithWords} mealId={props.mealId} foodWords={props.foodWords} componentList={props.componentList} 
    setComponentList={props.setComponentList} foodListComplete={props.foodListComplete}/>
}

function FoodSearch(props) {
    const [foodWords, setFoodWords] = useState("");
    const [foodSearchInput, setFoodSearchInput] = useState("");
    const [foodListWithWords, setFoodListWithWords] = useState([]);
    const [foodListComplete, setFoodListComplete] = useState([]);

    useEffect(() => {        
        setFoodListWithWords(splitStringIntoWords(props.foodList))
    }, [props.componentList])

    const splitStringIntoWords = foodList => {        
        const singleFoods = removeDuplicateFood(foodList)
        saveSingleFoodList(singleFoods)
        return singleFoods.map(({id,name}) => ({id: id, name: name.replace(",", "").toLowerCase()}))
    }

    const saveSingleFoodList = singleFoods => {
        setFoodListComplete(singleFoods)
    }

    const removeDuplicateFood = foodList => {
        const duplicateFoods =  findDuplicates(foodList, props.componentList)
        return (foodList.filter(food => !(duplicateFoods.includes(food.name))))
    }

    const findDuplicates = (foodList, componentList) => {
       return foodList.filter(food => componentList.some(component => food.name === component.name)).map(duplicate => duplicate.name)
    }
    
    const splitInputStringIntoWords = newString => {
        setFoodSearchInput(newString)
        if (newString !== "") {
            const stringIntoWordsArray = newString.trim().split(/\s+/)
            setFoodWords(stringIntoWordsArray);
        } else {
            setFoodWords(newString)
        }        
    }

    return(
            <Background>
              <Input type= 'text' value={foodSearchInput} onChange={e => splitInputStringIntoWords(e.target.value) } placeholder='Search for a food'>
              </Input> 
              <ShowFoodAvailable foodListWithWords={foodListWithWords} mealId={props.mealId} foodWords={foodWords} componentList={props.componentList} 
              setComponentList={props.setComponentList} foodListComplete={foodListComplete}/>                      
            </Background>
    )
}

export default FoodSearch;