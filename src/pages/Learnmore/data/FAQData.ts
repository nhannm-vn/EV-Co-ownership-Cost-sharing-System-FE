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
      answer:
        'Users can create a group and invite members to enter ownership percentages to form a contract. Once the contract is set up and vehicles can be booked, a technician will inspect the vehicle at checkout. They can also create a voting fund to make decisions on how to use that fund'
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
      question: 'How much does EV-Share cost to use',
      answer:
        'The cost of EV-Share depends on the duration of usage and ownership percentage. Users also need to pay a security deposit to cover cases where a co-owner fails to pay for damages. The use of the fund is decided by co-owners through voting without system intervention. When checking out a damaged vehicle, a technician will inspect it and provide a revised cost estimate.'
    },
    {
      question: 'Are there any hidden charges?',
      answer: 'No. All costs are transparent and listed clearly before joining.'
    }
  ],
  'Car-Delivery': [
    {
      question: 'When will I get the car?',
      answer: 'You will receive the car only after your booking is confirmed and you successfully check in.'
    },
    {
      question: 'How is the EV delivered to co-owners?',
      answer: 'The EV will be kept at the operator’s location for easier management.'
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
