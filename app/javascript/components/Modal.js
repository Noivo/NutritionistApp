import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ModalContainer = styled.div`
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    
`
const ModalHeader = styled.div`
    position:fixed;
    background: white;
    width: 60%;
    height: auto;
    top:50%;
    left:50%;
    border-radius: 5px;
    transform: translate(-50%,-150%);
`
const ModalText = styled.div`
    text-align: center;
    font-size: 1.2em;
    margin: 15px;
`

const ButtonFlex = styled.div`
    display:flex;
    justify-content: center;
    margin: 15px;
`

const ModalAcceptButton = styled.button`
    margin: 5px 15px;
    border: none;
    border-radius: 5px;
    background-color: #53b095;
    opacity:0.8;
    width: 60px;
    height: 25px;

    &:hover{
        opacity:1;
    }
`

const ModalRejectButton = styled.button`
    margin: 5px 15px;
    border: none;
    border-radius: 5px;
    opacity:0.8;
    width: 60px;
    height: 25px;

    &:hover{
        opacity:1;
    }
`

function Modal({text, acceptText, cancelText, acceptFunction, setModal}) {
    return (<>
        <ModalContainer onClick={() => setModal(false)}>
            <ModalHeader>
                <ModalText>{text}</ModalText>
                <ButtonFlex>
                    <ModalRejectButton onClick={() => setModal(false)} >{cancelText}</ModalRejectButton>
                    <ModalAcceptButton onClick={acceptFunction}>{acceptText}</ModalAcceptButton>
                </ButtonFlex>
            </ModalHeader>
        </ModalContainer>
        </>
    )
}
    
Modal.propTypes = {    
    text: PropTypes.string,
    acceptText: PropTypes.string,
    cancelText: PropTypes.string,
    acceptFunction: PropTypes.func,
    setModal: PropTypes.func
  };

export default Modal