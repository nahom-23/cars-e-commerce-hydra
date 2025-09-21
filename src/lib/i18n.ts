export const languages = {
  en: 'English',
  zh: '中文',
  ar: 'العربية',
  fr: 'Français',
  hi: 'हिन्दी',
  es: 'Español',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский'
}

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    catalog: 'Catalog',
    cart: 'Cart',
    contact: 'Contact',
    account: 'Account',
    login: 'Login',
    logout: 'Logout',
    signup: 'Sign Up',
    
    // Product Categories
    lightCars: 'Light Cars',
    heavyTrucks: 'Heavy Trucks & Buses',
    construction: 'Construction Machinery',
    engines: 'Engines',
    generators: 'Generators',
    motorbikes: 'Motorbikes & Bicycles',
    agricultural: 'Agricultural Machinery',
    chineseVehicles: 'Chinese Vehicles',
    electricCars: 'Electric Cars',
    
    // Common Actions
    search: 'Search',
    addToCart: 'Add to Cart',
    viewMore: 'View More',
    download: 'Download',
    buy: 'Buy Now',
    
    // Messages
    welcome: 'Welcome to Auto Parts Catalog',
    instantDownload: 'Instant Download',
    bestPrices: 'Best Prices',
    remoteSupport: 'Remote Support',
    
    // Footer
    aboutUs: 'About Us',
    termsConditions: 'Terms & Conditions',
    howToPay: 'How to Pay',
    requestQuote: 'Request Quote',
    refundPolicy: 'Refund Policy'
  },
  
  zh: {
    // Navigation
    home: '首页',
    catalog: '产品目录',
    cart: '购物车',
    contact: '联系我们',
    account: '账户',
    login: '登录',
    logout: '退出',
    signup: '注册',
    
    // Product Categories
    lightCars: '轻型车',
    heavyTrucks: '重型卡车和巴士',
    construction: '工程机械',
    engines: '发动机',
    generators: '发电机',
    motorbikes: '摩托车和自行车',
    agricultural: '农业机械',
    chineseVehicles: '中国车辆',
    electricCars: '电动汽车',
    
    // Common Actions
    search: '搜索',
    addToCart: '加入购物车',
    viewMore: '查看更多',
    download: '下载',
    buy: '立即购买',
    
    // Messages
    welcome: '欢迎来到汽车零件目录',
    instantDownload: '即时下载',
    bestPrices: '最优价格',
    remoteSupport: '远程支持',
    
    // Footer
    aboutUs: '关于我们',
    termsConditions: '条款和条件',
    howToPay: '如何付款',
    requestQuote: '请求报价',
    refundPolicy: '退款政策'
  },
  
  ar: {
    // Navigation
    home: 'الصفحة الرئيسية',
    catalog: 'الكتالوج',
    cart: 'السلة',
    contact: 'اتصل بنا',
    account: 'الحساب',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    signup: 'إنشاء حساب',
    
    // Product Categories
    lightCars: 'السيارات الخفيفة',
    heavyTrucks: 'الشاحنات الثقيلة والحافلات',
    construction: 'آلات البناء',
    engines: 'المحركات',
    generators: 'المولدات',
    motorbikes: 'الدراجات النارية والهوائية',
    agricultural: 'الآلات الزراعية',
    chineseVehicles: 'المركبات الصينية',
    electricCars: 'السيارات الكهربائية',
    
    // Common Actions
    search: 'بحث',
    addToCart: 'إضافة للسلة',
    viewMore: 'عرض المزيد',
    download: 'تحميل',
    buy: 'اشترِ الآن',
    
    // Messages
    welcome: 'مرحباً بك في كتالوج قطع غيار السيارات',
    instantDownload: 'تحميل فوري',
    bestPrices: 'أفضل الأسعار',
    remoteSupport: 'الدعم عن بُعد',
    
    // Footer
    aboutUs: 'من نحن',
    termsConditions: 'الشروط والأحكام',
    howToPay: 'كيفية الدفع',
    requestQuote: 'طلب عرض سعر',
    refundPolicy: 'سياسة الاسترداد'
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    catalog: 'Catalogue',
    cart: 'Panier',
    contact: 'Contact',
    account: 'Compte',
    login: 'Connexion',
    logout: 'Déconnexion',
    signup: 'S\'inscrire',
    
    // Product Categories
    lightCars: 'Voitures Légères',
    heavyTrucks: 'Camions Lourds et Bus',
    construction: 'Engins de Construction',
    engines: 'Moteurs',
    generators: 'Générateurs',
    motorbikes: 'Motos et Vélos',
    agricultural: 'Machines Agricoles',
    chineseVehicles: 'Véhicules Chinois',
    electricCars: 'Voitures Électriques',
    
    // Common Actions
    search: 'Rechercher',
    addToCart: 'Ajouter au Panier',
    viewMore: 'Voir Plus',
    download: 'Télécharger',
    buy: 'Acheter Maintenant',
    
    // Messages
    welcome: 'Bienvenue au Catalogue de Pièces Auto',
    instantDownload: 'Téléchargement Instantané',
    bestPrices: 'Meilleurs Prix',
    remoteSupport: 'Support à Distance',
    
    // Footer
    aboutUs: 'À Propos',
    termsConditions: 'Conditions Générales',
    howToPay: 'Comment Payer',
    requestQuote: 'Demander un Devis',
    refundPolicy: 'Politique de Remboursement'
  }
}

export const getTranslation = (lang: string, key: string): string => {
  return translations[lang as keyof typeof translations]?.[key as keyof typeof translations.en] || 
         translations.en[key as keyof typeof translations.en] || 
         key
}