const regex = {
  // (\d{2})	2 chữ số đầu → mã tỉnh/thành (VD: 30, 43, 51, 60…)
  // ([A-HKM]{1,2})	1–2 chữ cái (A-H (A, B, C, D, E, F, G, H), K, M) → không cho I, O, J, L vì dễ nhầm
  // [-\s]?	Có thể có dấu gạch - hoặc khoảng trắng sau phần chữ
  //(\d{3})	3 chữ số tiếp theo
  //   \.	Dấu chấm bắt buộc .
  // (\d{2})	2 chữ số cuối cùng
  LICENSEPLATE: /^(\d{2})([A-HKM]{1,2})[-\s]?(\d{3})\.(\d{2})$/,
  // A-H (A, B, C, D, E, F, G, H
  // J-N (J, K, L, M, N,)
  // P, R, Z
  //  0 đến 9
  //{17} lặp 17 lần

  CHASSISNUMBER: /^[A-HJ-NPR-Z0-9]{17}$/
}

export default regex
