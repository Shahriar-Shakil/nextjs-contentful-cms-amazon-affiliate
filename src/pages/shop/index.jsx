import ShopLayout from '@/components/layout/ShopLayout'
import ProductCard from '@/components/products/ProductCard'
import { client } from '@/lib/contentful/client'
import { sortPrice } from '@/lib/utils'
import { useRouter } from 'next/router'

const ShopPage = ({ categories, products }) => {
  const router = useRouter()
  const { sort } = router.query
  let sortProduct = sort ? sortPrice(products, sort) : products
  return (
    <ShopLayout categories={categories}>
      <p className='mb-12 '>Showing {products?.length} results</p>
      <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {sortProduct?.map((product, i) => (
          <ProductCard key={product.fields.slug} product={product} />
        ))}
      </ul>
    </ShopLayout>
  )
}
export const getStaticProps = async () => {
  try {
    const response = await client.getEntries({ content_type: 'clothing' })
    const productResponse = await client.getEntries({ content_type: 'product' })

    return {
      props: {
        categories: response.items,
        products: productResponse.items,
        revalidate: 60
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
export default ShopPage
