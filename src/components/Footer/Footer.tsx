import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled
} from '@ant-design/icons'

export default function Footer() {
  return (
    <footer className='bg-white text-gray-800 py-8 px-6'>
      {/* Nội dung chính */}
      <div className='flex flex-col md:flex-row justify-between gap-8 mb-6'>
        {/* Giới thiệu */}
        <div className='flex-1'>
          <h2 className='font-bold text-lg'>EVShare</h2>
          <p className='text-gray-600 text-sm mt-2'>Connect co-owners – Share costs smartly</p>
          <p className='text-gray-600 text-sm'>
            A platform for managing co-ownership <br />
            and sharing electric vehicle expenses
          </p>
        </div>

        {/* Contact & Support */}
        <div className='flex-1'>
          <h3 className='font-semibold text-base'>Contact & Support</h3>
          <ul className='mt-2 space-y-2 text-sm text-gray-600'>
            <li className='flex items-center gap-2'>
              <MailOutlined /> support@evshare.com
            </li>
            <li className='flex items-center gap-2'>
              <PhoneOutlined /> 1234 567 890
            </li>
            <li className='flex items-center gap-2'>
              <EnvironmentOutlined /> Office Address
            </li>
          </ul>
        </div>

        {/* Terms & Policies */}
        <div className='flex-1'>
          <h3 className='font-semibold text-base'>Terms & Policies</h3>
          <ul className='mt-2 space-y-2 text-sm text-gray-600'>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Rules for Cost Sharing & Co-ownership</li>
          </ul>
        </div>
      </div>

      {/* Icon mạng xã hội */}
      <div className='flex justify-center text-2xl text-gray-600'>
        <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
          <FacebookFilled className='hover:text-blue-500 transition-colors' />
        </a>
        <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
          <TwitterSquareFilled className='hover:text-sky-400 transition-colors' />
        </a>
        <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
          <LinkedinFilled className='hover:text-blue-400 transition-colors' />
        </a>
      </div>

      {/* Bản quyền */}
      <div className='mt-6 border-t border-gray-200 pt-4 text-center text-sm text-gray-500'>
        © 2025 EVShare. All rights reserved.
      </div>
    </footer>
  )
}
