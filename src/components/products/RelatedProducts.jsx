import Link from 'next/link'
import ContentfulImage from '../ui/ContentfulImage'
import PriceComponent from '../ui/PriceComponent'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  }
  // More products...
]

export default function RelatedProducts({ relatedProducts }) {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          You may also like
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {relatedProducts.map(product => (
            <Link
              href={product.fields.slug}
              key={product.fields.slug}
              className='group relative'
            >
              <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200'>
                <ContentfulImage
                  src={product.fields.coverImage.fields.file.url}
                  alt={product.fields.coverImage.title}
                  className='h-full w-full object-cover object-center group-hover:opacity-75'
                  width={
                    product.fields.coverImage.fields.file.details.image.width
                  }
                  height={
                    product.fields.coverImage.fields.file.details.image.height
                  }
                />
              </div>
              <div className='mt-4  justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700 line-clamp-1'>
                    <Link href={`/${product.fields.href}`}>
                      {product.fields.title}
                    </Link>
                  </h3>
                </div>
                <PriceComponent price={product.fields.price} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
