import React from 'react'

export default function MainBalance({MainBal}) {
  return (
    <div>
      <span className='main-balance-text'>main balance</span>
      <h2>{MainBal < 0 ? '-' : ''}${Math.abs(MainBal)}</h2>
    </div>
  )
}
