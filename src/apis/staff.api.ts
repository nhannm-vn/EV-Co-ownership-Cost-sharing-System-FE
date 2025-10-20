import type { GroupStaffList, UserOfStaff } from '../types/api/staff.type'
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
  }
}

export default staffApi
