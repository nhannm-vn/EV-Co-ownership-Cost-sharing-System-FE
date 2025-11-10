import type { imageElement } from '../../../../../../../types/api/staff.type'

// định nghĩa  Registration , với vehicle là ảnh nào
type ImageGroups = Record<string, imageElement[]>

export function groupImages(images: imageElement[]): ImageGroups {
  return images.reduce(
    (
      imagesByType: ImageGroups, //
      currentImage: imageElement
    ) => {
      const { imageType } = currentImage

      // Khởi tạo mảng nếu đây là ảnh đầu tiên của loại này
      // nếu chưa có type trong record thì tạo  mảng  rỗng
      if (!imagesByType[imageType]) {
        imagesByType[imageType] = []
      }

      // Thêm ảnh hiện tại vào nhóm
      // nếu  so sánh type ảnh hiện tại trùng với type đã có trong record thì push vào mảng
      imagesByType[imageType].push(currentImage)

      // Trả về đối tượng đã được cập nhật cho lần lặp tiếp theo
      return imagesByType
    },
    // Khởi tạo với đối tượng rỗng và ép kiểu để typescipt hiểu có cấu trúc gióng record định nghĩa
    // nếu {} thì  lúc đầu mới vô khởi tạo mặc định  nó không hiểu được kiểu dữ liệu
    {} as ImageGroups
  )
}
