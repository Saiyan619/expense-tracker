import React from 'react'
import { IoMdClose } from 'react-icons/io';
 

export default function HistoryExpense({ TotalData, RadioType, handleDelete }) {

  return (
    <div>
          <h3>Transactions</h3>

      <div className='transaction-container'>
        {TotalData.map((items, index) => {
          return <div className='items-container' key={index}>
            <span  style={{ color: items.RadioType === 'expense' ? 'red' : 'green' }}>{items.RadioType}</span>
            <span>{items.Title ? items.Title : 'no title'}</span>
            <span>${parseFloat( items.Price)}</span>
           <div> <IoMdClose onClick={() => { handleDelete(items) }} /></div>
          </div>
        })}
      </div>
    </div>
  )
}
