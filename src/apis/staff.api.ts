import type { ImageStatus } from '../pages/AdminDashboard/pages/CheckGroup/components/PopupImage/PropupImage'
import type { GroupImage, GroupStaffList, UserOfStaff } from '../types/api/staff.type'
import { getAccessTokenFromLS } from '../utils/auth'
import http from '../utils/http'

const accessToken = getAccessTokenFromLS()
type ReviewAction = 'APPROVE' | 'REJECT'

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

  reviewDocument(documentId: number, action: ReviewAction) {
    return http.post(
      `/api/staff/documents/review/${documentId}`,
      { action },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
  },

  getAllGroupStaff() {
    return http.get<GroupStaffList>('api/groups/staff/all')
  },
  // lấy hình ảnh group để duyệt
  getGroupImages(groupId: number) {
    return http.get<GroupImage[]>(`api/staff/vehicle-images/groups/${groupId}/images`)
  },

  // duyệt ảnh
  submitImageReview(groupId: number, body: { status: ImageStatus; reason?: string }) {
    return http.patch(
      `/api/staff/vehicle-images/groups/${groupId}/review`,
      body.reason ? body : { status: body.status }
    )
  }
}

export default staffApi
