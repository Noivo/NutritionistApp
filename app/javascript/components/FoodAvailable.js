import React, {useState, useEffect} from 'react'

import Component from "./Component"
import Pagination from "./Pagination"


function FoodAvailable(props) {
    const [foodMatchList, setFoodMatchList] = useState([])

    useEffect(() => {
        const foodMatch = searchFoodMatch(props.foodListWithWords)
        setFoodMatchList(foodMatch)
    }, [props.foodListWithWords, props.foodWords])


    const searchFoodMatch = foodList => {
        return foodList.filter(food => compareSearchWithList(food)).map(foodMatch => props.foodListComplete.map(foodComplete => foodComplete.id === foodMatch.id && displayComponent(foodComplete)))
    }
    
    const compareSearchWithList = food => {
        const numberTrueForValidate = props.foodWords.length
        return food.name.filter(name => (props.foodWords.filter(searchWord => name.includes(searchWord.toLowerCase()))).length).length >= numberTrueForValidate
    }

    const displayComponent = ({id, name}) => { 
        return <Component key={id} id={id} name={name} componentList={props.componentList} setComponentList={props.setComponentList}/>
    }

    return(
        <>
            <Pagination foodMatchList={foodMatchList} foodListWithWords={foodListWithWords} foodWords={foodWords} componentList={props.componentList} 
              setComponentList={props.setComponentList} foodListComplete={foodListComplete}/>
      </>
    )
}

export default FoodAvailable

