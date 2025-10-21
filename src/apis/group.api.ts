import type { CreateGroupMember, GroupItem } from '../types/api/group.type'
import http from '../utils/http'

const groupApi = {
  CreateGroup: (body: FormData) => {
    return http.post<CreateGroupMember>('api/groups/with-vehicle', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // view group chỉ cần gửi lên accessToken là được
  viewGroup() {
    return http.get<GroupItem[]>('api/groups/my-groups')
  },

  // lấy thông tin mỗi group detail
  groupDetail(groupId: string) {
    return http.get<GroupItem>(`api/ownership-percentage/page-data/${groupId}`)
  },

  //  API handle id ở header khi  bấm groupDetail
  getGroupById(groupId: string) {
    return http.get<GroupItem>(`api/groups/${groupId}`)
  }
}

export default groupApi
