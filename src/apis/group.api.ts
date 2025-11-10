import type {
  BookingResponse,
  BookingSlotResponse,
  CheckInResponse,
  ContractResponse,
  ContractStatus,
  CreateDepositSuccess,
  CreateGroupMember,
  DepositForGroup,
  DepositForUser,
  GroupItem,
  groupSummary,
  InvitationResponse,
  MyBookingResponse,
  OwnershipResponse
} from '../types/api/group.type'
import type { PaymentHistory } from '../types/api/user.type'
import { getAccessTokenFromLS } from '../utils/auth'
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
    return http.get<GroupItem>(`api/shares/page-data/${groupId}`)
  },

  //  API handle id ở header khi  bấm groupDetail
  getGroupById(groupId: string) {
    return http.get<GroupItem>(`api/groups/${groupId}`)
  },
  // mời thành viên
  inviteMember: (groupId: string, inviteeEmail: string) => {
    return http.post(`api/groups/${groupId}/invitations`, { inviteeEmail })
  },
  // kích thành viên ra khỏi nhóm
  deleteMember: (groupId: string, userId: string) => {
    return http.delete(`api/shares/${groupId}/members/${userId}`)
  },
  // verifymember

  verifyMember: (otp: string) => {
    return http.post<InvitationResponse>(`api/invitations/accept`, { otp })
  },
  // get members of group
  getMembersOfGroup: (groupId: string) => {
    return http.get<groupSummary>(`api/shares/page-data/${groupId}`)
  },
  // get all percentage in group
  getAllPercentageInGroup: (groupId: string) => {
    return http.get<OwnershipResponse>(`api/shares/page-data/${groupId}`)
  },
  // generate contract
  generateContract: (groupId: string) => {
    return http.get<ContractResponse>(`api/contracts/${groupId}/generate`)
  },
  // sign contract
  signContract: (groupId: string) => {
    return http.post(`api/contracts/${groupId}/auto-sign`)
  },
  // cancel contract
  cancelContract: (groupId: string, reason: string) => {
    return http.post(`api/contracts/${groupId}/cancel`, { reason })
  },
  // approve or reject member contract
  approveMemberContract: (contractId: string, payload: { status: string; reason?: string }) => {
    return http.post(`api/contracts/${contractId}/member-feedback`, payload)
  },
  // get deposit for user
  getDepositForUser: ({ userId, groupId }: { userId: string; groupId: string }) => {
    const accessToken = getAccessTokenFromLS()
    return http.get<DepositForUser>(`api/deposits/info/${userId}/${groupId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  },
  // get deposit for group
  getDepositForGroup: (groupId: string) => {
    return http.get<DepositForGroup[]>(`api/deposits/group/${groupId}/status`)
  },
  // create deposit for co-owner
  createDepositForCoOwner: ({ userId, groupId }: { userId: string; groupId: string }) => {
    return http.post<CreateDepositSuccess>(`api/deposits/create`, { userId, groupId })
  },
  // check status contract để hiển thị aside mới
  getStatusContract: (groupId: string) => {
    return http.get<ContractStatus>(`api/contracts/${groupId}`)
  },
  // get deposit history for group
  getDepositHistoryForGroup: (txnRef: string) => {
    return http.get<PaymentHistory>(`api/deposits/info-by-txn`, {
      params: { txnRef }
    })
  },

  // get booking calendar for group vehicles
  getBookingCalendar: (groupId: string) => {
    return http.get<BookingResponse>(`api/calendar/groups/${groupId}/weekly`)
  },
  // booking slot
  bookingSlot: (body: { vehicleId: number; startDateTime: string; endDateTime: string }) => {
    return http.post<BookingSlotResponse>(`api/calendar/flexible-booking`, body)
  },
  // cancel booking slot
  cancelBookingSlot: (bookingId: number) => {
    return http.put(`api/bookings/${bookingId}/cancel`)
  },
  // my booking
  getMyBooking: (groupId: string) => {
    return http.get<MyBookingResponse[]>('api/bookings/user-bookings', {
      params: { groupId } //  vào params
    })
  },
  // verify QR code
  verifyCheckIn: (qrCode: string) => {
    return http.post<CheckInResponse>('api/vehicle-checks/qr-scan', { qrCode })
  }
}

export default groupApi
