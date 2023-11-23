// Transactions.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import Navigation from '../Navigation/Navigation';
import { InnerLayout } from '../../styles/Layouts';

function Transactions() {
  const { getIncomes, getExpenses, incomes, expenses } = useGlobalContext();
  const [transactions, setTransactions] = useState([]);
  const [active, setActive] = useState(1);

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getIncomes, getExpenses]);

  useEffect(() => {
    // Sort income and expense transactions separately based on the date
    const sortedIncomes = [...incomes].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const sortedExpenses = [...expenses].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Combine sorted income and expense transactions
    const allTransactions = [
      ...sortedIncomes.map((transaction) => ({ ...transaction, type: 'income' })),
      ...sortedExpenses.map((transaction) => ({ ...transaction, type: 'expense' })),
    ];

    // Sort all transactions based on the date
    const sortedAllTransactions = allTransactions.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setTransactions(sortedAllTransactions);
  }, [incomes, expenses]);

  return (
    <TransactionsStyled>
      <div className='flexj'>
        <Navigation active={2} setActive={setActive} />
        <InnerLayout>
        <h2>Transaction History</h2>
        <div className="space">
        <div className="row">
          <div className="transaction-group">
            <h3>Income</h3>
            {transactions
              .filter((transaction) => transaction.type === 'income')
              .map((transaction) => (
                <div key={transaction._id} className="transaction-item">
                  <p className="title">{transaction.title}</p>
                  <p className="amount-income">
                    {`+${transaction.amount}`}
                  </p>
                  <p className="date">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
          <div className="transaction-group">
            <h3>Expense</h3>
            {transactions
              .filter((transaction) => transaction.type === 'expense')
              .map((transaction) => (
                <div key={transaction._id} className="transaction-item">
                  <p className="title">{transaction.title}</p>
                  <p className="amount-expense">
                    {`-${Math.abs(transaction.amount)}`}
                  </p>
                  <p className="date">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        </div>
        </div>
        </InnerLayout>
      </div>
    </TransactionsStyled>
  );
}

const TransactionsStyled = styled.div`
  .flexj {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
    .space{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 2rem;
    }
  .row {
    display: flex;
    gap: 1rem;
  }

  .transaction-group {
    flex: 1;
  }

  .transaction-item {
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .title {
      font-weight: 600;
    }

    .amount-income {
      color: green;
    }

    .amount-expense {
        color: red;
      }

    .date {
      color: rgba(34, 34, 96, 0.6);
    }
  }
`;

export default Transactions;
