import Link from 'next/link'
import Avatar from '../ui/Avatar'
import ContentfulImage from '../ui/ContentfulImage'
import DateComponent from '../ui/DateComponent'
import BlogCard from './BlogCard'

export default function BlogSection({ blogs }) {
  return (
    <div className='bg-white py-16 sm:py-32'>
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
            <BlogCard key={post.fields.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
