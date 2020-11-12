import React, {useState} from 'react'
import styled from 'styled-components'

const BackgroundFood = styled.div`
    display: flex;
    margin: 10px;
`
const AddButton = styled.button`
    background:  #00994d;
    color: white;
    margin-left: auto;
    border: none;
    width: 45px;
    font-size: 1.4em;
    display:none;

    &:focus {
        outline: none;
    }
`

const Row = styled.div`
    margin-right: 10px;
    margin-left: 20px;
    border-left: 2px solid #F5F5F5; 
    border-right: 2px solid #F5F5F5; 
    border-bottom: 1px solid #F5F5F5;
    border-top: 1px solid #F5F5F5;
    background: white;
    display: flex;

    &:first-child {
        border-top: 2px solid #F5F5F5;
    }
    &:last-child {
        border-bottom: 2px solid #F5F5F5;
    }
    &:hover {
        background: #effff5;
    }
    &:hover ${AddButton} {
        display: inline-block;
    }
`
const TextFood = styled.div`
 margin: 10px 10px 10px 24px;
    
`
const SelectMeasure = styled.select`
    width: 80px;
    padding-left: 10px;
    border: 2px solid #F5F5F5;
    border-left: none;

    &:focus{
        outline: none;
    } 
`

const InputAmount = styled.input`
    height: 32px;
    width: 40px;
    text-align: center;
    border: 2px solid #F5F5F5;

    &:focus {
        outline: none;
    }
`

const MEASURES = ["grams", "kilos"]
const options = MEASURES.map(value => <option value={value} key={value}>{value}</option>)

function IngredientAdd(props) {
    const [amount, setAmount] = useState("100");
    const [selectMeasure, setSelectMeasure] = useState("grams")

    const updateMealList = async () => {
        const requestMealList = await fetch("/meals.json")
        const parseJsonMealList = await requestMealList.json();
        props.setMealList(parseJsonMealList);
    }

    const addIngredient = async () => {
        const data = {ingredient:props.name, quantity:amount, measure: selectMeasure}  
        fetch(`/meals`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
         }).then(response => response.json())
        .then(() => updateMealList()).catch(error => error)

        updateMealList() 
        
    }
    
        return (   
            <>
                <Row>
                    <BackgroundFood>
                        <InputAmount value={amount} onChange={e => setAmount(e.target.value)}>
                        </InputAmount>
                        <SelectMeasure value={selectMeasure} onChange={e => setSelectMeasure(e.target.value)}>
                            {options}
                        </SelectMeasure>

                        <TextFood>
                            {props.name}
                        </TextFood>
                    </BackgroundFood>
                    < AddButton onClick={addIngredient}>+</AddButton>    
                </Row> 
            </>
        )
    
}

export default IngredientAdd