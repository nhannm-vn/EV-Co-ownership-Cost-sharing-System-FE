// file chứa những method call api cho user/co-owner

import type { CheckoutForm } from '../pages/GroupPage/pages/CheckOut/CheckOut'
import type {
  CreateVotingPayload,
  CreateVotingResponse,
  GetAllNotifications,
  UploadImage,
  UserGetProfile,
  Voting,
  VotingSubmitPayload,
  VotingSubmitResponse
} from '../types/api/user.type'
import { getAccessTokenFromLS } from '../utils/auth'
import http from '../utils/http'

const accessToken = getAccessTokenFromLS()

const userApi = {
  //api giup lay thong tin user ve
  getProfile() {
    return http.get<UserGetProfile>('api/user/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  uploadLicense(frontFile: File, backFile: File) {
    const accessToken = getAccessTokenFromLS()
    const formData = new FormData()

    formData.append('documentType', 'DRIVER_LICENSE')
    formData.append('frontFile', frontFile)
    formData.append('backFile', backFile)

    return http.post<UploadImage>('api/user/documents/upload-batch', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  //api giup upload CCCD
  uploadCitizenId(frontFile: File, backFile: File) {
    const accessToken = getAccessTokenFromLS()
    const formData = new FormData()

    formData.append('documentType', 'CITIZEN_ID')
    formData.append('frontFile', frontFile)
    formData.append('backFile', backFile)

    return http.post<UploadImage>('api/user/documents/upload-batch', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  //api enter percentage
  updatePercentage(percentage: number, groupId: string) {
    return http.put(`api/shares/my-percentage/${groupId}`, {
      ownershipPercentage: percentage,
      reason: 'Update Percentage'
    })
  },

  //get all notification for user
  getAllNotification() {
    return http.get<GetAllNotifications[]>('api/notifications')
  },
  //change isRead in notification
  readNotification(notificationId: string) {
    return http.put(`api/notifications/${notificationId}/read`)
  },

  // send report checkout
  sendCheckoutReport(body: CheckoutForm) {
    return http.post('api/vehicle-checks/checkout/submit', body)
  },
  // show page notification checkout
  showpageNotificationCheckout(bookingId: string) {
    return http.get(`api/vehicle-checks/booking/${bookingId}/post-use`)
  },
  //get all voting
  getAllVoting(groupId: number) {
    return http.get<Voting[]>('api/votings', {
      params: { groupId }
    })
  },
  //create voting
  createVoting(body: CreateVotingPayload) {
    return http.post<CreateVotingResponse>('api/votings', body)
  },
  //voting
  voting(body: VotingSubmitPayload) {
    return http.post<VotingSubmitResponse>('api/votings/vote', body)
  }
}

export default userApi
