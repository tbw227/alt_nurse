/**
 * Gallery Images Controller
 * Manages gallery image data and API endpoints
 *
 * Image source: all image paths must point under /images/* which are served
 * from front-end/public/images (never from front-end/dist/images).
 * Band folders under public/images (e.g. "At the left hand of god", "Gurney")
 * are shown in the gallery with the band name.
 *
 * Note: Currently uses in-memory storage. In production, this should be
 * replaced with a database (MongoDB, PostgreSQL, etc.)
 */

// In-memory storage for gallery images
// All paths are URLs like /images/BandFolder/photo.jpg — served from front-end/public/images
// - image: Path under /images/ (e.g. '/images/At the left hand of god/IMG_8031.jpg')
// - category: Band slug for grouping (e.g. 'at-the-left-hand-of-god'); display name is shown in the UI
let galleryImages = [
  {
    id: '1',
    title: 'Concert Night',
    image: '/images/colin-lloyd-W6_txbgkkeU-unsplash.jpg',
    description: 'Amazing night at the concert',
    category: 'concerts',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Music Festival',
    image: '/images/186120115_l.jpg',
    description: 'Summer music festival highlights',
    category: 'festivals',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Live Performance',
    image: '/images/les-taylor-kEOv7-jhRbc-unsplash.jpg',
    description: 'Intimate live performance',
    category: 'live',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // BATS BAND IMAGES
  // All images from the Bats band performances
  // Category: 'bats' - Groups these images together in the gallery
  // ============================================
  {
    id: '4',
    title: 'Bats - Live Performance',
    image: '/images/IMG_2434 3.jpg',
    description: 'Bats band performing live',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Bats - Stage Performance',
    image: '/images/IMG_2436 2.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Bats - Concert Moment',
    image: '/images/IMG_2440 2.jpg',
    description: 'Bats band concert moment',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Bats - Live Show',
    image: '/images/IMG_2451 2.jpg',
    description: 'Bats band live show',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Bats - Performance',
    image: '/images/IMG_2453 2.jpg',
    description: 'Bats band performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '9',
    title: 'Bats - On Stage',
    image: '/images/IMG_2454 2.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '10',
    title: 'Bats - Concert',
    image: '/images/IMG_2468 2.jpg',
    description: 'Bats band concert',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '11',
    title: 'Bats - Live',
    image: '/images/IMG_2469 2.jpg',
    description: 'Bats band live',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '12',
    title: 'Bats - Performance',
    image: '/images/IMG_2470 2.jpg',
    description: 'Bats band performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '13',
    title: 'Bats - Stage',
    image: '/images/IMG_2474 2.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '14',
    title: 'Bats - Live Performance',
    image: '/images/IMG_2476 2.jpg',
    description: 'Bats band live performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '15',
    title: 'Bats - Concert',
    image: '/images/IMG_2502.jpg',
    description: 'Bats band concert',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '16',
    title: 'Bats - Live Show',
    image: '/images/IMG_2505.jpg',
    description: 'Bats band live show',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '17',
    title: 'Bats - Performance',
    image: '/images/IMG_2508.jpg',
    description: 'Bats band performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '18',
    title: 'Bats - On Stage',
    image: '/images/IMG_2509.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '19',
    title: 'Bats - Live',
    image: '/images/IMG_6981.jpg',
    description: 'Bats band live',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '20',
    title: 'Bats - Concert Moment',
    image: '/images/IMG_6997.jpg',
    description: 'Bats band concert moment',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '21',
    title: 'Bats - Performance',
    image: '/images/IMG_7002.jpg',
    description: 'Bats band performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '22',
    title: 'Bats - Live Show',
    image: '/images/IMG_7003.jpg',
    description: 'Bats band live show',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '23',
    title: 'Bats - On Stage',
    image: '/images/IMG_7011.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '24',
    title: 'Bats - Concert',
    image: '/images/IMG_7017.jpg',
    description: 'Bats band concert',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '25',
    title: 'Bats - Live Performance',
    image: '/images/IMG_7019.jpg',
    description: 'Bats band live performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '26',
    title: 'Bats - Stage',
    image: '/images/IMG_7020.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '27',
    title: 'Bats - Performance',
    image: '/images/IMG_7021.jpg',
    description: 'Bats band performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '28',
    title: 'Bats - Live',
    image: '/images/IMG_7030.jpg',
    description: 'Bats band live',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '29',
    title: 'Bats - Concert',
    image: '/images/IMG_7036.jpg',
    description: 'Bats band concert',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '30',
    title: 'Bats - Live Show',
    image: '/images/IMG_7043.jpg',
    description: 'Bats band live show',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '31',
    title: 'Bats - Performance',
    image: '/images/IMG_7045.jpg',
    description: 'Bats band performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '32',
    title: 'Bats - On Stage',
    image: '/images/IMG_7046.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '33',
    title: 'Bats - Concert Moment',
    image: '/images/IMG_7048.jpg',
    description: 'Bats band concert moment',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '34',
    title: 'Bats - Live',
    image: '/images/IMG_7064.jpg',
    description: 'Bats band live',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '35',
    title: 'Bats - Performance',
    image: '/images/IMG_7065.jpg',
    description: 'Bats band performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '36',
    title: 'Bats - Stage',
    image: '/images/IMG_7067.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '37',
    title: 'Bats - Live Performance',
    image: '/images/IMG_7078.jpg',
    description: 'Bats band live performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '38',
    title: 'Bats - Concert',
    image: '/images/IMG_7081.jpg',
    description: 'Bats band concert',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '39',
    title: 'Bats - Live Show',
    image: '/images/IMG_7084.jpg',
    description: 'Bats band live show',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '40',
    title: 'Bats - On Stage',
    image: '/images/IMG_7086.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '41',
    title: 'Bats - Performance',
    image: '/images/IMG_7087.jpg',
    description: 'Bats band performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '42',
    title: 'Bats - Live',
    image: '/images/IMG_7089.jpg',
    description: 'Bats band live',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '43',
    title: 'Bats - Concert',
    image: '/images/IMG_7091.jpg',
    description: 'Bats band concert',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '44',
    title: 'Bats - Stage',
    image: '/images/IMG_7092.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '45',
    title: 'Bats - Live Performance',
    image: '/images/IMG_7095.jpg',
    description: 'Bats band live performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '46',
    title: 'Bats - Concert Moment',
    image: '/images/IMG_7096.jpg',
    description: 'Bats band concert moment',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '47',
    title: 'Bats - Performance',
    image: '/images/IMG_7099.jpg',
    description: 'Bats band performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '48',
    title: 'Bats - Live Show',
    image: '/images/IMG_7103.jpg',
    description: 'Bats band live show',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '49',
    title: 'Bats - On Stage',
    image: '/images/IMG_7106.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '50',
    title: 'Bats - Concert',
    image: '/images/IMG_7107.jpg',
    description: 'Bats band concert',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '51',
    title: 'Bats - Live',
    image: '/images/IMG_7111.jpg',
    description: 'Bats band live',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '52',
    title: 'Bats - Performance',
    image: '/images/IMG_7112.jpg',
    description: 'Bats band performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '53',
    title: 'Bats - Stage',
    image: '/images/IMG_7114.jpg',
    description: 'Bats band on stage',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  {
    id: '54',
    title: 'Bats - Live Performance',
    image: '/images/IMG_7115.jpg',
    description: 'Bats band live performance',
    category: 'bats',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // MOIRE BAND IMAGES
  // All images from the Moire band performances
  // Category: 'moire' - Groups these images together in the gallery
  // Note: Update image paths if Moire images are in a different location
  // ============================================
  {
    id: '55',
    title: 'Moire - Live Performance',
    image: '/images/IMG_7935.jpg',
    description: 'Moire band performing live',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '56',
    title: 'Moire - Stage Performance',
    image: '/images/IMG_7935.jpg',
    description: 'Moire band on stage',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '57',
    title: 'Moire - Concert Moment',
    image: '/images/IMG_7937.jpg',
    description: 'Moire band concert moment',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '58',
    title: 'Moire - Live Show',
    image: '/images/IMG_7939.jpg',
    description: 'Moire band live show',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '59',
    title: 'Moire - Performance',
    image: '/images/IMG_7940.jpg',
    description: 'Moire band performance',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '60',
    title: 'Moire - On Stage',
    image: '/images/IMG_7950.jpg',
    description: 'Moire band on stage',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '61',
    title: 'Moire - Concert',
    image: '/images/IMG_7951.jpg',
    description: 'Moire band concert',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '62',
    title: 'Moire - Live',
    image: '/images/IMG_7953.jpg',
    description: 'Moire band live',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '63',
    title: 'Moire - Performance',
    image: '/images/IMG_7955.jpg',
    description: 'Moire band performance',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '64',
    title: 'Moire - Live Show',
    image: '/images/IMG_7958.jpg',
    description: 'Moire band live show',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '65',
    title: 'Moire - On Stage',
    image: '/images/IMG_7962.jpg',
    description: 'Moire band on stage',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '66',
    title: 'Moire - Concert',
    image: '/images/IMG_7967.jpg',
    description: 'Moire band concert',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '67',
    title: 'Moire - Live Performance',
    image: '/images/IMG_7971.jpg',
    description: 'Moire band live performance',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '68',
    title: 'Moire - Stage',
    image: '/images/IMG_7975.jpg',
    description: 'Moire band on stage',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '69',
    title: 'Moire - Performance',
    image: '/images/IMG_7993.jpg',
    description: 'Moire band performance',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '70',
    title: 'Moire - Live Show',
    image: '/images/IMG_7995.jpg',
    description: 'Moire band live show',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '71',
    title: 'Moire - On Stage',
    image: '/images/IMG_7996.jpg',
    description: 'Moire band on stage',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '72',
    title: 'Moire - Concert',
    image: '/images/IMG_7997.jpg',
    description: 'Moire band concert',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '73',
    title: 'Moire - Live',
    image: '/images/IMG_7998.jpg',
    description: 'Moire band live',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '74',
    title: 'Moire - Performance',
    image: '/images/IMG_7999.jpg',
    description: 'Moire band performance',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '75',
    title: 'Moire - Stage',
    image: '/images/IMG_8003.jpg',
    description: 'Moire band on stage',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '76',
    title: 'Moire - Live Performance',
    image: '/images/IMG_8009.jpg',
    description: 'Moire band live performance',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '77',
    title: 'Moire - Concert Moment',
    image: '/images/IMG_8010.jpg',
    description: 'Moire band concert moment',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '78',
    title: 'Moire - Performance',
    image: '/images/IMG_8011.jpg',
    description: 'Moire band performance',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '79',
    title: 'Moire - Live Show',
    image: '/images/IMG_8015.jpg',
    description: 'Moire band live show',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '80',
    title: 'Moire - On Stage',
    image: '/images/IMG_8016.jpg',
    description: 'Moire band on stage',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '81',
    title: 'Moire - Concert',
    image: '/images/IMG_8018.jpg',
    description: 'Moire band concert',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '82',
    title: 'Moire - Live',
    image: '/images/IMG_8019.jpg',
    description: 'Moire band live',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '83',
    title: 'Moire - Performance',
    image: '/images/IMG_8507.jpg',
    description: 'Moire band performance',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  {
    id: '84',
    title: 'Moire - Stage',
    image: '/images/IMG_8522.jpg',
    description: 'Moire band on stage',
    category: 'moire',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // PROMOTIONAL & ARTISTIC IMAGES
  // Promotional content and artistic designs
  // ============================================
  {
    id: '85',
    title: 'Promotional Image',
    image: '/images/26.png',
    description: 'Promotional content',
    category: 'promotional',
    createdAt: new Date().toISOString()
  },
  {
    id: '86',
    title: 'Event Promotion',
    image: '/images/21.png',
    description: 'Event promotional material',
    category: 'promotional',
    createdAt: new Date().toISOString()
  },
  {
    id: '87',
    title: 'Concert Videos & Promo Videos',
    image: '/images/Concert Videos_Promo Videos.png',
    description: 'Concert and promotional video content',
    category: 'content-creation',
    createdAt: new Date().toISOString()
  },
  {
    id: '88',
    title: 'Artistic Design',
    image: '/images/Artistic.png',
    description: 'Artistic promotional design',
    category: 'artistic',
    createdAt: new Date().toISOString()
  },
  {
    id: '89',
    title: 'Khaos Theory - Promotional',
    image: '/images/Khaos Theory/IMG_4942.jpg',
    description: 'Khaos Theory promotional content',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '90',
    title: 'Khaos Theory - Event',
    image: '/images/Khaos Theory/IMG_4944.jpg',
    description: 'Khaos Theory event promotion',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // AT THE LEFT HAND OF GOD BAND IMAGES
  // Category: 'at-the-left-hand-of-god'
  // All images from public/images/At the left hand of god/
  // ============================================
  {
    id: '91',
    title: 'At The Left Hand Of God - Live Performance',
    image: '/images/At the left hand of god/IMG_8031.jpg',
    description: 'At The Left Hand Of God performing live',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '92',
    title: 'At The Left Hand Of God - Stage Performance',
    image: '/images/At the left hand of god/IMG_8032.jpg',
    description: 'At The Left Hand Of God on stage',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '93',
    title: 'At The Left Hand Of God - Concert Moment',
    image: '/images/At the left hand of god/IMG_8035.jpg',
    description: 'At The Left Hand Of God concert moment',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '94',
    title: 'At The Left Hand Of God - Live Show',
    image: '/images/At the left hand of god/IMG_8039.jpg',
    description: 'At The Left Hand Of God live show',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '95',
    title: 'At The Left Hand Of God - Performance',
    image: '/images/At the left hand of god/IMG_8040.jpg',
    description: 'At The Left Hand Of God performance',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '96',
    title: 'At The Left Hand Of God - On Stage',
    image: '/images/At the left hand of god/IMG_8042.jpg',
    description: 'At The Left Hand Of God on stage',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '97',
    title: 'At The Left Hand Of God - Concert',
    image: '/images/At the left hand of god/IMG_8043.jpg',
    description: 'At The Left Hand Of God concert',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '98',
    title: 'At The Left Hand Of God - Live',
    image: '/images/At the left hand of god/IMG_8044.jpg',
    description: 'At The Left Hand Of God live',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '99',
    title: 'At The Left Hand Of God - Stage',
    image: '/images/At the left hand of god/IMG_8045.jpg',
    description: 'At The Left Hand Of God on stage',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '100',
    title: 'At The Left Hand Of God - Performance',
    image: '/images/At the left hand of god/IMG_8050.jpg',
    description: 'At The Left Hand Of God performance',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '101',
    title: 'At The Left Hand Of God - Live Performance',
    image: '/images/At the left hand of god/IMG_8051.jpg',
    description: 'At The Left Hand Of God performing live',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '102',
    title: 'At The Left Hand Of God - Concert Moment',
    image: '/images/At the left hand of god/IMG_8055.jpg',
    description: 'At The Left Hand Of God concert moment',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '103',
    title: 'At The Left Hand Of God - Live Show',
    image: '/images/At the left hand of god/IMG_8058.jpg',
    description: 'At The Left Hand Of God live show',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '104',
    title: 'At The Left Hand Of God - Performance',
    image: '/images/At the left hand of god/IMG_8061.jpg',
    description: 'At The Left Hand Of God performance',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '105',
    title: 'At The Left Hand Of God - On Stage',
    image: '/images/At the left hand of god/IMG_8062.jpg',
    description: 'At The Left Hand Of God on stage',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '106',
    title: 'At The Left Hand Of God - Concert',
    image: '/images/At the left hand of god/IMG_8063.jpg',
    description: 'At The Left Hand Of God concert',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '107',
    title: 'At The Left Hand Of God - Live',
    image: '/images/At the left hand of god/IMG_8072.jpg',
    description: 'At The Left Hand Of God live',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '108',
    title: 'At The Left Hand Of God - Stage',
    image: '/images/At the left hand of god/IMG_8091.jpg',
    description: 'At The Left Hand Of God on stage',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '109',
    title: 'At The Left Hand Of God - Performance',
    image: '/images/At the left hand of god/IMG_8095.jpg',
    description: 'At The Left Hand Of God performance',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '110',
    title: 'At The Left Hand Of God - Live Performance',
    image: '/images/At the left hand of god/IMG_8096.jpg',
    description: 'At The Left Hand Of God performing live',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '111',
    title: 'At The Left Hand Of God - Concert Moment',
    image: '/images/At the left hand of god/IMG_8109.jpg',
    description: 'At The Left Hand Of God concert moment',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '112',
    title: 'At The Left Hand Of God - Live Show',
    image: '/images/At the left hand of god/IMG_8113.jpg',
    description: 'At The Left Hand Of God live show',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '113',
    title: 'At The Left Hand Of God - Performance',
    image: '/images/At the left hand of god/IMG_8115.jpg',
    description: 'At The Left Hand Of God performance',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '114',
    title: 'At The Left Hand Of God - On Stage',
    image: '/images/At the left hand of god/IMG_8116.jpg',
    description: 'At The Left Hand Of God on stage',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '115',
    title: 'At The Left Hand Of God - Concert',
    image: '/images/At the left hand of god/IMG_8121.jpg',
    description: 'At The Left Hand Of God concert',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '116',
    title: 'At The Left Hand Of God - Live',
    image: '/images/At the left hand of god/IMG_8142.jpg',
    description: 'At The Left Hand Of God live',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '117',
    title: 'At The Left Hand Of God - Stage',
    image: '/images/At the left hand of god/IMG_8147.jpg',
    description: 'At The Left Hand Of God on stage',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '118',
    title: 'At The Left Hand Of God - Performance',
    image: '/images/At the left hand of god/IMG_8149.jpg',
    description: 'At The Left Hand Of God performance',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '119',
    title: 'At The Left Hand Of God - Live Performance',
    image: '/images/At the left hand of god/IMG_8156.jpg',
    description: 'At The Left Hand Of God performing live',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '120',
    title: 'At The Left Hand Of God - Concert Moment',
    image: '/images/At the left hand of god/IMG_8158.jpg',
    description: 'At The Left Hand Of God concert moment',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '121',
    title: 'At The Left Hand Of God - Live Show',
    image: '/images/At the left hand of god/IMG_8161.jpg',
    description: 'At The Left Hand Of God live show',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '122',
    title: 'At The Left Hand Of God - Performance',
    image: '/images/At the left hand of god/IMG_8175.jpg',
    description: 'At The Left Hand Of God performance',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '123',
    title: 'At The Left Hand Of God - On Stage',
    image: '/images/At the left hand of god/IMG_8182.jpg',
    description: 'At The Left Hand Of God on stage',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '124',
    title: 'At The Left Hand Of God - Concert',
    image: '/images/At the left hand of god/IMG_8193.jpg',
    description: 'At The Left Hand Of God concert',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  {
    id: '125',
    title: 'At The Left Hand Of God - Live',
    image: '/images/At the left hand of god/IMG_8201.jpg',
    description: 'At The Left Hand Of God live',
    category: 'at-the-left-hand-of-god',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // ATYPICAL BAND IMAGES
  // Category: 'atypical'
  // All images from public/images/atypical/
  // ============================================
  {
    id: '126',
    title: 'Atypical - Live Performance',
    image: '/images/atypical/IMG_8222.jpg',
    description: 'Atypical performing live',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '127',
    title: 'Atypical - Stage Performance',
    image: '/images/atypical/IMG_8226.jpg',
    description: 'Atypical on stage',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '128',
    title: 'Atypical - Concert Moment',
    image: '/images/atypical/IMG_8238.jpg',
    description: 'Atypical concert moment',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '129',
    title: 'Atypical - Live Show',
    image: '/images/atypical/IMG_8240.jpg',
    description: 'Atypical live show',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '130',
    title: 'Atypical - Performance',
    image: '/images/atypical/IMG_8257.jpg',
    description: 'Atypical performance',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '131',
    title: 'Atypical - On Stage',
    image: '/images/atypical/IMG_8258.jpg',
    description: 'Atypical on stage',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '132',
    title: 'Atypical - Concert',
    image: '/images/atypical/IMG_8279.jpg',
    description: 'Atypical concert',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '133',
    title: 'Atypical - Live',
    image: '/images/atypical/IMG_8315.jpg',
    description: 'Atypical live',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '134',
    title: 'Atypical - Stage',
    image: '/images/atypical/IMG_8322.jpg',
    description: 'Atypical on stage',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '135',
    title: 'Atypical - Performance',
    image: '/images/atypical/IMG_8330.jpg',
    description: 'Atypical performance',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '136',
    title: 'Atypical - Live Performance',
    image: '/images/atypical/IMG_8331.jpg',
    description: 'Atypical performing live',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '137',
    title: 'Atypical - Concert Moment',
    image: '/images/atypical/IMG_8333.jpg',
    description: 'Atypical concert moment',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '138',
    title: 'Atypical - Live Show',
    image: '/images/atypical/IMG_8347.jpg',
    description: 'Atypical live show',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '139',
    title: 'Atypical - Performance',
    image: '/images/atypical/IMG_8356.jpg',
    description: 'Atypical performance',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '140',
    title: 'Atypical - On Stage',
    image: '/images/atypical/IMG_8386.jpg',
    description: 'Atypical on stage',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '141',
    title: 'Atypical - Concert',
    image: '/images/atypical/IMG_8394.jpg',
    description: 'Atypical concert',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '142',
    title: 'Atypical - Live',
    image: '/images/atypical/IMG_8400.jpg',
    description: 'Atypical live',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '143',
    title: 'Atypical - Stage',
    image: '/images/atypical/IMG_8413.jpg',
    description: 'Atypical on stage',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '144',
    title: 'Atypical - Performance',
    image: '/images/atypical/IMG_8419.jpg',
    description: 'Atypical performance',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '145',
    title: 'Atypical - Live Performance',
    image: '/images/atypical/IMG_8436.jpg',
    description: 'Atypical performing live',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '146',
    title: 'Atypical - Concert Moment',
    image: '/images/atypical/IMG_8438.jpg',
    description: 'Atypical concert moment',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '147',
    title: 'Atypical - Live Show',
    image: '/images/atypical/IMG_8441.jpg',
    description: 'Atypical live show',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '148',
    title: 'Atypical - Performance',
    image: '/images/atypical/IMG_8442.jpg',
    description: 'Atypical performance',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '149',
    title: 'Atypical - On Stage',
    image: '/images/atypical/IMG_8456.jpg',
    description: 'Atypical on stage',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  {
    id: '150',
    title: 'Atypical - Concert',
    image: '/images/atypical/IMG_8458.jpg',
    description: 'Atypical concert',
    category: 'atypical',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // GURNEY BAND IMAGES
  // Category: 'gurney'
  // All images from public/images/Gurney/gurneyedited/
  // ============================================
  {
    id: '151',
    title: 'Gurney - Live Performance',
    image: '/images/Gurney/gurneyedited/IMG_7822.jpg',
    description: 'Gurney performing live',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '152',
    title: 'Gurney - Stage Performance',
    image: '/images/Gurney/gurneyedited/IMG_7812.jpg',
    description: 'Gurney on stage',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '153',
    title: 'Gurney - Concert Moment',
    image: '/images/Gurney/gurneyedited/IMG_7815.jpg',
    description: 'Gurney concert moment',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '154',
    title: 'Gurney - Live Show',
    image: '/images/Gurney/gurneyedited/IMG_7816.jpg',
    description: 'Gurney live show',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '155',
    title: 'Gurney - Performance',
    image: '/images/Gurney/gurneyedited/IMG_7817.jpg',
    description: 'Gurney performance',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '156',
    title: 'Gurney - On Stage',
    image: '/images/Gurney/gurneyedited/IMG_7819.jpg',
    description: 'Gurney on stage',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '157',
    title: 'Gurney - Concert',
    image: '/images/Gurney/gurneyedited/IMG_7820.jpg',
    description: 'Gurney concert',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '158',
    title: 'Gurney - Live',
    image: '/images/Gurney/gurneyedited/IMG_7822.jpg',
    description: 'Gurney live',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '159',
    title: 'Gurney - Stage',
    image: '/images/Gurney/gurneyedited/IMG_7823.jpg',
    description: 'Gurney on stage',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '160',
    title: 'Gurney - Performance',
    image: '/images/Gurney/gurneyedited/IMG_7824.jpg',
    description: 'Gurney performance',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '161',
    title: 'Gurney - Live Performance',
    image: '/images/Gurney/gurneyedited/IMG_7828.jpg',
    description: 'Gurney performing live',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '162',
    title: 'Gurney - Concert Moment',
    image: '/images/Gurney/gurneyedited/IMG_7830.jpg',
    description: 'Gurney concert moment',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '163',
    title: 'Gurney - Live Show',
    image: '/images/Gurney/gurneyedited/IMG_7831.jpg',
    description: 'Gurney live show',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '164',
    title: 'Gurney - Performance',
    image: '/images/Gurney/gurneyedited/IMG_7832.jpg',
    description: 'Gurney performance',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  {
    id: '165',
    title: 'Gurney - On Stage',
    image: '/images/Gurney/gurneyedited/IMG_7833.jpg',
    description: 'Gurney on stage',
    category: 'gurney',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // ============================================
  // BAD OMENS BAND IMAGES
  // Category: 'bad-omens'
  // All images from public/images/ (Bad Omens PNG files)
  // ============================================
  {
    id: '166',
    title: 'Bad Omens - Promotional',
    image: '/images/Bad Omens.png',
    description: 'Bad Omens promotional content',
    category: 'bad-omens',
    createdAt: new Date().toISOString()
  },
  {
    id: '167',
    title: 'Bad Omens - Event',
    image: '/images/Bad Omens (2).png',
    description: 'Bad Omens event promotion',
    category: 'bad-omens',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // KHAOS THEORY BAND IMAGES (restored)
  // Category: 'khaos-theory'
  // All images from public/images/Khaos Theory/
  // ============================================
  {
    id: '168',
    title: 'Khaos Theory - Concert Moment',
    image: '/images/Khaos Theory/IMG_4946.jpg',
    description: 'Khaos Theory concert moment',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '169',
    title: 'Khaos Theory - Live Show',
    image: '/images/Khaos Theory/IMG_4949.jpg',
    description: 'Khaos Theory live show',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '170',
    title: 'Khaos Theory - Performance',
    image: '/images/Khaos Theory/IMG_4967.jpg',
    description: 'Khaos Theory performance',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '171',
    title: 'Khaos Theory - On Stage',
    image: '/images/Khaos Theory/IMG_4976.jpg',
    description: 'Khaos Theory on stage',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '172',
    title: 'Khaos Theory - Concert',
    image: '/images/Khaos Theory/IMG_4980.jpg',
    description: 'Khaos Theory concert',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '173',
    title: 'Khaos Theory - Live',
    image: '/images/Khaos Theory/IMG_4982.jpg',
    description: 'Khaos Theory live',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '174',
    title: 'Khaos Theory - Stage',
    image: '/images/Khaos Theory/IMG_4991.jpg',
    description: 'Khaos Theory on stage',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '175',
    title: 'Khaos Theory - Performance',
    image: '/images/Khaos Theory/IMG_4993.jpg',
    description: 'Khaos Theory performance',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '176',
    title: 'Khaos Theory - Live Performance',
    image: '/images/Khaos Theory/IMG_4996.jpg',
    description: 'Khaos Theory performing live',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '177',
    title: 'Khaos Theory - Concert Moment',
    image: '/images/Khaos Theory/IMG_5025.jpg',
    description: 'Khaos Theory concert moment',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '178',
    title: 'Khaos Theory - Live Show',
    image: '/images/Khaos Theory/IMG_5043.jpg',
    description: 'Khaos Theory live show',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '179',
    title: 'Khaos Theory - Performance',
    image: '/images/Khaos Theory/IMG_5045.jpg',
    description: 'Khaos Theory performance',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '180',
    title: 'Khaos Theory - On Stage',
    image: '/images/Khaos Theory/IMG_5059.jpg',
    description: 'Khaos Theory on stage',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '181',
    title: 'Khaos Theory - Concert',
    image: '/images/Khaos Theory/IMG_5072.jpg',
    description: 'Khaos Theory concert',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '182',
    title: 'Khaos Theory - Live',
    image: '/images/Khaos Theory/IMG_5080.jpg',
    description: 'Khaos Theory live',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '183',
    title: 'Khaos Theory - Stage',
    image: '/images/Khaos Theory/IMG_5084.jpg',
    description: 'Khaos Theory on stage',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '184',
    title: 'Khaos Theory - Performance',
    image: '/images/Khaos Theory/IMG_5115.jpg',
    description: 'Khaos Theory performance',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '185',
    title: 'Khaos Theory - Live Performance',
    image: '/images/Khaos Theory/IMG_5116.jpg',
    description: 'Khaos Theory performing live',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '186',
    title: 'Khaos Theory - Concert Moment',
    image: '/images/Khaos Theory/IMG_5122.jpg',
    description: 'Khaos Theory concert moment',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '187',
    title: 'Khaos Theory - Live Show',
    image: '/images/Khaos Theory/IMG_5123.jpg',
    description: 'Khaos Theory live show',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '188',
    title: 'Khaos Theory - Performance',
    image: '/images/Khaos Theory/IMG_5142.jpg',
    description: 'Khaos Theory performance',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '189',
    title: 'Khaos Theory - On Stage',
    image: '/images/Khaos Theory/IMG_5161.jpg',
    description: 'Khaos Theory on stage',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '190',
    title: 'Khaos Theory - Concert',
    image: '/images/Khaos Theory/IMG_5168.jpg',
    description: 'Khaos Theory concert',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '191',
    title: 'Khaos Theory - Live',
    image: '/images/Khaos Theory/IMG_5212.jpg',
    description: 'Khaos Theory live',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '192',
    title: 'Khaos Theory - Stage',
    image: '/images/Khaos Theory/IMG_5213.jpg',
    description: 'Khaos Theory on stage',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '193',
    title: 'Khaos Theory - Performance',
    image: '/images/Khaos Theory/IMG_5220.jpg',
    description: 'Khaos Theory performance',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '194',
    title: 'Khaos Theory - Live Performance',
    image: '/images/Khaos Theory/IMG_5228.jpg',
    description: 'Khaos Theory performing live',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '195',
    title: 'Khaos Theory - Concert Moment',
    image: '/images/Khaos Theory/IMG_5235.jpg',
    description: 'Khaos Theory concert moment',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  {
    id: '196',
    title: 'Khaos Theory - Live Show',
    image: '/images/Khaos Theory/IMG_5251.jpg',
    description: 'Khaos Theory live show',
    category: 'khaos-theory',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // STRATGAZER BAND IMAGES
  // Category: 'stratgazer'
  // All images from public/images/Stratgazer/stratgazeredited/
  // ============================================
  {
    id: '198',
    title: 'Stratgazer - Live Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_8949.jpg',
    description: 'Stratgazer performing live',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '199',
    title: 'Stratgazer - Stage Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_8956.jpg',
    description: 'Stratgazer on stage',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '200',
    title: 'Stratgazer - Concert Moment',
    image: '/images/Stratgazer/stratgazeredited/IMG_8957.jpg',
    description: 'Stratgazer concert moment',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '201',
    title: 'Stratgazer - Live Show',
    image: '/images/Stratgazer/stratgazeredited/IMG_8966.jpg',
    description: 'Stratgazer live show',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '202',
    title: 'Stratgazer - Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_8967.jpg',
    description: 'Stratgazer performance',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '203',
    title: 'Stratgazer - On Stage',
    image: '/images/Stratgazer/stratgazeredited/IMG_8981.jpg',
    description: 'Stratgazer on stage',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '204',
    title: 'Stratgazer - Concert',
    image: '/images/Stratgazer/stratgazeredited/IMG_8984.jpg',
    description: 'Stratgazer concert',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '205',
    title: 'Stratgazer - Live',
    image: '/images/Stratgazer/stratgazeredited/IMG_8988.jpg',
    description: 'Stratgazer live',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '206',
    title: 'Stratgazer - Stage',
    image: '/images/Stratgazer/stratgazeredited/IMG_9006.jpg',
    description: 'Stratgazer on stage',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '207',
    title: 'Stratgazer - Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_9012.jpg',
    description: 'Stratgazer performance',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '208',
    title: 'Stratgazer - Live Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_9016.jpg',
    description: 'Stratgazer performing live',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '209',
    title: 'Stratgazer - Concert Moment',
    image: '/images/Stratgazer/stratgazeredited/IMG_9020.jpg',
    description: 'Stratgazer concert moment',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '210',
    title: 'Stratgazer - Live Show',
    image: '/images/Stratgazer/stratgazeredited/IMG_9024.jpg',
    description: 'Stratgazer live show',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '211',
    title: 'Stratgazer - Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_9025-2.jpg',
    description: 'Stratgazer performance',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '212',
    title: 'Stratgazer - On Stage',
    image: '/images/Stratgazer/stratgazeredited/IMG_9048.jpg',
    description: 'Stratgazer on stage',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '213',
    title: 'Stratgazer - Concert',
    image: '/images/Stratgazer/stratgazeredited/IMG_9053.jpg',
    description: 'Stratgazer concert',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '214',
    title: 'Stratgazer - Live',
    image: '/images/Stratgazer/stratgazeredited/IMG_9062.jpg',
    description: 'Stratgazer live',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '215',
    title: 'Stratgazer - Stage',
    image: '/images/Stratgazer/stratgazeredited/IMG_9063.jpg',
    description: 'Stratgazer on stage',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '216',
    title: 'Stratgazer - Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_9087.jpg',
    description: 'Stratgazer performance',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '217',
    title: 'Stratgazer - Live Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_9091.jpg',
    description: 'Stratgazer performing live',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '218',
    title: 'Stratgazer - Concert Moment',
    image: '/images/Stratgazer/stratgazeredited/IMG_9108.jpg',
    description: 'Stratgazer concert moment',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '219',
    title: 'Stratgazer - Live Show',
    image: '/images/Stratgazer/stratgazeredited/IMG_9126.jpg',
    description: 'Stratgazer live show',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '220',
    title: 'Stratgazer - Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_9130.jpg',
    description: 'Stratgazer performance',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '221',
    title: 'Stratgazer - On Stage',
    image: '/images/Stratgazer/stratgazeredited/IMG_9133.jpg',
    description: 'Stratgazer on stage',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '222',
    title: 'Stratgazer - Concert',
    image: '/images/Stratgazer/stratgazeredited/IMG_9134.jpg',
    description: 'Stratgazer concert',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '223',
    title: 'Stratgazer - Live',
    image: '/images/Stratgazer/stratgazeredited/IMG_9180.jpg',
    description: 'Stratgazer live',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '224',
    title: 'Stratgazer - Stage',
    image: '/images/Stratgazer/stratgazeredited/IMG_9193.jpg',
    description: 'Stratgazer on stage',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '225',
    title: 'Stratgazer - Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_9206.jpg',
    description: 'Stratgazer performance',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '226',
    title: 'Stratgazer - Live Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_9207.jpg',
    description: 'Stratgazer performing live',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '227',
    title: 'Stratgazer - Concert Moment',
    image: '/images/Stratgazer/stratgazeredited/IMG_9212.jpg',
    description: 'Stratgazer concert moment',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '228',
    title: 'Stratgazer - Live Show',
    image: '/images/Stratgazer/stratgazeredited/IMG_9215.jpg',
    description: 'Stratgazer live show',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '229',
    title: 'Stratgazer - Performance',
    image: '/images/Stratgazer/stratgazeredited/IMG_9216.jpg',
    description: 'Stratgazer performance',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '230',
    title: 'Stratgazer - On Stage',
    image: '/images/Stratgazer/stratgazeredited/IMG_9220.jpg',
    description: 'Stratgazer on stage',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '231',
    title: 'Stratgazer - Concert',
    image: '/images/Stratgazer/stratgazeredited/IMG_9236.jpg',
    description: 'Stratgazer concert',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '232',
    title: 'Stratgazer - Live',
    image: '/images/Stratgazer/stratgazeredited/IMG_9265.jpg',
    description: 'Stratgazer live',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  {
    id: '233',
    title: 'Stratgazer - Stage',
    image: '/images/Stratgazer/stratgazeredited/IMG_9270.jpg',
    description: 'Stratgazer on stage',
    category: 'stratgazer',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // T-BOOTY BAND IMAGES
  // Category: 't-booty'
  // All images from public/images/T-Booty/
  // ============================================
  {
    id: '234',
    title: 'T-Booty - Live Performance',
    image: '/images/T-Booty/IMG_8677.jpg',
    description: 'T-Booty performing live',
    category: 't-booty',
    createdAt: new Date().toISOString()
  },
  {
    id: '235',
    title: 'T-Booty - Stage Performance',
    image: '/images/T-Booty/IMG_8679.jpg',
    description: 'T-Booty on stage',
    category: 't-booty',
    createdAt: new Date().toISOString()
  },
  {
    id: '236',
    title: 'T-Booty - Concert Moment',
    image: '/images/T-Booty/IMG_8681.jpg',
    description: 'T-Booty concert moment',
    category: 't-booty',
    createdAt: new Date().toISOString()
  },
  {
    id: '237',
    title: 'T-Booty - Live Show',
    image: '/images/T-Booty/IMG_8687.jpg',
    description: 'T-Booty live show',
    category: 't-booty',
    createdAt: new Date().toISOString()
  },
  {
    id: '238',
    title: 'T-Booty - Performance',
    image: '/images/T-Booty/IMG_8701.jpg',
    description: 'T-Booty performance',
    category: 't-booty',
    createdAt: new Date().toISOString()
  },
  {
    id: '239',
    title: 'T-Booty - On Stage',
    image: '/images/T-Booty/IMG_8707.jpg',
    description: 'T-Booty on stage',
    category: 't-booty',
    createdAt: new Date().toISOString()
  },
  {
    id: '240',
    title: 'T-Booty - Concert',
    image: '/images/T-Booty/IMG_8717.jpg',
    description: 'T-Booty concert',
    category: 't-booty',
    createdAt: new Date().toISOString()
  },
  {
    id: '241',
    title: 'T-Booty - Live',
    image: '/images/T-Booty/IMG_8719.jpg',
    description: 'T-Booty live',
    category: 't-booty',
    createdAt: new Date().toISOString()
  },
  {
    id: '242',
    title: 'T-Booty - Stage',
    image: '/images/T-Booty/IMG_8722.jpg',
    description: 'T-Booty on stage',
    category: 't-booty',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // WHEATSTATE BAND IMAGES
  // Category: 'wheatstate'
  // All images from public/images/wheatstate/
  // ============================================
  {
    id: '243',
    title: 'Wheatstate - Live Performance',
    image: '/images/wheatstate/IMG_5602.jpg',
    description: 'Wheatstate performing live',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '244',
    title: 'Wheatstate - Stage Performance',
    image: '/images/wheatstate/IMG_5610.jpg',
    description: 'Wheatstate on stage',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '245',
    title: 'Wheatstate - Concert Moment',
    image: '/images/wheatstate/IMG_5612.jpg',
    description: 'Wheatstate concert moment',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '246',
    title: 'Wheatstate - Live Show',
    image: '/images/wheatstate/IMG_5613.jpg',
    description: 'Wheatstate live show',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '247',
    title: 'Wheatstate - Performance',
    image: '/images/wheatstate/IMG_5625.jpg',
    description: 'Wheatstate performance',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '248',
    title: 'Wheatstate - On Stage',
    image: '/images/wheatstate/IMG_5626.jpg',
    description: 'Wheatstate on stage',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '249',
    title: 'Wheatstate - Concert',
    image: '/images/wheatstate/IMG_5670.jpg',
    description: 'Wheatstate concert',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '250',
    title: 'Wheatstate - Live',
    image: '/images/wheatstate/IMG_5676.jpg',
    description: 'Wheatstate live',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '251',
    title: 'Wheatstate - Stage',
    image: '/images/wheatstate/IMG_5695.jpg',
    description: 'Wheatstate on stage',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '252',
    title: 'Wheatstate - Performance',
    image: '/images/wheatstate/IMG_5697.jpg',
    description: 'Wheatstate performance',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '253',
    title: 'Wheatstate - Live Performance',
    image: '/images/wheatstate/IMG_8944.jpg',
    description: 'Wheatstate performing live',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  {
    id: '254',
    title: 'Wheatstate - Concert Moment',
    image: '/images/wheatstate/IMG_8961.jpg',
    description: 'Wheatstate concert moment',
    category: 'wheatstate',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // WES HOFFMAN BAND IMAGES
  // Category: 'wes-hoffman'
  // All images from public/images/Wes Hoffman/
  // ============================================
  {
    id: '255',
    title: 'Wes Hoffman - Live Performance',
    image: '/images/Wes Hoffman/IMG_5258.jpg',
    description: 'Wes Hoffman performing live',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '256',
    title: 'Wes Hoffman - Stage Performance',
    image: '/images/Wes Hoffman/IMG_5270.jpg',
    description: 'Wes Hoffman on stage',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '257',
    title: 'Wes Hoffman - Concert Moment',
    image: '/images/Wes Hoffman/IMG_5271.jpg',
    description: 'Wes Hoffman concert moment',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '258',
    title: 'Wes Hoffman - Live Show',
    image: '/images/Wes Hoffman/IMG_5272.jpg',
    description: 'Wes Hoffman live show',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '259',
    title: 'Wes Hoffman - Performance',
    image: '/images/Wes Hoffman/IMG_5276.jpg',
    description: 'Wes Hoffman performance',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '260',
    title: 'Wes Hoffman - On Stage',
    image: '/images/Wes Hoffman/IMG_5286.jpg',
    description: 'Wes Hoffman on stage',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '261',
    title: 'Wes Hoffman - Live',
    image: '/images/Wes Hoffman/IMG_5318.jpg',
    description: 'Wes Hoffman live',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '262',
    title: 'Wes Hoffman - Stage',
    image: '/images/Wes Hoffman/IMG_5333.jpg',
    description: 'Wes Hoffman on stage',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '263',
    title: 'Wes Hoffman - Performance',
    image: '/images/Wes Hoffman/IMG_5356.jpg',
    description: 'Wes Hoffman performance',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '264',
    title: 'Wes Hoffman - Live Performance',
    image: '/images/Wes Hoffman/IMG_5364.jpg',
    description: 'Wes Hoffman performing live',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '265',
    title: 'Wes Hoffman - Concert Moment',
    image: '/images/Wes Hoffman/IMG_5365.jpg',
    description: 'Wes Hoffman concert moment',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '266',
    title: 'Wes Hoffman - Live Show',
    image: '/images/Wes Hoffman/IMG_5369.jpg',
    description: 'Wes Hoffman live show',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '267',
    title: 'Wes Hoffman - Performance',
    image: '/images/Wes Hoffman/IMG_5397.jpg',
    description: 'Wes Hoffman performance',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '268',
    title: 'Wes Hoffman - On Stage',
    image: '/images/Wes Hoffman/IMG_5405.jpg',
    description: 'Wes Hoffman on stage',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '269',
    title: 'Wes Hoffman - Concert',
    image: '/images/Wes Hoffman/IMG_5409.jpg',
    description: 'Wes Hoffman concert',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '270',
    title: 'Wes Hoffman - Live',
    image: '/images/Wes Hoffman/IMG_5418.jpg',
    description: 'Wes Hoffman live',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '271',
    title: 'Wes Hoffman - Stage',
    image: '/images/Wes Hoffman/IMG_5424.jpg',
    description: 'Wes Hoffman on stage',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '272',
    title: 'Wes Hoffman - Performance',
    image: '/images/Wes Hoffman/IMG_5427.jpg',
    description: 'Wes Hoffman performance',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '273',
    title: 'Wes Hoffman - Live Performance',
    image: '/images/Wes Hoffman/IMG_5448.jpg',
    description: 'Wes Hoffman performing live',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '274',
    title: 'Wes Hoffman - Concert Moment',
    image: '/images/Wes Hoffman/IMG_5455.jpg',
    description: 'Wes Hoffman concert moment',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '275',
    title: 'Wes Hoffman - Live Show',
    image: '/images/Wes Hoffman/IMG_5459.jpg',
    description: 'Wes Hoffman live show',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '276',
    title: 'Wes Hoffman - Performance',
    image: '/images/Wes Hoffman/IMG_5470.jpg',
    description: 'Wes Hoffman performance',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '277',
    title: 'Wes Hoffman - On Stage',
    image: '/images/Wes Hoffman/IMG_5543.jpg',
    description: 'Wes Hoffman on stage',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  {
    id: '278',
    title: 'Wes Hoffman - Concert',
    image: '/images/Wes Hoffman/IMG_8938.jpg',
    description: 'Wes Hoffman concert',
    category: 'wes-hoffman',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // THE PLOT IN YOU BAND IMAGES
  // Category: 'the-plot-in-you'
  // All images from public/images/
  // ============================================
  {
    id: '279',
    title: 'The Plot in You - Page 1',
    image: '/images/The Plot in you pg1.png',
    description: 'The Plot in You',
    category: 'the-plot-in-you',
    createdAt: new Date().toISOString()
  },
  {
    id: '280',
    title: 'The Plot in You - Page 2',
    image: '/images/The Plot in You pg2.png',
    description: 'The Plot in You',
    category: 'the-plot-in-you',
    createdAt: new Date().toISOString()
  },
  {
    id: '281',
    title: 'The Plot in You - Page 3',
    image: '/images/The Plot in You pg3.png',
    description: 'The Plot in You',
    category: 'the-plot-in-you',
    createdAt: new Date().toISOString()
  },
  {
    id: '282',
    title: 'The Plot in You - Page 4',
    image: '/images/The Plot in You pg4.png',
    description: 'The Plot in You',
    category: 'the-plot-in-you',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // NOT JUST A PHASE FEST 25 IMAGES
  // Category: 'not-just-a-phase-fest-25'
  // All images from public/images/
  // ============================================
  {
    id: '283',
    title: 'Not Just a Phase Fest 25 - Page 1',
    image: '/images/Not Just a Phase Fest 25 pg1.png',
    description: 'Not Just a Phase Fest 25',
    category: 'not-just-a-phase-fest-25',
    createdAt: new Date().toISOString()
  },
  {
    id: '284',
    title: 'Not Just a Phase Fest 25 - Page 2',
    image: '/images/Not Just a Phase Fest 25 pg2.png',
    description: 'Not Just a Phase Fest 25',
    category: 'not-just-a-phase-fest-25',
    createdAt: new Date().toISOString()
  },
  {
    id: '285',
    title: 'Not Just a Phase Fest 25 - Page 3',
    image: '/images/Not Just a Phase Fest 25 pg3.png',
    description: 'Not Just a Phase Fest 25',
    category: 'not-just-a-phase-fest-25',
    createdAt: new Date().toISOString()
  },
  {
    id: '286',
    title: 'Not Just a Phase Fest 25 - Page 4',
    image: '/images/Not Just a Phase Fest 25 pg4.png',
    description: 'Not Just a Phase Fest 25',
    category: 'not-just-a-phase-fest-25',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // INVENT ANIMATE BAND IMAGE
  // Category: 'invent-animate'
  // ============================================
  {
    id: '287',
    title: 'Invent Animate',
    image: '/images/Invent Animate.png',
    description: 'Invent Animate',
    category: 'invent-animate',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // IN THIS MOMENT BAND IMAGE
  // Category: 'in-this-moment'
  // ============================================
  {
    id: '288',
    title: 'In This Moment',
    image: '/images/In This Moment.png',
    description: 'In This Moment',
    category: 'in-this-moment',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // NORTHLANE BAND IMAGE
  // Category: 'northlane'
  // ============================================
  {
    id: '289',
    title: 'Northlane',
    image: '/images/Northlane.png',
    description: 'Northlane',
    category: 'northlane',
    createdAt: new Date().toISOString()
  },
  // ============================================
  // RELENT — from public/images/relent/
  // ============================================
  { id: '348', title: 'Relent', image: '/images/relent/IMG_3955.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '349', title: 'Relent', image: '/images/relent/IMG_8484.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '350', title: 'Relent', image: '/images/relent/IMG_8494.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '351', title: 'Relent', image: '/images/relent/IMG_8499.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '352', title: 'Relent', image: '/images/relent/IMG_8507.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '353', title: 'Relent', image: '/images/relent/IMG_8514.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '354', title: 'Relent', image: '/images/relent/IMG_8520.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '355', title: 'Relent', image: '/images/relent/IMG_8522.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '356', title: 'Relent', image: '/images/relent/IMG_8533.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '357', title: 'Relent', image: '/images/relent/IMG_8534.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '358', title: 'Relent', image: '/images/relent/IMG_8535.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '359', title: 'Relent', image: '/images/relent/IMG_8548.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '360', title: 'Relent', image: '/images/relent/IMG_8549.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '361', title: 'Relent', image: '/images/relent/IMG_8550.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '362', title: 'Relent', image: '/images/relent/IMG_8551.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '363', title: 'Relent', image: '/images/relent/IMG_8558.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '364', title: 'Relent', image: '/images/relent/IMG_8559.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '365', title: 'Relent', image: '/images/relent/IMG_8568.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '366', title: 'Relent', image: '/images/relent/IMG_8571.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '367', title: 'Relent', image: '/images/relent/IMG_8575.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '368', title: 'Relent', image: '/images/relent/IMG_8585.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '369', title: 'Relent', image: '/images/relent/IMG_8588.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '370', title: 'Relent', image: '/images/relent/IMG_8594.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  { id: '371', title: 'Relent', image: '/images/relent/IMG_8609.jpg', description: 'Relent', category: 'relent', createdAt: new Date().toISOString() },
  // ============================================
  // VIDEOGRAPHY — videos from public/videos/
  // ============================================
  { id: '372', title: 'Concert Video', image: '', video: '/videos/VID_20260112_185225.mp4', description: 'Concert videography', category: 'videography', createdAt: new Date().toISOString() },
  { id: '373', title: 'Concert Video', image: '', video: '/videos/VID_20260112_185218.mp4', description: 'Concert videography', category: 'videography', createdAt: new Date().toISOString() },
  { id: '374', title: 'Concert Video', image: '', video: '/videos/VID_20260112_185221.mp4', description: 'Concert videography', category: 'videography', createdAt: new Date().toISOString() },
  { id: '375', title: 'Concert Video', image: '', video: '/videos/VID_20260112_185227.mp4', description: 'Concert videography', category: 'videography', createdAt: new Date().toISOString() }
];

/**
 * Get all gallery images
 * Supports optional filtering by category and limiting results
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} [req.query.category] - Filter by category (e.g., 'bats', 'moire')
 * @param {string} [req.query.limit] - Maximum number of images to return
 * @param {Object} res - Express response object
 */
export const getGalleryImages = (req, res) => {
  try {
    // Extract query parameters for filtering
    const { category, limit } = req.query;
    
    // Server-side validation of category parameter
    if (category && typeof category !== 'string') {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid category parameter' }
      });
    }

    // Validate category format (alphanumeric, hyphens, underscores only)
    if (category && !/^[a-z0-9_-]+$/.test(category)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid category format' }
      });
    }
    
    // Create a copy of all images to avoid mutating the original array
    let filteredImages = [...galleryImages];

    // Filter by category if provided (e.g., ?category=bats)
    if (category) {
      filteredImages = filteredImages.filter(img => img.category === category);
    }

    // Limit results if provided (e.g., ?limit=10)
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        return res.status(400).json({
          success: false,
          error: { message: 'Limit must be between 1 and 100' }
        });
      }
      filteredImages = filteredImages.slice(0, limitNum);
    }

    // Sanitize response - ensure no secrets leak
    const sanitizedImages = filteredImages.map(img => ({
      id: img.id,
      title: img.title,
      image: img.image,
      video: img.video,
      description: img.description,
      category: img.category,
      createdAt: img.createdAt
    }));

    res.json({
      success: true,
      count: sanitizedImages.length,
      data: sanitizedImages
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to fetch gallery images' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Get gallery image by ID
export const getGalleryImageById = (req, res) => {
  try {
    const { id } = req.params;
    
    // Server-side validation (defense in depth)
    if (!id || typeof id !== 'string' || id.length > 100) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid image ID' }
      });
    }

    const image = galleryImages.find(img => img.id === id);

    if (!image) {
      return res.status(404).json({
        success: false,
        error: { message: 'Gallery image not found' }
      });
    }

    // Sanitize response - only return safe fields
    const sanitizedImage = {
      id: image.id,
      title: image.title,
      image: image.image,
      video: image.video,
      description: image.description,
      category: image.category,
      createdAt: image.createdAt
    };

    res.json({
      success: true,
      data: sanitizedImage
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to fetch gallery image' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

// Add gallery image (admin)
export const addGalleryImage = (req, res) => {
  try {
    const newImage = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    galleryImages.push(newImage);

    res.status(201).json({
      success: true,
      message: 'Gallery image added successfully',
      data: newImage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Failed to add gallery image' }
    });
  }
};

// Delete gallery image (admin only)
export const deleteGalleryImage = (req, res) => {
  try {
    const { id } = req.params;
    
    // Server-side validation (defense in depth)
    if (!id || typeof id !== 'string' || id.length > 100) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid image ID' }
      });
    }

    const imageIndex = galleryImages.findIndex(img => img.id === id);

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        error: { message: 'Gallery image not found' }
      });
    }

    galleryImages.splice(imageIndex, 1);

    res.json({
      success: true,
      message: 'Gallery image deleted successfully'
    });
  } catch (error) {
    const errorMessage = process.env.NODE_ENV === 'production' 
      ? 'Failed to delete gallery image' 
      : error.message;
    
    res.status(500).json({
      success: false,
      error: { message: errorMessage }
    });
  }
};

