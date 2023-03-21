import Link from 'next/link'
import ContentfulImage from '../ui/ContentfulImage'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
export default function CategoriesCTA({ categories }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  }
  return (
    <div className='bg-white'>
      <div className='py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8'>
        <div className='flex items-center justify-between px-4 sm:px-6 lg:px-0'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Trending Categories
          </h2>
          <Link
            href='/shop'
            className='hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'
          >
            See everything
            <span aria-hidden='true'> &rarr;</span>
          </Link>
        </div>

        <div className='relative mt-8'>
          <div className='relative -mb-6 w-full overflow-x-auto pb-6'>
            <ul role='list' className='mx-4 '>
              <Carousel
                renderDotsOutside={true}
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition='all .5'
                transitionDuration={500}
                containerClass='carousel-container'
                removeArrowOnDeviceType={['tablet', 'mobile']}
                deviceType={''}
                dotListClass='custom-dot-list-style'
                itemClass='carousel-item-padding-40-px'
              >
                {categories.map(category => (
                  <li
                    key={category.fields.slug}
                    className='inline-flex w-64 flex-col text-center '
                  >
                    <div className='group relative'>
                      <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200'>
                        <ContentfulImage
                          src={category.fields.coverImage.fields.file.url}
                          alt={category.fields.coverImage.title}
                          className='h-full w-full object-cover object-center group-hover:opacity-75'
                          width={
                            category.fields.coverImage.fields.file.details.image
                              .width
                          }
                          height={
                            category.fields.coverImage.fields.file.details.image
                              .height
                          }
                        />
                      </div>
                      <div className='mt-6'>
                        <Link
                          href={`/shop/${category.fields.slug}`}
                          className='text-sm text-gray-500'
                        >
                          {category.fields.title}
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </Carousel>
            </ul>
          </div>
        </div>

        <div className='mt-12 flex px-4 sm:hidden'>
          <a
            href='#'
            className='text-sm font-semibold text-indigo-600 hover:text-indigo-500'
          >
            See everything
            <span aria-hidden='true'> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}
