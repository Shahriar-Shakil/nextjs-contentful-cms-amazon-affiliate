import { client } from '@/lib/contentful/client'
import PostCard from '@/components/posts/PostCard'
import Layout from '@/components/layout'

const Posts = ({ posts, categories }) => {
  return (
    <Layout categories={categories}>
      <section className=''>
        <div className='container'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10'>
            {posts.map((post, i) => (
              <PostCard key={post.fields.slug} post={post} />
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: 'blogPost' })
  const categoriesResponse = await client.getEntries({
    content_type: 'clothing'
  })

  return {
    props: {
      posts: response.items,
      categories: categoriesResponse.items,
      revalidate: 60
    }
  }
}

export default Posts
