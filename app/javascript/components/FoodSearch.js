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
function ShowPagination(props){
    return props.foodSearch && <Pagination foodListUnique={props.foodListUnique} foodSearch={props.foodSearch} componentList={props.componentList} setComponentList={props.setComponentList}/>
}

function FoodSearch(props) {
    const [foodSearch, setFoodSearch] = useState("");
    const [foodListUnique, setFoodListUnique] = useState([]);

    useEffect(() => {        
        setFoodListUnique(removeDuplicateFood(props.foodList))
    }, [props.componentList])

    const removeDuplicateFood = foodList => {
        const duplicatefoods =  verifyDuplicates(foodList, props.componentList)
        return (foodList.filter(food => !(duplicatefoods.includes(food.name))))
    }

    const verifyDuplicates = (foodList, componentList) => {
       return foodList.filter(element => componentList.some(food => element.name === food.name)).map(duplicate => duplicate.name)
    }
    
    return(
            <Background>
              <Input type= 'text' value={foodSearch} onChange={e => setFoodSearch(e.target.value)} placeholder='Search for a food'>
              </Input> 
              <ShowPagination foodListUnique={foodListUnique} foodSearch={foodSearch} componentList={props.componentList} setComponentList={props.setComponentList} />                      
            </Background>
    )
}

export default FoodSearch;