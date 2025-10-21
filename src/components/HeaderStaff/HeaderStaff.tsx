import { Link } from 'react-router'
import path from '../../constants/path'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { clearLS, getAccessTokenFromLS } from '../../utils/auth'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import { toast } from 'react-toastify'

function HeaderStaff() {
  // lấy state global từ contextApi
  const { setIsAuthenticated } = useContext(AppContext)

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
    <header className='bg-zinc-900 top-0 z-50 overflow-x-auto '>
      <div className='flex justify-between items-center px-6'>
        <Link
          to={path.adminDashboard}
          className='flex w-28 h-28 items-center mr-24 hover:scale-90 transition-transform'
        >
          <img src='src/assets/z7052214352472_9110bb340043f5ad4f507f5a29909fc3.png' alt='' />
          <div className='ml-2 text-lg font-semibold text-slate-100 text-[14px]'>EVShare</div>
        </Link>

        <div className='flex  justify-between items-center'>
          <button
            onClick={handleLogout}
            className='font-semibold text-center w-32 text-[14px] py-3 text-white rounded-lg transition duration-300
           hover:bg-red-600 hover:text-black bg-amber-500'
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderStaff
