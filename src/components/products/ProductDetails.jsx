import React, { useState } from 'react'
import Modal from '../ui/Modal'
import PriceComponent from '../ui/PriceComponent'

export default function ProductDetails({ product }) {
  const [open, setOpen] = useState(false)

  const { title, updateAt, affiliateLink, price } = product?.fields ?? {}
  return (
    <>
      <div className='space-y-2'>
        <h1 className='text-xl font-medium text-gray-900 '>{title}</h1>
        <div className='italic text-gray-900'>
          Amazon.com Price: <PriceComponent price={price} /> (as of {updateAt} -
          <button
            onClick={() => setOpen(true)}
            type='button'
            className='rounded  py-1 px-2 italic  text-indigo-600  hover:text-indigo-900'
          >
            Details
          </button>{' '}
          )
        </div>
      </div>
      <a
        target='_blank'
        href={affiliateLink}
        className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        rel='noreferrer'
      >
        Learn More
      </a>
      <Modal title='Details' open={open} setOpen={setOpen}>
        <p className='text-sm leading-5 text-left text-justify'>
          Product prices and availability are accurate as of the date/time
          indicated and are subject to change. Any price and availability
          information displayed on [relevant Amazon Site(s), as applicable] at
          the time of purchase will apply to the purchase of this product.
        </p>
      </Modal>
    </>
  )
}
