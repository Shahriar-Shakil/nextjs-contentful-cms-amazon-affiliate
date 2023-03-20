export function formatDate(dateString, options) {
  const { format } = new Intl.DateTimeFormat('en-US', options)
  return format(new Date(dateString))
}
export const sortPrice = (arr, order) => {
  if (order === 'price-asc') {
    return arr?.sort((a, b) => (a.fields.price > b.fields.price ? 1 : -1))
  } else if (order === 'price-dec') {
    return arr?.sort((a, b) => (a.fields.price > b.fields.price ? -1 : 1))
  }
}
export const calculatePages = totalItem => {
  let limit = process.env.PAGINATION_LIMIT || 6
  let totalPages = Math.ceil(totalItem / limit)
  console.log(limit)
  return totalPages
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
