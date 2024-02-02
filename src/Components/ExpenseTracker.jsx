import React from 'react'

export default function ExpenseTracker({ Expense, income }) {
  
  return (
    <div>
      <div className='expense_income_sub-container'>
      <div className='income-con'>
        <span>income</span>
        <h3>${income ? income : 0}</h3>
      </div>

      <div className='expense-con'>
      <span>expense</span>
        <h3>${Expense ? Expense : 0}</h3>
        </div>
        </div>
    </div>
  )
}
