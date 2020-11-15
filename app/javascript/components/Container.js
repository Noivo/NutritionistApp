import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import FoodBoard from './FoodBoard'
import ComponentList from './ComponentList'

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
function DisplayComponentList(props) {
    return props.componentList.length ? props.componentList.map(({id, quantity, measure, name}) => 
        <ComponentList key={id} id={id} quantity={quantity} measure={measure} name={name} componentList={props.componentList} setComponentList={props.setComponentList}/>) : ""
}

function Container() {
    const [componentList, setComponentList] = useState([])

    useEffect( () => {
        async function requestComponentList(){
            try{
                const requestComponentList = await fetch("/components.json")
                const parseJsonComponentList = await requestComponentList.json();
                setComponentList(parseJsonComponentList);
            } catch(error) {console.log(error)}
        }
        requestComponentList()
    }, [])

    return (
        <BackgroundWhite>
            <Card>
                <Header>
                    <Meal>Breakfast</Meal>
                    <Hours>7:00 AM</Hours>
                </Header>
                <Rowsfoods>
                    <DisplayComponentList componentList={componentList} setComponentList={setComponentList}/>
                    <FoodBoard setComponentList={setComponentList} componentList={componentList}/>
                </Rowsfoods>
            </Card>
        </BackgroundWhite>
    )
}

export default Container