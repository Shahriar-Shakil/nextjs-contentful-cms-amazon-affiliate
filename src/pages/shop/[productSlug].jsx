import ProductPageContent from '@/components/products/ProductPage'
import Skeleton from '@/components/ui/Skeleton'
import { client } from '@/lib/contentful/client'
import { useRouter } from 'next/router'

const ProductPage = ({ product }) => {
  const router = useRouter()

  return (
    <section className=''>
      <div className='container'>
        <article className=''>
          {router.isFallback ? (
            <Skeleton />
          ) : (
            <>
              <ProductPageContent product={product} />
            </>
          )}
        </article>
      </div>
    </section>
  )
}

export const getStaticProps = async ({ params }) => {
  const { productSlug } = params
  const response = await client.getEntries({
    content_type: 'product',
    'fields.slug': productSlug
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
