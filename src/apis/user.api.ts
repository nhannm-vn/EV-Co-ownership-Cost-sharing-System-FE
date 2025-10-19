// file chứa những method call api cho user/co-owner

import type { CreateGroupMember, UserGetProfile } from '../types/api/user.type'
import type { UploadImage, UserGetProfile } from '../types/api/user.type'
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

  CreateGroup: (body: FormData) => {
    return http.post<CreateGroupMember>('api/groups/with-vehicle', body, {
      headers: {
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
  }
}

export default userApi
