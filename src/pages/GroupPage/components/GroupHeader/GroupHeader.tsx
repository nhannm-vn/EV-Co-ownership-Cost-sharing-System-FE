import { useQuery } from '@tanstack/react-query'
import type { GroupItem } from '../../../../types/api/group.type'
import groupApi from '../../../../apis/group.api'

export default function GroupHeader({ groupId }: { groupId?: string }) {
  const idGroupQuery = useQuery({
    queryKey: ['id-groups', groupId],
    queryFn: () => groupApi.getGroupById(groupId as string),
    enabled: !!groupId
  })

  const group: GroupItem = idGroupQuery?.data?.data as GroupItem
  return (
    <>
      <div className='text-center text-white'>
        Group Name:
        <h1 className=' m-1 text-3xl font-bold text-white drop-shadow-[0_0_20px_rgba(6,182,212,0.7)] mb-2'>
          {group?.groupName?.toUpperCase()}
        </h1>
      </div>
    </>
  )
}
