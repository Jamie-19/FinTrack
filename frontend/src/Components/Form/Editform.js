import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus, edit } from '../../utils/Icons';
import { useEffect } from 'react';

function EditForm({
    id,
    title: initialTitle,
    amount: initialAmount,
    date: initialDate,
    category: initialCategory,
    description: initialDescription,
    onClose,
    type
}) {
    const { editIncome, editExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: initialTitle,
        amount: initialAmount,
        date: new Date(initialDate), // Convert initialDate to a Date object
        category: initialCategory,
        description: initialDescription,
    });

    useEffect(() => {
        inputState.userId = localStorage.getItem('userid');
    }, []);

    const { title, amount, date, category, description } = inputState;

    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleDateChange = (selectedDate) => {
        setInputState({ ...inputState, date: selectedDate });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use the appropriate edit function based on the 'type'
        if (type === 'income') {
            editIncome(id, inputState);
        } else {
            editExpense(id, inputState);
        }

        // Close the modal
        onClose();
    };

    return (
        <EditFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id="date"
                    placeholderText="Select Date"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={handleDateChange}
                />
            </div>
            <div className="selects input-control">
                <select
                    required
                    value={category}
                    name="category"
                    id="category"
                    onChange={handleInput('category')}
                >
                    {type === 'income' ? (
                        <>
                    <option value=""  disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>
                    </>
                    ) : (
                        <>
                        <option value="" disabled>Select Option</option>
                            <option value="education">Education</option>
                            <option value="groceries">Groceries</option>
                            <option value="health">Health</option>
                            <option value="subscriptions">Subscriptions</option>
                            <option value="takeaways">Takeaways</option>
                            <option value="clothing">Clothing</option>
                            <option value="travelling">Travelling</option>
                            <option value="other">Other</option>
                            </>
                    )
                    }
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder="Description"
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Update'}
                    icon={edit}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </EditFormStyled>
    );
}

const EditFormStyled = styled.form`
display: flex;
flex-direction: column; 
gap: 2rem;
margin-right: 2rem;
background: white;
input, textarea, select{
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: .5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background:transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder{
        color: rgba(34, 34, 96, 0.4);
    }
}
.input-control{
    input{
        width: 100%;
    }
}

.selects{
    display: flex;
    justify-content: flex-end;
    select{
        color: rgba(34, 34, 96, 0.4);
        &:focus, &:active{
            color: rgba(34, 34, 96, 1);
        }
    }
}
.submit-btn{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    }
    button{
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover{
            background: var(--color-green) !important;
        }
    }
}
`;

export default EditForm;


