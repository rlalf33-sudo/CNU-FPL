const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const resourceImage = (folder, filename) => `${basePath}/images/resources/${folder}/${filename}`

export const laboratorySpaces = [
  {
    name: 'Student Workspace',
    room: 'Room 426',
    images: [
      resourceImage('spaces', 'student-workspace-01.jpg'),
      resourceImage('spaces', 'student-workspace-02.jpg'),
      resourceImage('spaces', 'student-workspace-03.jpg'),
    ],
  },
  {
    name: 'Laboratory',
    room: 'Room 427',
    images: [
      resourceImage('spaces', 'laboratory-01.jpg'),
      resourceImage('spaces', 'laboratory-02.jpg'),
      resourceImage('spaces', 'laboratory-03.jpg'),
      resourceImage('spaces', 'laboratory-04.jpg'),
      resourceImage('spaces', 'laboratory-05.jpg'),
      resourceImage('spaces', 'laboratory-06.jpg'),
      resourceImage('spaces', 'laboratory-07.jpg'),
      resourceImage('spaces', 'laboratory-08.jpg'),
    ],
  },
]

export const equipment = [
  {
    id: 'texture-analyzer',
    name: 'Texture Analyzer',
    model: 'TA.XTplus100C',
    manufacturer: 'Stable Micro Systems',
    location: 'Godalming, UK',
    image: resourceImage('equipment', 'texture-analyzer.jpg'),
  },
  {
    id: 'colorimeter',
    name: 'Colorimeter',
    model: 'CR-400',
    manufacturer: 'Konica Minolta',
    location: 'Tokyo, Japan',
    image: resourceImage('equipment', 'colorimeter.jpg'),
  },
  {
    id: 'refrigerated-centrifuge',
    name: 'Refrigerated Centrifuge',
    model: 'Combi R515',
    manufacturer: 'Hanil Scientific Inc.',
    location: 'Gimpo, Republic of Korea',
    image: resourceImage('equipment', 'refrigerated-centrifuge.jpg'),
  },
  {
    id: 'ph-meter',
    name: 'pH Meter',
    model: 'Orion Pro Star PH211',
    manufacturer: 'Thermo Fisher Scientific',
    location: 'Waltham, MA, USA',
    image: resourceImage('equipment', 'ph-meter.jpg'),
  },
  {
    id: 'water-purification-system',
    name: 'Water Purification System',
    model: 'Aquapuri Essence 380T System',
    manufacturer: 'Young In Scientific',
    location: 'Anyang, Republic of Korea',
    image: resourceImage('equipment', 'water-purification-system.jpg'),
  },
  {
    id: 'dough-conditioner',
    name: 'Dough Conditioner',
    model: 'RJDC-36-2-T',
    manufacturer: 'Rajin Flobe',
    location: 'Republic of Korea',
    image: resourceImage('equipment', 'dough-conditioner.jpg'),
  },
  {
    id: 'deck-oven',
    name: 'Deck Oven',
    model: 'RJDO-203',
    manufacturer: 'Rajin Flobe',
    location: 'Republic of Korea',
    image: resourceImage('equipment', 'deck-oven.jpg'),
  },
  {
    id: '3d-printer',
    name: '3D Printer',
    model: 'P2S',
    manufacturer: 'Bambu Lab',
    location: 'Shenzhen, China',
    image: resourceImage('equipment', '3d-printer.jpg'),
  },
  {
    id: 'silent-cutter',
    name: 'Silent Cutter',
    model: '84145',
    manufacturer: 'Hobart',
    location: 'Troy, OH, USA',
    image: resourceImage('equipment', 'silent-cutter.jpg'),
  },
  {
    id: 'stand-mixer',
    name: 'Stand Mixer',
    model: '5KPM5',
    manufacturer: 'KitchenAid',
    location: 'USA',
    image: resourceImage('equipment', 'stand-mixer.jpg'),
  },
]

const resources = { laboratorySpaces, equipment }

export default resources
