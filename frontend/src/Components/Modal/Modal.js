import React from 'react';
import styled from 'styled-components';

function Modal({ children, onClose }) {
    return (
        <ModalWrapper>
            <ModalContent>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {children}
            </ModalContent>
        </ModalWrapper>
    );
}

const ModalWrapper = styled.div`
    position: fixed;
    z-index: 2;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    position: relative;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    width: 400px;
`;

const CloseButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
`;

export default Modal;
