import Link from 'next/link'
import React from 'react'

export default function CategoriesLink({ categories }) {
  return (
    <div>
      {categories?.map((category, i) => {
        return (
          <Link
            key={category.fields?.title}
            className='capitalize text-xs    text-stone-500'
            href={`/shop/categories/${category?.fields?.slug}`}
          >
            {i ? '|' : ''} {category.fields?.title}
          </Link>
        )
      })}
    </div>
  )
}
