import type { GroupImage, GroupStaffList, UserOfStaff } from '../types/api/staff.type'
import { getAccessTokenFromLS } from '../utils/auth'
import http from '../utils/http'

const accessToken = getAccessTokenFromLS()

const staffApi = {
  getUsers() {
    return http.get<UserOfStaff>('api/staff/users', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getUsersPendingLicense() {
    return http.get<UserOfStaff>('api/staff/documents/pending', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  // lấy danh sách group để duyệt
  getAllGroupStaff() {
    return http.get<GroupStaffList>('api/groups/staff/all')
  },
  // lấy hình ảnh group để duyệt
  getGroupImages(groupId: number) {
    return http.get<GroupImage[]>(`api/staff/vehicle-images/groups/${groupId}/images`)
  }
}

export default staffApi
