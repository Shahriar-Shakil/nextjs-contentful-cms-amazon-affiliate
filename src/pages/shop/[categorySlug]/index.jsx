import Layout from '@/components/layout'
import ShopLayout from '@/components/layout/ShopLayout'
import ProductCard from '@/components/products/ProductCard'
import Skeleton from '@/components/ui/Skeleton'
import { client } from '@/lib/contentful/client'
import { sortPrice } from '@/lib/utils'
import { useRouter } from 'next/router'

const ShopPage = ({ categories, products }) => {
  const router = useRouter()
  const { sort } = router.query
  let sortProduct = sort ? sortPrice(products, sort) : products
  return (
    <Layout categories={categories}>
      <ShopLayout categories={categories}>
        {router.isFallback ? (
          <Skeleton />
        ) : (
          <>
            <p className='mb-12 '>Showing {sortProduct?.length} results</p>

            <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {sortProduct.map((product, i) => (
                <ProductCard key={product.fields.slug} product={product} />
              ))}
            </ul>
          </>
        )}
      </ShopLayout>
    </Layout>
  )
}
export const getStaticProps = async ({ params }) => {
  const { categorySlug } = params
  try {
    const response = await client.getEntries({ content_type: 'clothing' })
    let findCategoryId = response.items?.find(
      item => item.fields.slug === categorySlug
    ).sys.id
    let productsResponse = await client.getEntries({
      links_to_entry: findCategoryId
    })
    return {
      props: {
        categories: response.items,
        products: productsResponse.items,
        revalidate: 60
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/shop',
        permanent: false
      }
    }
  }
}

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: 'clothing' })
  const paths = response.items.map(item => ({
    params: { categorySlug: item.fields.slug }
  }))
  return {
    paths,
    fallback: true
  }
}
export default ShopPage
