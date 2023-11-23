const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date,userId}  = req.body

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        userId
    })

    try {
        //validations
        if(!title || !category ||  !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) => {
  const id = req.query.userid;

  try {

      const incomes = await ExpenseSchema.find({ userId: id }).sort({ createdAt: -1 });

      res.status(200).json(incomes);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
  }
};


exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

//edit expense
exports.editExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    try {
        const expense = await ExpenseSchema.findByIdAndUpdate(id, {
            title,
            amount,
            category,
            description,
            date,
        }, { new: true });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense Updated', expense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
