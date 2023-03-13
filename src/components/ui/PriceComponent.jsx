import React from 'react'

export default function PriceComponent({ price }) {
  return <bdi className='font-bold leading-8 text-2xl'>${price}</bdi>
}
