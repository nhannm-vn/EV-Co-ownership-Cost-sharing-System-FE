import { useState, useEffect, useRef } from 'react'

interface UseOTPLogicProps {
  length?: number
  // hàm này được gọi khi OTP được nhập đầy đủ
  onComplete?: (otp: string) => void
}

export const useOTPLogic = ({ length = 6, onComplete }: UseOTPLogicProps = {}) => {
  // States
  // tạo ra một mảng OTP , có phần tử là chuỗi rỗng
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  // đếm ngược thời gian
  const [countdown, setCountdown] = useState(60)
  // trạng thái cho phép gửi lại OTP
  const [canResend, setCanResend] = useState(false)

  // mảng các ô input quản lýs điều khiển các ô nhập input
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // hàm đếm ngược 1 phút
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000)
      // khi sài effect xài setTimeOut phải clear không bị trường hợp
      // nếu countdown 5 lần thứ nhất trừ 4 nhưng lần thứ 2 trừ timer trừ 2 lần còn 2 chứ không phải 3
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  // Helper function để check array OTP có đủ chưa (tái sử dụng logic)
  const checkComplete = (otpArray: string[]) => otpArray.every((digit) => digit !== '')

  // Handler functions là hàm xử lí khi nhập OTp
  const handleChange = (index: number, value: string) => {
    // nếu là số thì thôi , không là số thì dừng
    if (!/^\d*$/.test(value)) return

    // clone ra một mảng mới để nhập OTp vô
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    //  nếu value có giá trị và vị trí bé hơn độ dài  thì focus sang ô tiếp theo
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // kiểm tra nếu nhập đủ rồi thì gọi hàm check OTP - dùng helper function
    if (checkComplete(newOtp)) {
      // báo complete OTP
      onComplete?.(newOtp.join(''))
    }
  }

  // hàm này hỗ trợ UX cho người dùng khi bấm OTP sai thì bấm backSpace để quay trở lại ô trước
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // kiểm tra nếu bấm backSpace là xóa và ô hiện tại rỗng và không phải là ô đầu tiên thì quay lại trước
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      // .current[index -1] là quay trả về trước ô hiện tại , .focus là chuyển con trỏ về ô đó
      inputRefs.current[index - 1]?.focus()
    }
  }

  // hầm này cũng có nhiệm vụ hỗ trợ UX cho người dùng
  // khi người dùng copy mã OTP và dán vào ô thì nó sẽ tự động điền vào
  // nếu không có hàm này khi ctrl+ v thì dán vào ô đầu tiên
  const handlePaste = (event: React.ClipboardEvent) => {
    // ngắn không cho không cho browser tự động dán một chuỗi vào ô input vì hành vi mặc định ở đây là onPaste
    event.preventDefault()
    // lấy đoạn chuỗi từ event.clipboardData dữ liệu clipboard
    const pasteData = event.clipboardData.getData('text')
    // lấy các ký tự số hợp lệ (0-9) và chỉ lấy đúng số lượng theo độ dài là 6 như trên quy định
    const numbers = pasteData
      // lấy ra 6 thằng
      .slice(0, length)
      // lấy từng phần tử ra để kiểm tra
      .split('')
      // / / là bao quanh biểu thức chính quy , ^ là bắt đầu chuỗi  , $ kết thúc chuỗi , \d là ký tự số (0-9)
      // lọc ra các ký tự là số (0-9) và filter sẽ trả ra mảng các số 0-9
      .filter((char) => /^\d$/.test(char))

    // nếu các mảng ký tự copy hợp lệ và không rỗng
    if (numbers.length > 0) {
      // clone ra 1 mảng mới nhập OTP
      const newOtp = [...otp]
      // duyệt mảng được copy đưa vào mảng OTP để hiển thị
      numbers.forEach((char, index) => {
        // nếu vị trí index nhỏ hơn đọ dài thì gán mới giá trị cho mảng OTP
        if (index < length) newOtp[index] = char
      })
      // cập nhập lại mảng OTP
      setOtp(newOtp)
      // kiểm tra nếu đủ rồi thì gọi hàm checkOTP - dùng helper function thay vì duplicate code
      if (checkComplete(newOtp)) {
        onComplete?.(newOtp.join(''))
      }
    }
  }

  // hàm gửi lại OTP
  const resetOTP = () => {
    // cho dếm ngược lại 60s
    setCountdown(60)
    // không cho gửi lại nữa
    setCanResend(false)
    // set lại các ô input rỗng
    setOtp(new Array(length).fill(''))
    // đưa con trỏ về ô đầu tiên
    inputRefs.current[0]?.focus()
  }

  const handleBack = () => {
    // cho người dùng quay lại trang trước đó
    window.history.back()
  }

  return {
    // States
    otp,
    countdown,
    canResend,

    checkComplete,

    // Refs
    inputRefs,

    // Handlers
    handleChange,
    handleKeyDown,
    handlePaste,
    resetOTP,
    handleBack
  }
}
