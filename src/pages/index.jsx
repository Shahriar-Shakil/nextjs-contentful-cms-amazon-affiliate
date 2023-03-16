import FeaturedProducts from '@/components/FeaturedProducts'
import ProductCard from '@/components/products/ProductCard'
import ContentfulImage from '@/components/ui/ContentfulImage'
import { client } from '@/lib/contentful/client'

const Homepage = ({ featuredProducts }) => {
  return (
    <>
      <FeaturedProducts featuredProducts={featuredProducts} />
    </>
  )
}
export const getStaticProps = async () => {
  const featuredProducts = await client.getEntries({
    'metadata.tags.sys.id[all]': 'featured',
    limit: 3
  })
  return {
    props: {
      featuredProducts: featuredProducts.items,
      revalidate: 60
    }
  }
}
export default Homepage
