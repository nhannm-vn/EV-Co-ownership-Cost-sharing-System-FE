import { useParams } from 'react-router'
import adminApi from '../../../../../apis/admin.api'
import { useQuery } from '@tanstack/react-query'

export default function FeedbackCoOwner() {
  const { contractId } = useParams()
  const feedContractQuery = useQuery({
    queryKey: ['feedback-by-contract-id', contractId],
    queryFn: () => adminApi.getFeedbackByContractId(contractId ?? ''),
    enabled: !!contractId
  })

  console.log(feedContractQuery?.data?.data)

  return <div>hehe</div>
}
