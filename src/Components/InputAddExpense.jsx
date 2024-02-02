import React from 'react'


export default function InputAddExpense({handleInput, handleInputTitle, handleAdd, expInput, titleInput}) {
  return (
    <div>
      <h4>Add Expense/Income</h4>

      <div>
      <span>Title:</span>
      <input  className='expense_income_inputs'  value={titleInput} placeholder='add title' onChange={handleInputTitle}   />
      </div>
          
          <div>
        <span>Amount:</span>
      <input  className='expense_income_inputs' placeholder='add Amount' value={expInput}  onChange={handleInput} type="number" />
      </div>
          <button type='number' style={{color:'white'}} onClick={handleAdd}>Enter</button>
    </div>
  )
}
