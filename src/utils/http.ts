import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import config from '../constants/config'
import { clearLS, getAccessTokenFromLS } from './auth'
import { toast } from 'react-toastify'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // thêm interceptor để gắn accessToken vào header Authorization
    // interceptor request là trước khi request được gửi đi chạy vào đây kiểm tra
    this.instance.interceptors.request.use(
      // config là cấu hình của request sắp được gửi đi toàn bộ thông tin chi tiết về request

      (config) => {
        const accessToken = getAccessTokenFromLS()
        // nếu có accessToken thì gắn vào header Authorization
        // this.accessToken  có token để gửi đi không
        // config.headers có tồn tại header  trong request không
        if (accessToken && config.headers) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Response Interceptor - xử lý lỗi 401 het accesstoken
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          // Nếu mà trong data không có message thì hãy hãy message ở ngoài error luôn đi
          const message = data?.message || error.message
          toast.error(message, {
            autoClose: 1500
          })
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
