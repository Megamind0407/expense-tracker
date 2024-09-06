const IncomeSchema = require("../models/IncomeModel")

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    console.log('Request received with data:', req.body);

    const income = new IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
    });

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        await income.save(); // Save to the database
        res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        console.error('Error while adding income:', error);  // Enhanced error logging
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) => {
            res.status(500).json({message: 'Server Error'})
        })
}