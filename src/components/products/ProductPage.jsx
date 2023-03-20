import React from 'react'
import RichText from '../RichText'
import ProductDetails from './ProductDetails'
import ProductImagesGallery from './ProductImagesGallery'
import RelatedProducts from './RelatedProducts'

export default function ProductPageContent({ product, relatedProducts }) {
  const { content } = product?.fields ?? {}
  return (
    <div className='mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8'>
      <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
        <div className='lg:col-span-5 lg:col-start-8'>
          <ProductDetails product={product} />
        </div>
        <div className='mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0'>
          <h2 className='sr-only'>Images</h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8'>
            <ProductImagesGallery product={product} />
          </div>
        </div>
        <div className='mt-8 lg:col-span-5'>
          {/* Product details */}
          <div className='mt-10'>
            <h2 className='text-sm font-medium text-gray-900'>Description</h2>

            <div className='prose prose-sm mt-4 text-gray-500'>
              <RichText content={content} />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    </div>
  )
}
