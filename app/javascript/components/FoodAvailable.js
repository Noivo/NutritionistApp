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
        return  foodList.map(food => compareSearchWithFood(food)).filter(array => checkAllMatchArray(array.name)).map(foodMatch => getCompleteFoods(props.foodListComplete, foodMatch))
    }
    
    const compareSearchWithFood = food => {
        return ({id:food.id, name: props.foodWords.map(searchWord => food.name.includes(searchWord.toLowerCase()))})
    }

    const checkAllMatchArray = matchArray => {
        return matchArray.every(element => element)
    }

    const getCompleteFoods = (foodListComplete, foodMatch) => {
        return foodListComplete.map(foodComplete => foodComplete.id === foodMatch.id && displayComponent(foodComplete))
    }

    const displayComponent = ({id, name}) => { 
        return <Component key={id} id={id} name={name} componentList={props.componentList} setComponentList={props.setComponentList}/>
    }

    return(
        <>
            <Pagination foodMatchList={foodMatchList}/>
      </>
    )
}

export default FoodAvailable

