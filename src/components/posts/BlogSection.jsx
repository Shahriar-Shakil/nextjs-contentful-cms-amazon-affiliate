import Link from 'next/link'
import Avatar from '../ui/Avatar'
import ContentfulImage from '../ui/ContentfulImage'
import DateComponent from '../ui/DateComponent'

const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }
  // More posts...
]

export default function BlogSection({ blogs }) {
  console.log(blogs)
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            From the blog
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>
            Everything has beauty, but not everyone sees it
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {blogs.map(post => (
            <article
              key={post.fields.slug}
              className='relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80'
            >
              <ContentfulImage
                alt={`Cover Image for ${post.fields.title}`}
                src={post.fields.coverImage.fields.file.url}
                width={post.fields.coverImage.fields.file.details.image.width}
                height={post.fields.coverImage.fields.file.details.image.height}
                className='absolute inset-0 -z-10 h-full w-full object-cover'
              />

              <div className='absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40' />
              <div className='absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10' />

              <div className='flex gap-4 flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300'>
                <DateComponent dateString={post.fields.date} />

                <div className='-ml-4 flex items-center gap-x-4'>
                  <svg
                    viewBox='0 0 2 2'
                    className='-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50'
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <div className='flex gap-x-2.5'>
                    <Avatar
                      name={post.fields.author.fields.name}
                      picture={post.fields.author.fields.image}
                    />
                  </div>
                </div>
              </div>
              <h3 className='mt-3 text-lg font-semibold leading-6 text-white'>
                <Link href={`/blogs/${post.fields.slug}`}>
                  <span className='absolute inset-0' />
                  {post.fields.title}
                </Link>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
