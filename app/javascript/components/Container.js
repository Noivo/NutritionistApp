import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import IngredientBoard from './IngredientBoard'
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

const RowsIngredients = styled.div`
    margin-top: 15px;
`

function Container() {
    const [mealList, setMealList] = useState([])

    useEffect( async() => {
        const requestMealList = await fetch("/meals.json")
        const parseJsonMealList = await requestMealList.json();
        setMealList(parseJsonMealList);
    }, [])

    const ingredientsSelectList = mealList && mealList.map(ingredient => 
    <MealList key={ingredient.id} id={ingredient.id} quantity={ingredient.quantity} measure={ingredient.measure} name={ingredient.ingredient} mealList={mealList} setMealList={setMealList}/>)

    return (
        <>
        <BackgroundWhite>
            <Card>
                <Header>
                    <Meal>Breakfast</Meal>
                    <Hours>7:00 AM</Hours>
                </Header>
                <RowsIngredients>
                    {ingredientsSelectList}
                    <IngredientBoard setMealList={setMealList} mealList={mealList}/>
                </RowsIngredients>
            </Card>
        </BackgroundWhite>

        </>
    )
}

export default Container