import foodProcessingImage from '../assets/research/foodprocessing.png'
import rheologyImage from '../assets/research/rheology.png'
import foodAiImage from '../assets/research/foodai.png'

const research = [
  {
    id: 'food-processing',
    title: 'Food Processing',
    subtitle: 'Process Development & Optimization',
    description: 'Developing and optimizing food processing systems to control product structure, texture, functionality, and quality.',
    subAreas: [
      { title: 'Cereal Processing', keywords: ['Bakery', 'Noodles', 'Rice Flour', 'Wheat Flour', 'Starch', 'Hydrocolloids', 'Gluten-Free Foods', 'Frying', 'Oil Uptake', 'Process Optimization', 'Product Development'] },
      { title: 'Seafood Processing', keywords: ['Surimi', 'Fish Cakes', 'Fish Gel', 'Gelation', 'Low-Salt Processing', 'Clean-Label Processing', 'Texture Control', 'Process Optimization', 'Product Development'] },
    ],
    image: foodProcessingImage,
    imageAlt: 'Illustration of cereal and seafood processing research',
  },
  {
    id: 'rheology',
    title: 'Rheology',
    subtitle: 'Rheological Methodology & Food Structure',
    description: 'Developing and applying rheological methodologies to characterize food structure, functionality, and processing-induced changes.',
    subAreas: [
      { title: 'Rheological Methodology', keywords: ['Rheological Method Development', 'Steady Shear', 'Dynamic Oscillation', 'Viscoelasticity', 'G′ & G″', 'Pasting Behavior', 'Method Optimization'] },
      { title: 'Texture & Structure', keywords: ['Texture Analysis', 'Gelation', 'Mechanical Properties', 'Tensile Properties', 'Microstructure', 'Structure–Property Relationships', 'Processing-Induced Changes'] },
    ],
    image: rheologyImage,
    imageAlt: 'Illustration of rheological measurement and food structure characterization',
  },
  {
    id: 'food-ai',
    title: 'Food AI',
    subtitle: 'Intelligent Food Analysis',
    description: 'Developing data-driven approaches for prediction, classification, and intelligent evaluation of food quality, composition, and structure.',
    subAreas: [
      { title: 'Hyperspectral Imaging', keywords: ['Spectral Imaging', 'Spectral Analysis', 'Important Wavelengths', 'Non-Destructive Evaluation', 'Quality Prediction', 'Composition Prediction'] },
      { title: 'Machine Learning', keywords: ['Classification', 'Regression', 'Feature Selection', 'Model Optimization', 'Multivariate Analysis', 'Data-Driven Prediction'] },
      { title: 'Computer Vision & Deep Learning', keywords: ['Computer Vision', 'Deep Learning', 'CNN', 'Image Classification', 'Object Detection', 'Visual Quality Assessment'] },
    ],
    image: foodAiImage,
    imageAlt: 'Illustration of hyperspectral imaging, machine learning, and computer vision research',
  },
]

export default research
