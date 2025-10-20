import type { CreateGroupMember, GroupCoOwnership } from '../types/api/group.type'
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
    return http.get<GroupCoOwnership>(`api/groups`)
  }
}

export default groupApi
