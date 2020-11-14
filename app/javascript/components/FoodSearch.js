import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import Pagination from "./Pagination"

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


function foodSearch(props) {
    const [foodSearch, setFoodSearch] = useState("");
    const [foodListUnique, setFoodListUnique] = useState([]);

    useEffect(() => {        
        setFoodListUnique(removeDuplicateFood(props.foodList))
    }, [props.mealList])

    const removeDuplicateFood = foodList => {
        const duplicatefoods =  verifyDuplicates(foodList, props.mealList)
        return (foodList.filter(food => !(duplicatefoods.includes(food.name))))
    }

    const verifyDuplicates = (foodList, mealList) => {
       return foodList.filter(element => mealList.some(food => element.name === food.food)).map(duplicate => duplicate.name)
    }
    
    const showPagination = foodSearch && <Pagination foodListUnique={foodListUnique} foodSearch={foodSearch} mealList={props.mealList} setMealList={props.setMealList}/>
    
    return(
            <Background>
              <Input type= 'text' value={foodSearch} onChange={e => setFoodSearch(e.target.value)} placeholder='Search for a food'>
              </Input> 
              {showPagination}                       
            </Background>

    )
}

export default foodSearch;