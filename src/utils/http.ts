import axios, { type AxiosInstance } from 'axios'
import config from '../constants/config'
import { getAccessTokenFromLS } from './auth'

class Http {
  instance: AxiosInstance
  //  lưu trữ token trong bộ nhớ để tái sử dụng.
  private accessToken: string | null
  constructor() {
    // Đọc accessToken từ localStorage MỘT LẦN khi class được khởi tạo
    // và gán vào thuộc tính `this.accessToken`.
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // thêm interceptor để gắn accessToken vào header Authorization
    // interceptor request là trước khi request được gửi đi chạy vào đây kiểm tra
    this.instance.interceptors.request.use(
      // config là cấu hình của request sắp được gửi đi toàn bộ thông tin chi tiết về request
      (config) => {
        // nếu có accessToken thì gắn vào header Authorization
        // this.accessToken  có token để gửi đi không
        // config.headers có tồn tại header  trong request không
        if (this.accessToken && config.headers) {
          config.headers['Authorization'] = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
