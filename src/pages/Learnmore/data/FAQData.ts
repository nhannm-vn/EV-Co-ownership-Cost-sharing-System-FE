import type { Category, FagSection } from '../../../types/page/learnmore.types'

const categories: Category[] = [
  { id: 1, name: 'Understanding EV-Share', key: 'Understanding-EV-Share' },
  { id: 2, name: 'Pricing', key: 'Pricing' },
  { id: 3, name: 'Car Delivery', key: 'Car-Delivery' },
  { id: 4, name: 'Car Usage Policy', key: 'Car-Usage-Policy' },
  { id: 5, name: 'Challans / Accident / Thefts', key: 'Challans-Accident-Thefts' }
]

const faqs: FagSection = {
  'Understanding-EV-Share': [
    {
      question: 'What is EV-Share?',
      answer:
        'EV-Share is a platform that allows multiple owners to co-own an electric vehicle and manage usage, bookings, and costs transparently.'
    },
    {
      question: 'How does EV-Share work?',
      answer: 'Users can book electric vehicles based on ownership percentage through the EV-Share app.'
    },
    {
      question: 'Can I add or remove co-owners later?',
      answer: 'Yes, new co-owners can be added with approval, and ownership can be transferred according to agreement.'
    }
  ],
  Pricing: [
    {
      question: 'How much does EV-Share cost to use?',
      answer: 'EV-Share cost based on duration of usage and owner ship percentage.'
    },
    {
      question: 'Do I only pay when I use the car?',
      answer: 'No, co-owners share fixed ownership costs. However, additional usage-based fees like charging may apply.'
    },
    {
      question: 'Are there any hidden charges?',
      answer: 'No. All costs are transparent and listed clearly before joining.'
    }
  ],
  'Car-Delivery': [
    {
      question: 'When will I get the car?',
      answer: 'The car will be delivered when you book the car and the owner approve your request'
    },
    {
      question: 'How is the EV delivered to co-owners?',
      answer: 'Once purchased, the EV is delivered to a designated location agreed upon by the co-owners.'
    },
    {
      question: 'Is the EV inspected before handover?',
      answer: 'Yes, each EV undergoes a full inspection before being handed over to co-owners'
    }
  ],
  'Car-Usage-Policy': [
    {
      question: 'How is driving time scheduled among co-owners?',
      answer: 'A digital booking system allows co-owners to reserve the car in advance, ensuring fair access.'
    },
    {
      question: 'Are there mileage or usage limits?',
      answer: 'Each co-ownership plan may include limits, which can be adjusted based on group needs.'
    },
    {
      question: 'Can I track my usage history?',
      answer: 'Yes, each co-owner can view their driving time, mileage, and associated costs in the platform dashboard.'
    }
  ],
  'Challans-Accident-Thefts': [
    {
      question: 'Who pays for traffic fines (challans)?',
      answer:
        'Each co-owner is responsible for fines incurred during their usage period, as tracked by the booking system.'
    },
    {
      question: 'What happens if the EV is involved in an accident?',
      answer:
        'Insurance covers most damages, but the responsible co-owner may need to cover deductibles or non-insured costs.'
    },
    {
      question: 'How does EV-Share handle theft',
      answer:
        'In case of theft, the insurance claim process is managed by EV-Share, and co-owners are kept informed throughout.'
    }
  ]
}
export { categories, faqs }
