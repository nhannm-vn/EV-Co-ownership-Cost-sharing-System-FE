//function này giúp cho custom tiền trong page ownership ratio

export function formatPrice(price: number) {
  return (price / 1000000).toFixed(0)
}

export function formatPriceVN(price: number) {
  return price.toLocaleString('vi-VN')
}
