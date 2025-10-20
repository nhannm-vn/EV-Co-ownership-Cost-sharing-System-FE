import type { GroupStaffList } from '../types/api/staff.type'
import http from '../utils/http'

const staffApi = {
  getAllGroupStaff() {
    return http.get<GroupStaffList>('api/groups/staff/all')
  }
}

export default staffApi
