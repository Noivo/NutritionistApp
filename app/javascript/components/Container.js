import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import {IconContext}  from "react-icons"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

import FoodBoard from './FoodBoard'
import ComponentList from './ComponentList'

const BackgroundWhite = styled.div`
    background: white;
    margin: 10px;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 2px 2px #ccc;
`
const Card = styled.div`
    margin: 20px 15px 35px 15px;
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

const InvisibleHeaderDisplay = styled.div`
    flex-grow: 2;
    text-align: center;
`
const InvisibleFooterDisplay = styled.div`
    position: absolute;
    width: 98%;
    height: 35px;
    margin-left: -15px;
`

const arrowDown = <IconContext.Provider value={{ color: "#3CB371"}}>
<div>
    <FaAngleDown/>
</div>
</IconContext.Provider> 

const arrowUp = <IconContext.Provider value={{ color: "#3CB371"}}>
<div>
    <FaAngleUp/>
</div>
</IconContext.Provider> 

function DisplayComponentList(props) {
    return props.componentList.length ? props.componentList.map(({id, quantity, measure, name}) => 
        <ComponentList key={id} id={id} quantity={quantity} measure={measure} name={name} componentList={props.componentList} setComponentList={props.setComponentList}/>) : ""
}

function Container() {
    const [componentList, setComponentList] = useState([])
    const [showMealTab, setShowMealTab] = useState(false)

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

    const showComponents = showMealTab && <Rowsfoods>
        <DisplayComponentList componentList={componentList} setComponentList={setComponentList}/>
        <FoodBoard setComponentList={setComponentList} componentList={componentList}/>
    </Rowsfoods>

    const changeShowMealTab = () => {setShowMealTab(!showMealTab)}

    const displayArrow = showMealTab ? arrowUp : arrowDown

    return (
        <BackgroundWhite>
            <Card>            
                <Header>
                    <Meal>Breakfast</Meal>
                    <InvisibleHeaderDisplay onClick={changeShowMealTab}>{displayArrow}</InvisibleHeaderDisplay>
                    <Hours>7:00 AM</Hours>
                </Header>
                {showComponents}
                <InvisibleFooterDisplay onClick={changeShowMealTab}></InvisibleFooterDisplay>
            </Card>
        </BackgroundWhite>
    )
}

export default Container