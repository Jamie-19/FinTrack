const { addExpense, getExpense, editExpense ,deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes,editIncome ,deleteIncome } = require('../controllers/income');
const { register,login } = require('../controllers/auth');
const router = require('express').Router();



 router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .put('/edit-income/:id', editIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .put('/edit-expense/:id', editExpense) 
    .post('/register', register)
    .post('/login', login)

module.exports = router