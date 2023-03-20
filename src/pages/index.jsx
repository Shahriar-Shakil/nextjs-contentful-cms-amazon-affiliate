import FeaturedProducts from '@/components/FeaturedProducts'
import Layout from '@/components/layout'
import { client } from '@/lib/contentful/client'

const Homepage = ({ featuredProducts, categories }) => {
  return (
    <Layout categories={categories}>
      <FeaturedProducts featuredProducts={featuredProducts} />
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
    return {
      props: {
        featuredProducts: featuredProducts.items,
        categories: categoriesResponse.items,
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
