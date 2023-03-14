import Link from 'next/link'
import ContentfulImage from '../ui/ContentfulImage'
import PriceComponent from '../ui/PriceComponent'
import CategoriesLink from '../Categories/CategoriesLink'
import Router from 'next/router'
const ProductCard = ({ product }) => {
  const { title, slug, affiliateLink, coverImage, categories, price } =
    product.fields ?? {}
  const handleClick = e => {
    e.preventDefault()
    Router.push(`/shop/${slug}`)
  }
  return (
    <li
      onClick={handleClick}
      className='rounded overflow-hidden shadow-lg cursor-pointer'
    >
      <div className='pb-6 space-y-3'>
        <Link href={`/shop/${slug}`}>
          <div className='aspect-w-2 aspect-h-1 sm:aspect-w-3 sm:aspect-h-2'>
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
            {categories.length ? (
              <CategoriesLink categories={categories} />
            ) : (
              <></>
            )}
            <Link href={`/shop/${slug}`}>
              <h2
                title={title}
                className=' line-clamp-3 h-20  font-normal text-justify text-indigo-600 hover:text-indigo-700 pt-2'
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
    </li>
  )
}

export default ProductCard
