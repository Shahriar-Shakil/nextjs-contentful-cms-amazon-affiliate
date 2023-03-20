import Link from 'next/link'
import ContentfulImage from '../ui/ContentfulImage'

export default function CategoriesCTA({ categories }) {
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
            <ul
              role='list'
              className='mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0  lg:space-x-4'
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
