import { useQuery } from '@tanstack/react-query'
import adminApi from '../../../../apis/admin.api'
import { useNavigate } from 'react-router'
import Skeleton from '../../../../components/Skeleton'

export default function EditContract() {
  const navigate = useNavigate()
  const allContractQuery = useQuery({
    queryKey: ['all-contracts-for-edit'],
    queryFn: () => adminApi.getContractsForEdit()
  })

  // Sample data - replace with your API data
  const contracts = allContractQuery?.data?.data || []
  console.log(contracts)

  //
  const handleViewFeedback = ({
    contractId,
    groupId,
    groupName
  }: {
    contractId: string
    groupId: string
    groupName: string
  }) => {
    navigate(`/manager/feedbackCo-Owner/${contractId}/${groupId}/${groupName}`)
  }

  if (allContractQuery.isLoading) return <Skeleton />

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>Contract Editing</h1>

        <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                  Contract ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                  Group Name
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                  Start Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                  End Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                  status
                </th>

                <th className=' text-start px-6 text-xs font-medium text-gray-700 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {contracts.map((contract) => (
                <tr key={contract.id} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>#{contract.id}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{contract.groupName}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    {new Date(contract.startDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    {new Date(contract.endDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{contract.approvalStatus}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm'>
                    <div className='flex justify-end gap-2'>
                      <button
                        className='px-3 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors'
                        onClick={() =>
                          handleViewFeedback({
                            contractId: contract.id.toString(),
                            groupId: contract.groupId.toString(),
                            groupName: contract.groupName.toString()
                          })
                        }
                      >
                        View Feedback
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
