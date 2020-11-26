import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const NameMealNew = styled.input`
    color: #87888a;
    border: none;

    &:focus{
        border-bottom: 1px dotted green;
    }
    
`

const HoursNewMeal = styled.input`
    color: #88898b;	
    border: none;
    width: 28px;
    text-align: end;

    &:focus{
        border-bottom: 1px dotted green;
    }
`

const MinutesNewMeal = styled.input`
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
const CreateMealButton = styled.button`

    color: #53b095;
    background: #fff;
    border: none;
    font-size: 1.4em;
    
`
const ColonHours = styled.span`
    color: #88898b;	
    font-size: 19px;
    height: 23px;
`
const TimeContainer = styled.div`
    display: flex;
    align-items: center;
`

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

const middaylOptions = ["AM","PM"]
const selectMiddaylOptions = middaylOptions.map(value => <option value={value} key={value}>{value}</option>)

function MealCreator(props) {    
    const [name, setName] = useState("")
    const [hours, setHours] = useState("")
    const [minutes, setMinutes] = useState("")
    const [midday, setMidday] = useState(middaylOptions[0])
   
    const createMeal = async () => {
        const data = {name:name, hours: Number(hours), minutes: Number(minutes), midday:midday}
        try{  
            const requestMealAdd = await fetch(`/meals`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            requestMealAdd && props.setAddMeal(!props.addMeal)            
        } catch(error) {console.log(error)}    
    }

    const handleChangeInput = (e,set,inputName, maxLength) => {
        set(e.target.value);
        if(e.target.value && e.target.value.length === maxLength) inputName.focus();
    }

    const captureEnterCreateMeal = e => {
        if (e.key === 'Enter') {
            createMeal()
          }
    }

    return(
        <BackgroundWhite>
            <Card>            
                <Header>
                    <NameMealNew value={name} onChange={e => setName(e.target.value)} placeholder="New Meal"></NameMealNew>
                    <CreateMealButton onClick={createMeal}>+</CreateMealButton>
                    <TimeContainer>
                        <HoursNewMeal value={hours} onChange={e => handleChangeInput(e,setHours,inputMinutes,2)} maxLength="2" placeholder="00"></HoursNewMeal>
                        <ColonHours>:</ColonHours>
                        <MinutesNewMeal id="inputMinutes" value={minutes} onChange={e => handleChangeInput(e,setMinutes,inputMidday,2)} maxLength="2" placeholder="00"></MinutesNewMeal>
                        <SelectMidday id="inputMidday" value={midday} onChange={e => setMidday(e.target.value)} onKeyDown={e => captureEnterCreateMeal(e)}>{selectMiddaylOptions}</SelectMidday>
                    </TimeContainer>
                </Header>
    
            </Card>
        </BackgroundWhite>
    )
}

export default MealCreator