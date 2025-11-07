import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import userApi from '../../../../apis/user.api'
import Skeleton from '../../../../components/Skeleton'
import PendingComponent from './PendingComponent'
import SuccessComponent from './SuccessComponent'
import RejectedComponent from './RejectedComponent'

export default function PendingCheckout() {
  const { bookingId } = useParams<{ bookingId: string }>()

  const checkoutQuery = useQuery({
    queryKey: ['show-notification-checkout', bookingId],
    queryFn: () => userApi.showpageNotificationCheckout(bookingId as string),
    enabled: !!bookingId
  })
  if (checkoutQuery.isLoading) return <Skeleton />

  const data = checkoutQuery?.data?.data?.status
  console.log(data)

  const isPending = checkoutQuery?.data?.data?.status === 'PENDING'
  const isSuccess = checkoutQuery?.data?.data?.status === 'APPROVED'
  const isFailed = checkoutQuery?.data?.data?.status === 'REJECTED'

  return (
    <>
      {isPending && <PendingComponent />}
      {isSuccess && <SuccessComponent />}
      {isFailed && <RejectedComponent />}
    </>
  )
}
