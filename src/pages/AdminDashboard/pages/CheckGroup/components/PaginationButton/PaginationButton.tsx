import classNames from 'classnames'

interface PaginationButtonProps {
  currentPage: number // Page number 1-based (VD: 1, 2, 3)
  totalPages: number // Tổng số trang
  onPageChange: (newPage: number) => void // Hàm callback (nhận chỉ số 0-based)
}

export default function PaginationButton({ currentPage, totalPages, onPageChange }: PaginationButtonProps) {
  if (totalPages <= 1) {
    return null
  }

  // vì page lên api bắt đầu là 0
  const currentPageIndex = currentPage - 1 // 1 -> 0, 2 -> 1, 3 -> 2

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <div className='mt-6 flex justify-center'>
      <nav aria-label='Page navigation example'>
        <ul className='inline-flex -space-x-px'>
          <li>
            {/* Nút Previous */}
            <button
              // hiện tại TRỪ 1 (lùi trang)
              onClick={() => onPageChange(currentPageIndex - 1)}
              // nếu previos không cho mấy click
              disabled={isFirstPage}
              className={classNames(
                'rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200',
                {
                  'cursor-not-allowed opacity-50': isFirstPage,
                  'hover:bg-gray-100 hover:text-gray-700': !isFirstPage
                }
              )}
            >
              Previous
            </button>
          </li>

          {/* Các nút số trang */}
          {Array(totalPages)
            .fill(0)
            .map((_, pageIndex) => {
              const pageNumber = pageIndex + 1 // Trang 1-based
              const isActive = currentPage === pageNumber

              return (
                <li key={pageNumber}>
                  <button
                    // Gọi hàm onPageChange với chỉ số 0-based (pageIndex)
                    onClick={() => onPageChange(pageIndex)}
                    className={classNames(
                      'border border-gray-300 py-2 px-3 leading-tight transition-colors duration-200',
                      {
                        'bg-blue-600 text-white font-semibold': isActive,
                        'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700': !isActive
                      }
                    )}
                  >
                    {pageNumber}
                  </button>
                </li>
              )
            })}

          <li>
            {/* Nút Next */}
            <button
              // [SỬA] Chỉ số 0-based hiện tại CỘNG 1 (tiến trang)
              onClick={() => onPageChange(currentPageIndex + 1)}
              disabled={isLastPage}
              className={classNames(
                'rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight transition-colors duration-200',
                {
                  'cursor-not-allowed opacity-50': isLastPage,
                  'hover:bg-gray-100 hover:text-gray-700': !isLastPage
                }
              )}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
