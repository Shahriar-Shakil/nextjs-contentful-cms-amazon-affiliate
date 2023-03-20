import CategoriesCTA from '@/components/Categories/CategoriesCTA'
import FeaturedProducts from '@/components/FeaturedProducts'
import Layout from '@/components/layout'
import BlogSection from '@/components/posts/BlogSection'
import { client } from '@/lib/contentful/client'

const Homepage = ({ featuredProducts, categories, blogs }) => {
  return (
    <Layout categories={categories}>
      <FeaturedProducts featuredProducts={featuredProducts} />
      <CategoriesCTA categories={categories} />
      <BlogSection blogs={blogs} />
    </Layout>
  )
}
export const getStaticProps = async () => {
  try {
    const featuredProducts = await client.getEntries({
      'metadata.tags.sys.id[all]': 'featured',
      limit: 3
    })
    const categoriesResponse = await client.getEntries({
      content_type: 'clothing'
    })
    const response = await client.getEntries({ content_type: 'blogPost' })

    return {
      props: {
        featuredProducts: featuredProducts.items,
        categories: categoriesResponse.items,
        blogs: response.items,
        revalidate: 60
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }
}
export default Homepage
