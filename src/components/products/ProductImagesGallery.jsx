import React from 'react'
import ContentfulImage from '../ui/ContentfulImage'
import { classNames } from '@/lib/utils'

export default function ProductImagesGallery({ product }) {
  const { photoGallery } = product?.fields ?? {}

  return (
    <>
      {photoGallery?.map((image, i) => {
        return (
          <div
            key={image.fields.title}
            className={classNames(
              i === 0 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
              'rounded-lg aspect-w-2 aspect-h-1 sm:aspect-w-2 sm:aspect-h-2'
            )}
          >
            <ContentfulImage
              className='object-contain'
              alt={`Cover Image for ${image.fields.title}`}
              src={image.fields.file.url}
              width={image.fields.file.details.image.width}
              height={image.fields.file.details.image.height}
            />
          </div>
        )
      })}
    </>
  )
}
