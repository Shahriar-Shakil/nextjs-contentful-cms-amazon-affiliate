import React from 'react'
import Header from './Header'

const Layout = ({ children, categories }) => {
  return (
    <>
      <Header categories={categories} />
      <main className='container p-8'>{children}</main>

      <footer className='bg-stone-100 text-sm font-medium uppercase text-stone-400 px-8 py-4'>
        <div className='container'>
          <p>Footer</p>
        </div>
      </footer>
    </>
  )
}

export default Layout
