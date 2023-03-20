import Layout from '@/components/layout'
import ProductPageContent from '@/components/products/ProductPage'
import Skeleton from '@/components/ui/Skeleton'
import { client } from '@/lib/contentful/client'
import { useRouter } from 'next/router'

const ProductPage = ({ product, categories, relatedProducts }) => {
  const router = useRouter()
  return (
    <Layout categories={categories}>
      <section className=''>
        <div className='container'>
          <article className=''>
            {router.isFallback ? (
              <Skeleton />
            ) : (
              <>
                <ProductPageContent
                  product={product}
                  relatedProducts={relatedProducts}
                />
              </>
            )}
          </article>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const { productSlug } = params
  const response = await client.getEntries({
    content_type: 'product',
    'fields.slug': productSlug
  })
  const categoriesResponse = await client.getEntries({
    content_type: 'clothing'
  })
  // find related Products by using category IDs
  let categoryId = response?.items?.[0]?.fields.categories?.[0]?.sys.id
  let relatedProductResponse = await client.getEntries({
    links_to_entry: categoryId
  })

  if (!response?.items?.length) {
    return {
      redirect: {
        destination: '/shop',
        permanent: false
      }
    }
  }

  return {
    props: {
      product: response?.items?.[0],
      categories: categoriesResponse.items,
      relatedProducts: relatedProductResponse.items,
      revalidate: 60
    }
  }
}

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: 'product' })
  const paths = response.items.map(item => ({
    params: { productSlug: item?.fields?.slug }
  }))

  return {
    paths,
    fallback: true
  }
}

export default ProductPage
