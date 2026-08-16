import haebadangLogo from '../assets/activities/haebadang-logo.png'

const activities = [
  {
    id: 'haebadang',
    name: '해바당',
    subtitle: 'Baking Research Club',
    description: '해바당 is a student baking research club in the Department of Marine Bio-Food Sciences at Chonnam National University. Through hands-on baking activities and research discussions, students explore food processing principles and develop practical experience in cereal-based food production.',
    logo: haebadangLogo,
    logoAlt: 'Haebadang Baking Research Club logo',
    advisor: 'Prof. Sungmin Jeong',
    participants: 'Students enrolled in the Department of Marine Bio-Food Sciences',
    schedule: '1–2 sessions per month during the semester',
    established: '2026',
    activityAreas: [
      { title: 'Baking Practice', description: 'Hands-on production of bread, cookies, and other cereal-based foods while learning fundamental food processing principles.' },
      { title: 'Product Development', description: 'Exploring formulations, ingredients, and processing conditions through student-led baking and food product development activities.' },
      { title: 'Research Discussion', description: 'Discussing food science and processing topics related to baking, ingredients, texture, formulation, and product quality.' },
    ],
  },
]

export default activities
