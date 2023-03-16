import Link from 'next/link'
import React from 'react'
import ContentfulImage from './ui/ContentfulImage'
import PriceComponent from './ui/PriceComponent'

export default function FeaturedProducts({ featuredProducts }) {
  return (
    <section className=''>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-3 md:grid-rows-2'>
        <div className='relative md:col-span-2 row-span-2 '>
          <Link href={featuredProducts?.[0].fields.slug}>
            <div className='absolute top-0 z-10 bg-white p-2  w-2/3'>
              <h2 className='text-xl line-clamp-1 '>
                {featuredProducts?.[0].fields.title}
              </h2>
              <PriceComponent price={featuredProducts?.[0].fields.price} />
            </div>
            <div className='aspect-w-3 aspect-h-2 hover:scale-y-105 transition-all	'>
              <ContentfulImage
                className='rounded-md'
                alt={`Cover Image for `}
                src={featuredProducts?.[0].fields.coverImage.fields.file.url}
                width={
                  featuredProducts?.[0].fields.coverImage.fields.file.details
                    .image.width
                }
                height={
                  featuredProducts?.[0].fields.coverImage.fields.file.details
                    .image.height
                }
              />
            </div>
          </Link>
        </div>
        <div className='relative'>
          <Link href={featuredProducts?.[1].fields.slug}>
            <div className='absolute top-0 z-10 bg-white p-2 w-2/3'>
              <h2 className='text-xl line-clamp-1'>
                {featuredProducts?.[1].fields.title}
              </h2>
              <PriceComponent price={featuredProducts?.[1].fields.price} />
            </div>
            <div className='aspect-w-3 aspect-h-2 hover:scale-y-105 transition-all'>
              <ContentfulImage
                className='rounded-md'
                alt={`Cover Image for `}
                src={featuredProducts?.[1].fields.coverImage.fields.file.url}
                width={
                  featuredProducts?.[1].fields.coverImage.fields.file.details
                    .image.width
                }
                height={
                  featuredProducts?.[1].fields.coverImage.fields.file.details
                    .image.height
                }
              />
            </div>
          </Link>
        </div>
        <div className='relative'>
          <Link href={featuredProducts?.[2].fields.slug}>
            <div className='absolute top-0 z-10 bg-white p-2 w-2/3'>
              <h2 className='text-xl line-clamp-1'>
                {featuredProducts?.[2].fields.title}
              </h2>
              <PriceComponent price={featuredProducts?.[2].fields.price} />
            </div>
            <div className='aspect-w-3 aspect-h-2 hover:scale-y-105 transition-all'>
              <ContentfulImage
                className='rounded-md'
                alt={`Cover Image for `}
                src={featuredProducts?.[2].fields.coverImage.fields.file.url}
                width={
                  featuredProducts?.[2].fields.coverImage.fields.file.details
                    .image.width
                }
                height={
                  featuredProducts?.[2].fields.coverImage.fields.file.details
                    .image.height
                }
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
