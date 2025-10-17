// file chứa những method call api cho user/co-owner

import type { UserGetProfile } from '../types/api/user.type'
import { getAccessTokenFromLS } from '../utils/auth'
import http from '../utils/http'

const userApi = {
  //api giup lay thong tin user ve
  getProfile() {
    const accessToken = getAccessTokenFromLS()
    return http.get<UserGetProfile>('api/user/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default userApi
