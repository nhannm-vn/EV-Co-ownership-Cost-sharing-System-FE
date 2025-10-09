import DocCard from './Components/DocCard'
import Field from './Components/Field'

export default function ProfilePage() {
  const profile = {
    username: 'Lupin III',
    avatar: 'https://opensource.fb.com/img/projects/react.jpg',
    email: 'lupin3@gmail.com',
    phone: '+84 912 345 678',
    cccd: null,
    gplx: null
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-950 flex items-center justify-center p-6'>
      <div className='w-full max-w-md bg-black/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 space-y-6'>
        {/* Avatar */}
        <div className='flex flex-col items-center space-y-3'>
          <div className='w-28 h-28 rounded-full border-4 border-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 overflow-hidden shadow-xl'>
            <img src={profile.avatar} alt='avatar' className='w-full h-full object-cover' />
          </div>
          <h2 className='text-3xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.7)]'>
            {profile.username}
          </h2>
        </div>

        {/* Info fields */}
        <div className='space-y-4'>
          <Field label='Email' value={profile.email} glow />
          <Field label='Phone' value={profile.phone} glow />
          <Field label='CCCD' value='0123456789' />
          <Field label='GPLX' value='79A-123456' />
        </div>

        {/* Documents */}
        <div className='grid grid-cols-1 gap-4 pt-4'>
          <DocCard title='CCCD' image={profile.cccd} />
          <DocCard title='GPLX' image={profile.gplx} />
        </div>
      </div>
    </div>
  )
}
