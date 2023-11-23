const IncomeSchema= require("../models/IncomeModel")
const mongoose = require('mongoose');


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date,userId}  = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        userId
    })

    try {
        //validations
        if(!title || !category || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}
exports.getIncomes = async (req, res) => {
    const id = req.query.userid;

    try {

        const incomes = await IncomeSchema.find({ userId: id }).sort({ createdAt: -1 });

        res.status(200).json(incomes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}


//edit income
exports.editIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        const income = await IncomeSchema.findByIdAndUpdate(id, {
            title,
            amount,
            category,
            description,
            date,
        }, { new: true });

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income Updated', income });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

