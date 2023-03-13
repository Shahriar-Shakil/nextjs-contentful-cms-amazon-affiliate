import Link from 'next/link'
// import Avatar from '../ui/Avatar'
// import DateComponent from '../ui/DateComponent'
import ContentfulImage from '../ui/ContentfulImage'
import image from '../../../public/product-image.jpg'
import Image from 'next/image'
import PriceComponent from '../ui/PriceComponent'
const ProductCard = ({ product }) => {
  const {
    title,
    slug,
    excerpt,
    author,
    affiliateLink,
    coverImage,
    category,
    price
  } = product.fields ?? {}
  // console.log(category)
  //   const productThumbnail = images?.[0]
  return (
    <div className='rounded overflow-hidden shadow-lg '>
      <div className='pb-6 space-y-4'>
        <Link href={`/shop/${slug}`}>
          <div className='aspect-w-2 aspect-h-1 sm:aspect-w-2 sm:aspect-h-2'>
            <ContentfulImage
              className='object-contain'
              alt={`Cover Image for ${title}`}
              src={coverImage.fields.file.url}
              width={coverImage.fields.file.details.image.width}
              height={coverImage.fields.file.details.image.height}
            />
          </div>
        </Link>

        <div className='space-y-4 px-6  '>
          <div className='space-y-2'>
            <Link
              className='uppercase text-center block text-stone-400'
              href='/ct'
            >
              {category}
            </Link>
            <Link href={`/shop/${slug}`}>
              <h2
                title={title}
                className='line-clamp-4 font-normal text-indigo-600 hover:text-indigo-700 pt-2'
              >
                {title}
              </h2>
            </Link>
          </div>
          <div className='text-center'>
            <PriceComponent price={price} />
          </div>
          <div className='text-center'>
            <a
              className='rounded-md bg-indigo-50 py-1.5 px-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100'
              href={affiliateLink}
              target='_blank'
              rel='noreferrer'
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
