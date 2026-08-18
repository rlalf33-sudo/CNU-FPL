import dohunPortrait from '../assets/people/graduate/dohun.jpg'
import jeongPortrait from '../assets/people/professor/jeong.jpg'
import yeeunPortrait from '../assets/people/undergraduate/Yeni.jpg'
import youminPortrait from '../assets/people/undergraduate/Yuni.jpg'

const members = {
  professor: {
    name: 'Sungmin Jeong',
    position: 'Assistant Professor',
    affiliation: [
      'Department of Marine Bio-Food Sciences',
      'Chonnam National University',
    ],
    email: 'sungmin@jnu.ac.kr',
    education: [
      'Ph.D. in Food Science and Biotechnology, Sejong University',
      'M.S. in Food Engineering, Sejong University',
      'B.S. in Hotel Culinary Arts, Yeonsung University',
    ],
    image: jeongPortrait,
  },
  graduateStudents: [
    {
      name: 'Dohun Kim',
      position: 'M.S. Student',
      email: 'thsg9912@naver.com',
      researchKeywords: ['Cereal Processing', 'Rice', 'Baking', 'Rheology'],
      image: dohunPortrait,
    },
  ],
  undergraduateStudents: [
    {
      name: 'Yeeun Park',
      position: 'Undergraduate Student',
      email: 'edc3355@naver.com',
      researchKeywords: ['Surimi Processing', 'Fish Cakes'],
      image: yeeunPortrait,
    },
    {
      name: 'Youmin Hwang',
      position: 'Undergraduate',
      email: 'hwangyoumin4315@naver.com',
      researchKeywords: ['Cereal processing', 'Wheat', 'Baking'],
      image: youminPortrait,
    },
  ],
  alumni: [],
}

export default members
