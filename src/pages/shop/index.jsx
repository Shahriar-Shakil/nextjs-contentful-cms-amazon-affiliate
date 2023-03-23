import Layout from '@/components/layout'
import ShopLayout from '@/components/layout/ShopLayout'
import ProductCard from '@/components/products/ProductCard'
import Pagination from '@/components/ui/Pagination'
import { client } from '@/lib/contentful/client'
import { sortPrice } from '@/lib/utils'
import { staggerContainer } from '@/variants'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const ShopPage = ({ categories, products, total }) => {
  const router = useRouter()
  const { sort } = router.query

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
            <motion.div
              variants={staggerContainer(i)}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true }}
              key={product.fields.slug}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </ul>
        <Pagination total={12} currentPage={1} onChange={onChangePagination} />
      </ShopLayout>
    </Layout>
  )
}
export const getStaticProps = async () => {
  try {
    const response = await client.getEntries({ content_type: 'clothing' })
    const productResponse = await client.getEntries({
      content_type: 'product',
      limit: process.env.PAGINATION_LIMIT
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
    console.log(error)
    return {
      notFound: true
    }
  }
}
export default ShopPage
