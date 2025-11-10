import { Link } from 'react-router'
import path from '../../constants/path'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { clearLS, getAccessTokenFromLS, getRoleFromLS } from '../../utils/auth'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import { toast } from 'react-toastify'
import { LOGO_URL } from '../../constants/images'

function HeaderStaff() {
  // lấy state global từ contextApi
  const { setIsAuthenticated } = useContext(AppContext)

  const role = getRoleFromLS()

  //call api logout
  // ***Mình không cần navigate vì khi set về false thì nó sẽ tự chuyển cho mình về login
  // Component
  const logoutMutation = useMutation({
    mutationFn: authApi.logout
  })

  const handleLogout = () => {
    const accessToken = getAccessTokenFromLS()

    logoutMutation.mutate(accessToken, {
      //Truyền token gốc (không có "Bearer")
      onSuccess: () => {
        //Set lại biến này để move ra trang ngoài
        setIsAuthenticated(false)
        //Xóa trên localstorage
        clearLS()
        toast.success('Logout successfully!', {
          autoClose: 1000
        })
      }
    })
  }

  return (
    <header className='bg-white top-0 z-50 overflow-x-auto '>
      <div className='flex justify-between items-center px-6'>
        <Link
          to={path.adminDashboard}
          className='flex w-28 h-28 items-center mr-24 hover:scale-90 transition-transform'
        >
          <img src={LOGO_URL.white} alt='' />
          <div className='ml-2 text-lg font-semibold text-black text-[14px]'>EVShare</div>
        </Link>

        <div className='flex  justify-between items-center'>
          <div className='mr-8 flex items-center gap-2 text-gray-600 font-semibold'>
            <span className='text-sm'>Welcome</span>
            <span className='text-emerald-600 text-sm bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200'>
              {role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className='font-semibold text-center w-32 text-[14px] py-3 text-white rounded-lg transition 
           duration-300 bg-[#17a984] hover:text-black '
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderStaff
