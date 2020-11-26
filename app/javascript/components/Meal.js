import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {IconContext}  from "react-icons"
import { FaAngleDown, FaAngleUp, FaSave, FaTrash } from "react-icons/fa"

import FoodBoard from './FoodBoard'
import ComponentList from './ComponentList'
import Modal from './Modal'

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

const MealName = styled.div`
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
    width: 92%;
    height: 35px;
    margin-left: -15px;
`

const ButtonDeleteMeal = styled.button`
    float: right;
    background: #fff;
    border: none;
    width: 31px;
    font-size: 1.3em;
    margin: 5px 0px;
    padding-right: 0px;
    text-align: end;
    transition: all .2s ease-in-out;

    &:focus {
        outline: none;
    }
    &:hover { 
        transform: scale(1.1);
    }
`

const ButtonSaveMeal = styled.button`
    float: right;
    background: #fff;
    border: none;
    width: 31px;
    font-size: 1.3em;
    margin: 5px 0px;
    padding-right: 0px;
    text-align: end;
    transition: all .2s ease-in-out;
    
    &:focus {
        outline: none;
    }
    :hover { 
        transform: scale(1.1); 
    }
`

const NameMeal = styled.input`
    color: #87888a;
    border: none;

    &:focus{
        border-bottom: 1px dotted green;
    }
    
`

const HoursMeal = styled.input`
    color: #88898b;	
    border: none;
    width: 28px;
    text-align: end;

    &:focus{
        border-bottom: 1px dotted green;
    }
`

const MinutesMeal = styled.input`
    color: #88898b;	
    border: none;
    width: 28px;

    &:focus{
        border-bottom: 1px dotted green;
    }
`

const SelectMidday = styled.select `
    color: #88898b;	
    border: none;
`

const ColonSeparateTime = styled.span`
    color: #88898b;	
    font-size: 19px;
    height: 23px;
`

const TimeContainerMeal = styled.div`
    display: flex;
    align-items: center;
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

const saveDisk = <IconContext.Provider value={{ color: "#3CB371"}}>
<div>
    <FaSave/>
</div>
</IconContext.Provider> 

const deleteTrashCan = <IconContext.Provider value={{ color: "#3CB371"}}>
<div>
    <FaTrash/>
</div>
</IconContext.Provider> 

const middaylOptions = ["AM","PM"]
const selectMiddaylOptions = middaylOptions.map(value => <option value={value} key={value}>{value}</option>)

function DisplayComponentList(props) {
    return props.componentList.length ? props.componentList.map(({id, quantity, measure, name}) => 
        <ComponentList key={id} id={id} quantity={quantity} measure={measure} name={name} mealId={props.mealId} componentList={props.componentList} setComponentList={props.setComponentList}/>) : ""
}



function Meal({id, name, hours, minutes, midday, changeMeal, setChangeMeal}) {
    const [componentList, setComponentList] = useState([])
    const [showMealTab, setShowMealTab] = useState(false)
    const [mealName, setMealName] = useState(name)
    const [mealHours, setMealHours] = useState(String(hours))
    const [mealMinutes, setMealMinutes] = useState(String(minutes))
    const [mealMidday, setMealMidday] = useState(midday)
    const [modal, setModal] = useState(false)

    useEffect( () => {
        async function requestComponentList(){
            try{
                const requestComponentList = await fetch(`/meals/${id}/components.json`)
                const parseJsonComponentList = await requestComponentList.json();
                setComponentList(parseJsonComponentList);
            } catch(error) {console.log(error)}
        }
        requestComponentList()
    }, [])

    const showComponents = showMealTab && <Rowsfoods>
        <DisplayComponentList componentList={componentList} setComponentList={setComponentList} mealId={id}/>
        <FoodBoard setComponentList={setComponentList} componentList={componentList} mealId={id}/>
    </Rowsfoods>

    const changeShowMealTab = () => {setShowMealTab(!showMealTab)}

    const displayArrow = showMealTab ? arrowUp : arrowDown

    const updateMeal = async () => {
        const data = {name:mealName, hours: Number(mealHours), minutes: Number(mealMinutes), midday:mealMidday}
        try{  
            const requestMealAdd = await fetch(`/meals/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            requestMealAdd && setChangeMeal(!changeMeal)
        } catch(error) {console.log(error)}  
    }

    const deleteMeal = async () => {
        try{
            const deleteMeal = await fetch(`/meals/${id}.json`, {
                method: 'DELETE',      
             })
    
            deleteMeal && setChangeMeal(!changeMeal)
        } catch(error) {console.log(error)}
    }

    const showModal = modal && <Modal text={`Are you sure want delete ${mealName} meal?`} acceptText="Delete" cancelText="Cancel" acceptFunction={deleteMeal} setModal={setModal}/>



    return (
        <BackgroundWhite>
            <Card>            
                <Header>
                    <NameMeal value={mealName} onChange={e => setMealName(e.target.value)} placeholder="New Meal"></NameMeal>
                    <InvisibleHeaderDisplay onClick={changeShowMealTab}>{displayArrow}</InvisibleHeaderDisplay>
                    <TimeContainerMeal>
                        <HoursMeal value={mealHours} onChange={e => setMealHours(e.target.value)} maxLength="2" placeholder="00"></HoursMeal>
                        <ColonSeparateTime>:</ColonSeparateTime>
                        <MinutesMeal value={mealMinutes} onChange={e => setMealMinutes(e.target.value)} maxLength="2" placeholder="00"></MinutesMeal>
                        <SelectMidday value={mealMidday} onChange={e => setMealMidday(e.target.value)}>{selectMiddaylOptions}</SelectMidday>
                    </TimeContainerMeal>
                </Header>
                {showComponents}
                <InvisibleFooterDisplay onClick={changeShowMealTab}></InvisibleFooterDisplay>
                {showModal}
                <ButtonDeleteMeal onClick={() => setModal(!modal)}>{deleteTrashCan}</ButtonDeleteMeal>
                <ButtonSaveMeal onClick={updateMeal}>{saveDisk}</ButtonSaveMeal>
            </Card>
        </BackgroundWhite>
    )
}

Meal.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    midday: PropTypes.oneOf(["AM","PM"]),
    changeMeal: PropTypes.bool,
    setChangeMeal: PropTypes.func
  };
  
  export default Meal
