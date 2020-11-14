import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import FoodBoard from './FoodBoard'
import MealList from './MealList'


const BackgroundWhite = styled.div`
    background: white;
    margin: 10px;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 2px 2px #ccc;
    padding-bottom: 15px;
`
const Card = styled.div`
    margin: 20px 15px;
`

const Header = styled.div`
    font-size: 1.5em;    
    display: flex;
    justify-content: space-between;
`

const Meal = styled.div`
    color: #87888a;
`

const Hours = styled.div`
    color: #88898b;	
`

const Rowsfoods = styled.div`
    margin-top: 15px;
`

function Container() {
    const [mealList, setMealList] = useState([])

    useEffect( async() => {
        const requestMealList = await fetch("/meals.json")
        const parseJsonMealList = await requestMealList.json();
        setMealList(parseJsonMealList);
    }, [])

    const foodsSelectList = mealList && mealList.map(food => 
    <MealList key={food.id} id={food.id} quantity={food.quantity} measure={food.measure} name={food.food} mealList={mealList} setMealList={setMealList}/>)

    return (
        <>
        <BackgroundWhite>
            <Card>
                <Header>
                    <Meal>Breakfast</Meal>
                    <Hours>7:00 AM</Hours>
                </Header>
                <Rowsfoods>
                    {foodsSelectList}
                    <FoodBoard setMealList={setMealList} mealList={mealList}/>
                </Rowsfoods>
            </Card>
        </BackgroundWhite>

        </>
    )
}

export default Container