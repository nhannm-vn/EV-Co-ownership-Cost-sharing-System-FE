//function này giúp cho custom tiền trong page ownership ratio

export function formatPrice(price: number) {
  return (price / 1000000).toFixed(0)
}

export function formatPriceVN(price: number) {
  return price.toLocaleString('vi-VN')
}

export const formatToVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}
