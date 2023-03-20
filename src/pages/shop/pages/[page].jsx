import Layout from '@/components/layout'
import ShopLayout from '@/components/layout/ShopLayout'
import ProductCard from '@/components/products/ProductCard'
import Pagination from '@/components/ui/Pagination'
import { client } from '@/lib/contentful/client'
import { calculatePages, sortPrice } from '@/lib/utils'
import { useRouter } from 'next/router'

const ShopPage = ({ categories, products, total }) => {
  const router = useRouter()
  const { sort, page } = router.query
  let sortProduct = sort ? sortPrice(products, sort) : products

  let onChangePagination = page => {
    router.push(`/shop/pages/${page}`)
  }
  return (
    <Layout categories={categories}>
      <ShopLayout categories={categories}>
        <p className='mb-12 '>Showing {products?.length} results</p>
        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {sortProduct?.map((product, i) => (
            <ProductCard key={product.fields.slug} product={product} />
          ))}
        </ul>
        {/* pagination */}

        <Pagination
          total={total}
          currentPage={page}
          onChange={onChangePagination}
        />
      </ShopLayout>
    </Layout>
  )
}
export const getStaticProps = async ({ params }) => {
  const { page } = params
  try {
    const response = await client.getEntries({ content_type: 'clothing' })
    const productResponse = await client.getEntries({
      content_type: 'product',
      limit: process.env.PAGINATION_LIMIT,
      skip: process.env.PAGINATION_LIMIT * (page - 1)
    })
    return {
      props: {
        categories: response.items,
        products: productResponse.items,
        total: productResponse.total,
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
  const productResponse = await client.getEntries({
    content_type: 'product'
  })
  let totalPages = calculatePages(productResponse.total)
  let paths = Array.from({ length: totalPages }).map((e, idx) => {
    return { params: { page: (1 + idx).toString() } }
  })
  return {
    paths,
    fallback: false
  }
}
export default ShopPage
