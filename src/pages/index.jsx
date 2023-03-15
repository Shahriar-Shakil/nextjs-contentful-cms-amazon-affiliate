import ProductCard from '@/components/products/ProductCard'
import { client } from '@/lib/contentful/client'

const Homepage = ({ products, res }) => {
  return (
    <section className='section'>
      <div className='container'>
        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {products.map((product, i) => (
            <ProductCard key={product.fields.slug} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: 'product' })
  return {
    props: {
      products: response.items,
      res: response,
      revalidate: 60
    }
  }
}
export default Homepage
