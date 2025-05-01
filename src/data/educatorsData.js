// Datos de ejemplo para educadores

// Placeholder data for educators without specific info
const placeholderDesc = 'Educador experto en su campo, comprometido con el éxito de los estudiantes.';
const placeholderSocial = {
    instagram: '#', // Usar # si no hay enlace real
    linkedin: '#',
    facebook: '#'
};

const educatorsData = {
  forex: [
    {
      id: 'seb-garcia',
      name: 'Sebastian Garcia',
      title: 'Educador en finanzas',
      status: 'Ausente',
      img: 'https://picsum.photos/seed/forex1/400/300',
      profileImageFilename: 'Sebastian.jpg',
      description: `Soy un educador con más de 10 años de experiencia en el trading, habiendo guiado a más de 1,000 estudiantes a transformar sus resultados en los gráficos y en sus vidas. Mi enfoque combina estrategias efectivas de Smart Money con herramientas avanzadas de PNL (Programación Neurolingüística), permitiendo a mis estudiantes duplicar sus resultados en 90 días.`,
      language: 'es',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4650284/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '22599057'
    },
    {
      id: 'abi-belity',
      name: 'Abi Belilty',
      title: 'Educador en finanzas',
      status: 'En vivo',
      viewers: 4200,
      img: 'https://picsum.photos/seed/forex2/400/300',
      profileImageFilename: 'Abi.jpg',
      description: `Abi Belilty es un trader profesional con más de 7 años de experiencia en los mercados financieros. Con una pasión innata por el trading, Abi ha dedicado años de su vida a perfeccionar sus habilidades y conocimientos en el mundo de las inversiones.\n\nCon una visión única y perspicaz, Abi invita a personas de todo el mundo a conectarse a sus sesiones, donde comparte sus estrategias favoritas y consejos clave para llevar el trading a un nivel superior. Su enfoque práctico y su capacidad para simplificar conceptos complejos hacen que sus sesiones sean accesibles y valiosas para traders de todos los niveles.`,
      language: 'es',
      socialLinks: {
          instagram: 'https://instagram.com/abibelity',
          linkedin: 'https://linkedin.com/in/abibelity',
          facebook: 'https://facebook.com/abibelity'
      },
      vimeoLiveEmbed: 'https://vimeo.com/event/4650278/embed/interaction',
      vimeoUserId: '221550365',
      vimeoFolderId: '22599055',
      sessions: [
        { id: 'vid1', title: 'Introducción al Mercado Forex', vimeoId: '821637631' },
        { id: 'vid2', title: 'Análisis de Tendencias', vimeoId: '821637631' },
        { id: 'vid3', title: 'Gestión de Riesgo Esencial', vimeoId: '821637631' },
        { id: 'vid4', title: 'Psicología del Trading', vimeoId: '821637631' },
      ]
    },
    {
      id: 'frank-araujo', 
      name: 'Franklin Araujo', 
      title: 'Educador en finanzas', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/forex3/400/300',
      profileImageFilename: 'Franklin.jpg',
      description: `Trader con más de 5 años de experiencia en los mercados financieros, especializado en el par EUR/USD. Como swing trader, te brindaré las herramientas correctas para que aprendas trading desde lo más básico hasta lo más avanzado, con un enfoque claro en dominar las gráficas y entender el comportamiento del mercado de forma profesional.`,
      language: 'es',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4827795/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '25090053'
    },
    {
      id: 'maur-gaytan', 
      name: 'Mauricio Gaytán', 
      title: 'Educador en finanzas', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/forex4/400/300',
      profileImageFilename: 'Mauricio.jpg', 
      description: `Ingeniero de Profesión, Coach de Liderazgo Certificado, 4 años como Trader, especializado en operar el XAU y los JPY con estrategia propia, casado con dos hijas.`,
      language: 'es',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/5033739/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '24795411'
    },
    {
      id: 'aring-long-fx',
      name: 'Aring Long', 
      title: 'Educador Forex', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/aringlong/400/300',
      profileImageFilename: 'Arin.jpg',
      description: `Arin Long has a true passion for education and a strong foundation in problem-solving and process optimization, which she developed during her career as a mechanical engineer. With a natural affinity for technical analysis, she transitioned into trading five years ago and quickly developed a deep passion for the markets. Arin's trading approach is grounded in her technical mindset and meticulous attention to detail, skills she further refined through mentorship with Richard Hall (aka Market Bully). By mastering simple yet powerful strategies, Arin remains committed to continuous learning, constantly refining her techniques and expanding her market knowledge.`,
      language: 'en',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4865934/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '23714506'
    },
    {
      id: 'marcelo-t-fx',
      name: 'Marcelo Trullen', 
      title: 'Educador Forex', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/marcelot/400/300',
      profileImageFilename: 'Marcelo.jpg',
      description: `Soy Marcelo Trullen, experto en E-commerce y Marketing Digital. Mi pasión por el crecimiento digital y la búsqueda continua de soluciones efectivas me ha permitido ayudar a los equipos a llevar sus negocios al siguiente nivel. Estoy comprometido con el aprendizaje continuo y la implementación de soluciones de vanguardia en el mundo del comercio electrónico.`,
      language: 'es',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4778572/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '23181251'
    },
    {
      id: 'richard-p-fx',
      name: 'Richard Hall Pops',
      title: 'Educador Forex', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/richardp/400/300', 
      profileImageFilename: 'Richard Pops.jpg',
      description: placeholderDesc,
      language: 'en',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4650337/embed', 
      vimeoUserId: '221550365', 
      vimeoFolderId: '22598297' 
    },
    {
      id: 'about-nikki-fx',
      name: 'Nikki Sutherland',
      title: 'Educador Forex', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/aboutnikki/400/300',
      profileImageFilename: 'Nikki S.jpg',
      description: placeholderDesc,
      language: 'en',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4759785/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '23029602'
    },
    {
      id: 'jorge-damelines',
      name: 'Jorge Damelines', 
      title: 'Educador Forex', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/jorged/400/300',
      profileImageFilename: 'Jorge.jpg',
      description: `Experto en desarrollo y evolución humana, guía de experiencias transformadoras, Acompañando procesos de autoconocimiento, poder interior y acción consciente`,
      language: 'es',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/5032569/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '24795326'
    },
    {
      id: 'jeff-beausoleil',
      name: 'Jeff Beausoleil', 
      title: 'Educador Forex', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/jeffb/400/300',
      profileImageFilename: 'Jeff B.jpg',
      description: `My name is Jeffrey Beausoleil, and I'm 25 years old, living on the South Shore of Montreal, Canada. Born without my right hand and foot, I faced many challenges growing up, including bullying and difficulty making friends. Despite this, I remained energetic and positive, playing sports like soccer, handball, basketball, and football, never letting my disability limit me.\n\nMy journey led me to give over 250 speeches on bullying prevention and motivation across Quebec and Ontario, reaching 50,000 people at one event. However, when COVID-19 hit, I had to pause my speaking engagements and return to school, where I studied journalism but was unhappy with the career path. That's when I discovered trading, initially struggling with misconceptions and failures, but eventually succeeding after three years of hard work and persistence.`,
      language: 'fr',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4650303/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '22599046'
    },
    {
      id: 'paulina',
      name: 'Ana Paulina',
      title: 'Educadora Forex',
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/estate2/400/300',
      profileImageFilename: 'Ana P.jpg', 
      description: placeholderDesc,
      language: 'es',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4650299/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '22599101'
    },
    {
      id: 'henry-tyson',
      name: 'Andre Tyson',
      title: 'Educador Forex',
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/estate5/400/300',
      profileImageFilename: 'Andre.jpg',
      description: `I am strong and passionate person about what I do. As long as I put my mind to it I can achieve it. I put god first into everything I do`,
      language: 'en',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4932282/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '24263935'
    },
  ],
  crypto: [
    { 
      id: 'corey-williams', 
      name: 'Corey Williams', 
      title: 'Educador Crypto', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/crypto1/400/300',
      profileImageFilename: 'Corey.jpg',
      description: placeholderDesc,
      language: 'en',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4839566/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '23714510'
    },
  ],
  'financial-literacy': [
    { 
      id: 'dani-curtis', 
      name: 'Raquel Curtis',
      title: 'Educadora Finanzas', 
      status: 'En vivo', 
      viewers: 1500, 
      img: 'https://picsum.photos/seed/finlit1/400/300',
      profileImageFilename: 'Raquel.jpg',
      description: `Raquel Curtis, MBA, is a financial educator, entrepreneur, and international best-selling author dedicated to helping women take control of their finances and build wealth. A Georgia native and mother of three, Raquel turned personal setbacks into success through budgeting and investing, inspiring the creation of The Boujee Banker brand. She teaches women how to budget, save, invest, and grow online businesses. Raquel is the author of Mastering Your Money Mindset and co-author of the Amazon best-seller MoneyTalk$, featuring a foreword by Les Brown. A dynamic speaker and doctoral candidate, she has impacted thousands globally, guiding individuals toward lasting financial empowerment.`,
      language: 'en',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4839563/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '23714509'
    },
    { 
      id: 'annie-toney', 
      name: 'Angie Toney',
      title: 'Educadora Finanzas', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/finlit2/400/300',
      profileImageFilename: 'Angie.jpg',
      description: placeholderDesc,
      language: 'en',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4650197/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '22599084'
    },
    { 
      id: 'al-blue', 
      name: 'Dr. ALBLUE', 
      title: 'Educador Finanzas', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/finlit3/400/300',
      profileImageFilename: 'Dr. Blue.jpg',
      description: `Dr. A.L.Blue, Sr. Is an bestselling Author, Wealth evangelist & private equity investor serving as Senior Partner & managing director of Blue Wealth Solutions Consolidated LLC, A better life financial empowerment, Wealth Building, & Educational Company focused on true wealth creation and asset accumulation in Precious Metals as well as generational wealth and trust fund creation solutions. He also serve as a Wealth evangelist teaching biblical principles on wealth creation and better living from a spiritual perspective as a Kingdom Financier.`,
      language: 'en',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4849962/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '23782091'
    },
  ],
  'marketing-digital': [
    { 
      id: 'steph-royal', 
      name: 'Stephon Royal', 
      title: 'Educador Marketing', 
      status: 'Ausente', 
      img: 'https://picsum.photos/seed/marketing1/400/300',
      profileImageFilename: 'Stephon.jpg',
      description: `Stephon Royal is a passionate and dynamic social media educator dedicated to empowering individuals and businesses to master the art of digital storytelling and online influence. With years of experience in creating viral-worthy content and building impactful online brands, Stephon combines creativity with strategy to help students unlock the full potential of social media platforms\n\nSpecializing in content creation, audience engagement, and monetization strategies, Stephon has developed a reputation for delivering practical insights, innovative techniques, and actionable solutions. Whether you're a beginner influencer, a small business owner, or a seasoned marketer, Stephon's approachable teaching style ensures every student walks away with the skills and confidence to thrive in the ever-evolving world of social media.\n\nKnown for his energetic workshops and personalized coaching, Stephon's mission is simple: to help you build a brand that not only stands out but also connects, converts, and creates lasting impact.`,
      language: 'en',
      socialLinks: placeholderSocial,
      vimeoLiveEmbed: 'https://vimeo.com/event/4849959/embed',
      vimeoUserId: '221550365',
      vimeoFolderId: '23782095'
    },
  ],
};

export default educatorsData;