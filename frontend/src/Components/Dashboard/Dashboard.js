import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { indian } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import Navigation from '../Navigation/Navigation';



function Dashboard() {
    const [active, setActive] = useState(1)
 
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()
    const [state, setState] = useState({
        userId: ''
    })
    useEffect(() => {
        setState({userId: localStorage.getItem('userid')})
            getIncomes()
            getExpenses()
        
    },[])


    return (
        <DashboardStyled>   
            <div className='flexj'>    
            <Navigation active={active} setActive={setActive}/>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                        <BoxContainer>
                        <div className="income">
                            <h2>Total Income</h2>
                            <p>{indian} {totalIncome()}</p>
                        </div>
                        <div className="expense">
                            <h2>TotalExpense</h2>
                            <p>{indian} {totalExpenses()}</p>
                        </div>
                        <div className="balance">
                            <h2>TotalBalance</h2>
                            <p>{indian} {totalBalance()}</p>
                        </div>
                        </BoxContainer>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p className="min-green">
                                {indian}{Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p className="min-green">
                                {indian}{Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p className="min-red">
                                {indian}{Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p className="min-red">
                                {indian}{Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
            </div>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
        .flexj{
            display: flex;
            justify-content: space-between;
        }
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income{
                    
                    background: #F6F9FC;
                    p{
                    color: var(--color-green);
                    opacity: 0.6;}
                }
                
                .expense{
                    background: #F6F9FC;
                    p{
                    color: red;
                    opacity: 0.6;
                }
            }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: black;
                        opacity: 1;
                        font-size: 3rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .min-red{
                    color: red;
                    opacity: 0.8;
                    font-weight: 600;
                    font-size: 1.6rem;
                }
                .min-green{
                    color: var(--color-green);
                    opacity: 0.8;
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  align-items: center;

  .income,
  .expense,
  .balance {
    text-align: center;
  }

  h2 {
    font-size: 1.2rem; /* Adjust the font size as needed */
  }

  p {
    font-size: 1rem; /* Adjust the font size as needed */
    font-weight: bold; /* Optional: Adjust the font weight as needed */
  }
`;


export default Dashboard