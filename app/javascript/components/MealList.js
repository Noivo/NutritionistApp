import React, {useState, useEffect} from 'react'

import Meal from './Meal'
import MealCreator from './MealCreator'

function MealList() {
    const [mealList, setMealList] = useState([])
    const [addMeal, setAddMeal] = useState(false)
    const [changeMeal, setChangeMeal] = useState(false)
    useEffect( () => {
        async function requestMealList(){
            try{
                const requestMealList = await fetch("/meals.json")
                const parseJsonMealList = await requestMealList.json();
                setMealList(parseJsonMealList);
            } catch(error) {console.log(error)}
        }
        requestMealList()
    }, [addMeal, changeMeal])

    const showMeals = mealList.length ? mealList.map(({id, name, hours, minutes, midday}) => 
    <Meal key={id} id={id} name={name} hours={hours} minutes={minutes} midday={midday} changeMeal={changeMeal} setChangeMeal={setChangeMeal} />) : ""

    return(
        <>
            {showMeals}
            <MealCreator setAddMeal={setAddMeal} addMeal={addMeal}/>
        </>
    )
}

export default MealList