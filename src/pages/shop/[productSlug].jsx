import PostBody from '@/components/posts/PostBody'
import PostHeader from '@/components/posts/PostHeader'
import RichText from '@/components/RichText'
import ContentfulImage from '@/components/ui/ContentfulImage'
import PreviewAlert from '@/components/ui/PreviewAlert'
import PriceComponent from '@/components/ui/PriceComponent'
import Skeleton from '@/components/ui/Skeleton'
import { client } from '@/lib/contentful/client'
import { useRouter } from 'next/router'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const ProductPage = ({ product, extra }) => {
  const router = useRouter()
  const {
    title,
    slug,
    excerpt,
    author,
    affiliateLink,
    coverImage,
    category,
    content,
    photoGallery,
    price
  } = product?.fields ?? {}
  return (
    <section className='section'>
      {/* {preview && <PreviewAlert />} */}
      <div className='container'>
        <article className=''>
          {router.isFallback ? (
            <Skeleton />
          ) : (
            <>
              <div className='mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8'>
                <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
                  <div className='lg:col-span-5 lg:col-start-8'>
                    <div className='flex justify-between'>
                      <h1 className='text-xl font-medium text-gray-900 '>
                        {title}
                      </h1>
                      <PriceComponent price={price} />
                    </div>
                    <a
                      target='_blank'
                      href={affiliateLink}
                      className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      rel='noreferrer'
                    >
                      Learn More
                    </a>
                    {/* Reviews */}
                  </div>

                  {/* Image gallery */}
                  <div className='mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0'>
                    <h2 className='sr-only'>Images</h2>

                    <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8'>
                      {photoGallery?.map((image, i) => {
                        return (
                          <div
                            key={image.fields.title}
                            className={classNames(
                              i === 0
                                ? 'lg:col-span-2 lg:row-span-2'
                                : 'hidden lg:block',
                              'rounded-lg aspect-w-2 aspect-h-1 sm:aspect-w-2 sm:aspect-h-2'
                            )}
                          >
                            <ContentfulImage
                              className='object-contain'
                              alt={`Cover Image for ${image.fields.title}`}
                              src={image.fields.file.url}
                              width={image.fields.file.details.image.width}
                              height={image.fields.file.details.image.height}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className='mt-8 lg:col-span-5'>
                    {/* Product details */}
                    <div className='mt-10'>
                      <h2 className='text-sm font-medium text-gray-900'>
                        Description
                      </h2>

                      <div className='prose prose-sm mt-4 text-gray-500'>
                        <RichText content={content} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </article>
      </div>
    </section>
  )
}

export const getStaticProps = async ({ params, preview = false }) => {
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
