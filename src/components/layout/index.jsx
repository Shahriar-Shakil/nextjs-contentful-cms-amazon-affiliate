import React from 'react'
import Header from './Header'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { fadeIn } from '@/variants'

const Layout = ({ children, categories }) => {
  return (
    <>
      <Header categories={categories} />
      <AnimatePresence
        mode='wait'
        initial={true}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.main
          variants={fadeIn('up')}
          initial='initial'
          animate='animate'
          exit='exit'
          className='container p-8'
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className='bg-stone-100 text-sm font-medium uppercase text-stone-400 px-8 py-4'>
        <div className='container'>
          <p>Footer</p>
        </div>
      </footer>
    </>
  )
}

export default Layout
