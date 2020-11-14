import React, {useState} from 'react'
import styled from 'styled-components'

import arrow from '../../assets/images/arrow2.png'

const BackgroundFood = styled.div`
    display: flex;
    margin: 10px;
`
const AddButton = styled.button`
    background:  #53b095;
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
    border-left: 2px solid #f0f1f2; 
    border-right: 2px solid #f0f1f2; 
    border-bottom: 1px solid #f0f1f2;
    border-top: 1px solid #f0f1f2;
    background: white;
    display: flex;
    

    &:nth-child(2) {
        border-top: 2px solid #f0f1f2;
    }

    &:nth-last-child(2) {
        border-bottom: 2px solid #f0f1f2;
    }
    &:hover {
        background: #f7fffc;
    }
    &:hover ${AddButton} {
        display: inline-block;
    }
`
const TextFood = styled.div`
 margin: 10px 10px 10px 24px;
 color: #717475;
    
`
const SelectMeasure = styled.select`
    width: 90px;
    padding-left: 10px;
    border: 2px solid #f0f1f2;
    border-left: none;
    color: #717475;

    background: url(${arrow}) no-repeat right #fff;
    -webkit-appearance: none;
    background-position-x: 90%;
    background-size: 20px 20px;

    &:focus{
        outline: none;
    } 
`

const InputAmount = styled.input`
    height: 32px;
    width: 40px;
    text-align: center;
    border: 2px solid #f0f1f2;
    color: #717475;

    &:focus {
        outline: none;
    }
`

const MEASURES = ["grams", "kilos"]
const options = MEASURES.map(value => <option value={value} key={value}>{value}</option>)

function foodAdd(props) {
    const [amount, setAmount] = useState("100");
    const [selectMeasure, setSelectMeasure] = useState("grams")

    const updateMealList = async () => {
        const requestMealList = await fetch("/meals.json")
        const parseJsonMealList = await requestMealList.json();
        props.setMealList(parseJsonMealList);
    }

    const addfood = async () => {
        const data = {food:props.name, quantity:amount, measure: selectMeasure}  
        fetch(`/meals`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
         }).then(response => response.json())
        .then(() => updateMealList()).catch(error => error)
        
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
                < AddButton onClick={addfood}>+</AddButton>  
            </Row> 
            </>
        )
    
}

export default foodAdd