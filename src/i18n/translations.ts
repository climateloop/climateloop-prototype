export type Locale = "en" | "es" | "pt" | "fr";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
};

type TranslationKeys = {
  // Header
  location: string;
  // Bottom nav
  navHome: string;
  navAlerts: string;
  navReport: string;
  navMap: string;
  navProfile: string;
  // Weather card
  weatherLocation: string;
  weatherPartlyCloudy: string;
  weatherFeelsLike: string;
  weatherHumidity: string;
  weatherWind: string;
  // Forecast
  forecastTitle: string;
  forecastOfficial: string;
  forecastML: string;
  forecastRain: string;
  forecastMLNote: string;
  // Community
  communityTitle: string;
  communitySubtitle: string;
  communityActiveNow: string;
  communityReportsToday: string;
  communityAccuracy: string;
  // AI Chat
  aiTitle: string;
  aiPlaceholder: string;
  aiInitialMessage: string;
  aiResponse: string;
  // Alerts page
  alertsTitle: string;
  alertsFilter: string;
  // Alert data
  alertRedTitle: string;
  alertRedDesc: string;
  alertOrangeTitle: string;
  alertOrangeDesc: string;
  alertYellowWindTitle: string;
  alertYellowWindDesc: string;
  alertMLHailTitle: string;
  alertMLHailDesc: string;
  alertTimeAgo10: string;
  alertTimeAgo1h: string;
  alertTimeAgo2h: string;
  alertTimeAgoML48: string;
  alertAction1: string;
  alertAction2: string;
  alertAction3: string;
  alertAction4: string;
  alertAction5: string;
  alertAction6: string;
  alertAction7: string;
  alertAction8: string;
  alertAction9: string;
  // Active alert on home
  activeAlertTitle: string;
  activeAlertDesc: string;
  activeAlertTime: string;
  activeAlertAction1: string;
  activeAlertAction2: string;
  activeAlertAction3: string;
  activeAlertAction4: string;
  // Map
  mapTitle: string;
  mapRadius: string;
  mapHighRisk: string;
  mapModerateRisk: string;
  mapLowRisk: string;
  // Profile
  profileDemoUser: string;
  profileReports: string;
  profileDaysActive: string;
  profileAccuracy: string;
  profileMyLocation: string;
  profileLocationValue: string;
  profileNotifications: string;
  profileNotifActive: string;
  profilePrivacy: string;
  profileSettings: string;
  profileLogout: string;
  profileLanguage: string;
  // Report modal
  reportTitle: string;
  reportSubtitle: string;
  reportWhat: string;
  reportNotes: string;
  reportNotesPlaceholder: string;
  reportAddPhoto: string;
  reportPhotoWarning: string;
  reportSend: string;
  reportBack: string;
  reportSuccess: string;
  reportCategory: string;
  // Report categories
  catRain: string;
  catWind: string;
  catHeat: string;
  catFire: string;
  catCold: string;
  catHail: string;
  catFlood: string;
  catCyclone: string;
  catLandslide: string;
  catDrought: string;
  catStorm: string;
  catTornado: string;
  // Sub-options
  subRain1: string;
  subRain2: string;
  subRain3: string;
  subRain4: string;
  subWind1: string;
  subWind2: string;
  subWind3: string;
  subWind4: string;
  subHeat1: string;
  subHeat2: string;
  subHeat3: string;
  subFire1: string;
  subFire2: string;
  subFire3: string;
  subFire4: string;
  subCold1: string;
  subCold2: string;
  subCold3: string;
  subHail1: string;
  subHail2: string;
  subHail3: string;
  subFlood1: string;
  subFlood2: string;
  subFlood3: string;
  subCyclone1: string;
  subCyclone2: string;
  subCyclone3: string;
  subLandslide1: string;
  subLandslide2: string;
  subLandslide3: string;
  subDrought1: string;
  subDrought2: string;
  subDrought3: string;
  subStorm1: string;
  subStorm2: string;
  subStorm3: string;
  subTornado1: string;
  subTornado2: string;
  subTornado3: string;
  // Community report types
  typeFlooding: string;
  typeExtremeHeat: string;
  typeStrongWind: string;
  typeFire: string;
  // AI-powered CTAs
  aiUnderstandAlert: string;
  aiUnderstandForecast: string;
  aiPowered: string;
  alertRecommendedActions: string;
  alertMoreInfo: string;
  communityViewDetails: string;
};

export const translations: Record<Locale, TranslationKeys> = {
  en: {
    location: "Madrid, Spain",
    navHome: "Home",
    navAlerts: "Alerts",
    navReport: "Report",
    navMap: "Map",
    navProfile: "Profile",
    weatherLocation: "Madrid, Centro",
    weatherPartlyCloudy: "Partly cloudy",
    weatherFeelsLike: "Feels like",
    weatherHumidity: "Humidity",
    weatherWind: "Wind",
    forecastTitle: "Forecast comparison",
    forecastOfficial: "Official Forecast",
    forecastML: "ML Forecast",
    forecastRain: "Rain",
    forecastMLNote: "ML model detects +15% chance of heavy rain in the next 6h",
    communityTitle: "Community nearby",
    communitySubtitle: "Reports within 5km of your location",
    communityActiveNow: "Active now",
    communityReportsToday: "Reports today",
    communityAccuracy: "Accuracy",
    aiTitle: "AI Assistant",
    aiPlaceholder: "Ask about the weather...",
    aiInitialMessage: "Hello! I'm the ClimateLoop assistant. Based on official data and ML forecasts, your area has a **55% chance of heavy rain** in the next 6 hours. The community has already reported 3 nearby floods. I can explain more or answer questions about the weather in your area.",
    aiResponse: "Based on ML historical data and active CAP alerts, I recommend avoiding low-lying areas in the coming hours. The official forecast indicates 40% rain, but our model indicates 55% — the difference is due to humidity patterns the ML detected over the last 3 days. Community photos also show rain clouds forming to the west.",
    alertsTitle: "Active alerts",
    alertsFilter: "Filter",
    alertRedTitle: "Red alert: Heavy rain",
    alertRedDesc: "Forecast of rain above 80mm/h for the next 3 hours. Risk of flooding and landslides.",
    alertOrangeTitle: "Orange alert: High temperature",
    alertOrangeDesc: "Temperatures above 38°C expected for tomorrow. Health risk for elderly and children.",
    alertYellowWindTitle: "Yellow alert: Moderate wind",
    alertYellowWindDesc: "Wind gusts up to 60 km/h expected for the afternoon. Watch for loose objects.",
    alertMLHailTitle: "ML Forecast: Future hail risk",
    alertMLHailDesc: "The ML model detected patterns indicating 35% chance of hail in 48h.",
    alertTimeAgo10: "10 minutes ago",
    alertTimeAgo1h: "1 hour ago",
    alertTimeAgo2h: "2 hours ago",
    alertTimeAgoML48: "ML Forecast - 48h",
    alertAction1: "Avoid low-lying areas and slopes",
    alertAction2: "Do not cross flooded streets",
    alertAction3: "Have documents and emergency kit ready",
    alertAction4: "If necessary, go to the nearest shelter",
    alertAction5: "Stay hydrated",
    alertAction6: "Avoid sun exposure between 10am and 4pm",
    alertAction7: "Wear light clothing and sunscreen",
    alertAction8: "Bring in lightweight objects from outdoor areas",
    alertAction9: "Avoid parking under trees",
    activeAlertTitle: "Orange Alert: Heavy rain",
    activeAlertDesc: "Forecast of rain above 50mm in the coming hours. Stay alert to recommendations.",
    activeAlertTime: "30 minutes ago",
    activeAlertAction1: "Avoid known flood-prone areas",
    activeAlertAction2: "Report any visible flooding",
    activeAlertAction3: "Prepare emergency kit",
    activeAlertAction4: "Follow updates",
    mapTitle: "Risk map",
    mapRadius: "Monitoring radius",
    mapHighRisk: "High risk",
    mapModerateRisk: "Moderate risk",
    mapLowRisk: "Low risk",
    profileDemoUser: "Demo User",
    profileReports: "Reports",
    profileDaysActive: "Days active",
    profileAccuracy: "Accuracy",
    profileMyLocation: "My location",
    profileLocationValue: "Madrid, Spain",
    profileNotifications: "Notifications",
    profileNotifActive: "Active",
    profilePrivacy: "Privacy",
    profileSettings: "Settings",
    profileLogout: "Log out",
    profileLanguage: "Language",
    reportTitle: "Help your community",
    reportSubtitle: "Report what you are observing in your area",
    reportWhat: "What are you observing?",
    reportNotes: "Additional notes (optional)",
    reportNotesPlaceholder: "Describe what you observe...",
    reportAddPhoto: "Add photo",
    reportPhotoWarning: "Do not photograph people. The AI will block images containing people.",
    reportSend: "Send report",
    reportBack: "← Back to categories",
    reportSuccess: "Report sent successfully! Thank you for contributing.",
    reportCategory: "Report",
    catRain: "Rain",
    catWind: "Wind",
    catHeat: "Heat",
    catFire: "Fire",
    catCold: "Extreme cold",
    catHail: "Hail",
    catFlood: "Flood",
    catCyclone: "Cyclone",
    catLandslide: "Landslide",
    catDrought: "Drought",
    catStorm: "Storm",
    catTornado: "Tornado",
    subRain1: "Light rain",
    subRain2: "Moderate rain",
    subRain3: "Heavy rain",
    subRain4: "Flooding",
    subWind1: "Light wind",
    subWind2: "Strong wind",
    subWind3: "Gale",
    subWind4: "Fallen tree",
    subHeat1: "Very hot",
    subHeat2: "Melting asphalt",
    subHeat3: "People feeling unwell",
    subFire1: "Visible smoke",
    subFire2: "Small fire",
    subFire3: "Nearby fire",
    subFire4: "Active wildfire",
    subCold1: "Intense cold",
    subCold2: "Frost",
    subCold3: "Ice on road",
    subHail1: "Small hail",
    subHail2: "Large hail",
    subHail3: "Visible damage",
    subFlood1: "Rising water levels",
    subFlood2: "Streets flooded",
    subFlood3: "Homes affected",
    subCyclone1: "Strong gusts",
    subCyclone2: "Circular winds",
    subCyclone3: "Structural damage",
    subLandslide1: "Cracked terrain",
    subLandslide2: "Falling rocks",
    subLandslide3: "Road blocked",
    subDrought1: "Dried vegetation",
    subDrought2: "Water shortage",
    subDrought3: "Cracked soil",
    subStorm1: "Lightning",
    subStorm2: "Thunder and rain",
    subStorm3: "Power outage",
    subTornado1: "Funnel cloud",
    subTornado2: "Debris flying",
    subTornado3: "Severe destruction",
    typeFlooding: "Flooding",
    typeExtremeHeat: "Extreme heat",
    typeStrongWind: "Strong wind",
    typeFire: "Fire",
    aiUnderstandAlert: "Understand this alert",
    aiUnderstandForecast: "Understand the difference",
    aiPowered: "AI Powered",
    alertRecommendedActions: "Recommended actions",
    alertMoreInfo: "More information",
    communityViewDetails: "View details",
  },
  es: {
    location: "Madrid, España",
    navHome: "Inicio",
    navAlerts: "Alertas",
    navReport: "Reportar",
    navMap: "Mapa",
    navProfile: "Perfil",
    weatherLocation: "Madrid, Centro",
    weatherPartlyCloudy: "Parcialmente nublado",
    weatherFeelsLike: "Sensación",
    weatherHumidity: "Humedad",
    weatherWind: "Viento",
    forecastTitle: "Previsión comparada",
    forecastOfficial: "Previsión Oficial",
    forecastML: "Previsión ML",
    forecastRain: "Lluvia",
    forecastMLNote: "El modelo ML detecta +15% de probabilidad de lluvia intensa en las próximas 6h",
    communityTitle: "Comunidad cercana",
    communitySubtitle: "Reportes en un radio de 5km de tu ubicación",
    communityActiveNow: "Activos ahora",
    communityReportsToday: "Reportes hoy",
    communityAccuracy: "Precisión",
    aiTitle: "Asistente IA",
    aiPlaceholder: "Pregunta sobre el clima...",
    aiInitialMessage: "¡Hola! Soy el asistente de ClimateLoop. Según los datos oficiales y las previsiones de ML, tu zona tiene un **55% de probabilidad de lluvia intensa** en las próximas 6 horas. La comunidad ya ha reportado 3 inundaciones cercanas. Puedo explicarte más o responder preguntas sobre el clima en tu zona.",
    aiResponse: "Basado en datos históricos de ML y alertas CAP activas, recomiendo evitar zonas bajas en las próximas horas. La previsión oficial indica 40% de lluvia, pero nuestro modelo indica 55% — la diferencia se debe a patrones de humedad que el ML detectó en los últimos 3 días. Las fotos de la comunidad también muestran nubes de lluvia formándose al oeste.",
    alertsTitle: "Alertas activas",
    alertsFilter: "Filtrar",
    alertRedTitle: "Alerta roja: Lluvia intensa",
    alertRedDesc: "Previsión de lluvia superior a 80mm/h para las próximas 3 horas. Riesgo de inundaciones y deslizamientos.",
    alertOrangeTitle: "Alerta naranja: Temperatura elevada",
    alertOrangeDesc: "Temperaturas superiores a 38°C esperadas para mañana. Riesgo para la salud de ancianos y niños.",
    alertYellowWindTitle: "Alerta amarilla: Viento moderado",
    alertYellowWindDesc: "Rachas de viento de hasta 60 km/h esperadas para la tarde. Atención con objetos sueltos.",
    alertMLHailTitle: "Previsión ML: Riesgo futuro de granizo",
    alertMLHailDesc: "El modelo de ML detectó patrones que indican 35% de probabilidad de granizo en 48h.",
    alertTimeAgo10: "Hace 10 minutos",
    alertTimeAgo1h: "Hace 1 hora",
    alertTimeAgo2h: "Hace 2 horas",
    alertTimeAgoML48: "Previsión ML - 48h",
    alertAction1: "Evita zonas bajas y laderas",
    alertAction2: "No cruces calles inundadas",
    alertAction3: "Ten documentos y kit de emergencia listos",
    alertAction4: "Si es necesario, dirígete al refugio más cercano",
    alertAction5: "Mantente hidratado",
    alertAction6: "Evita la exposición al sol entre las 10h y las 16h",
    alertAction7: "Usa ropa ligera y protector solar",
    alertAction8: "Recoge objetos ligeros de áreas exteriores",
    alertAction9: "Evita estacionar bajo árboles",
    activeAlertTitle: "Alerta naranja: Lluvia fuerte",
    activeAlertDesc: "Previsión de lluvias superiores a 50mm en las próximas horas. Mantente atento a las recomendaciones.",
    activeAlertTime: "Hace 30 minutos",
    activeAlertAction1: "Evita zonas de inundación conocidas",
    activeAlertAction2: "Reporta cualquier inundación visible",
    activeAlertAction3: "Prepara kit de emergencia",
    activeAlertAction4: "Sigue las actualizaciones",
    mapTitle: "Mapa de riesgos",
    mapRadius: "Radio de monitoreo",
    mapHighRisk: "Alto riesgo",
    mapModerateRisk: "Riesgo moderado",
    mapLowRisk: "Bajo riesgo",
    profileDemoUser: "Usuario Demo",
    profileReports: "Reportes",
    profileDaysActive: "Días activo",
    profileAccuracy: "Precisión",
    profileMyLocation: "Mi ubicación",
    profileLocationValue: "Madrid, España",
    profileNotifications: "Notificaciones",
    profileNotifActive: "Activas",
    profilePrivacy: "Privacidad",
    profileSettings: "Configuración",
    profileLogout: "Cerrar sesión",
    profileLanguage: "Idioma",
    reportTitle: "Ayuda a tu comunidad",
    reportSubtitle: "Reporta lo que observas en tu zona",
    reportWhat: "¿Qué estás observando?",
    reportNotes: "Notas adicionales (opcional)",
    reportNotesPlaceholder: "Describe lo que observas...",
    reportAddPhoto: "Añadir foto",
    reportPhotoWarning: "No fotografíes personas. La IA bloqueará imágenes que contengan personas.",
    reportSend: "Enviar reporte",
    reportBack: "← Volver a categorías",
    reportSuccess: "¡Reporte enviado con éxito! Gracias por contribuir.",
    reportCategory: "Reportar",
    catRain: "Lluvia",
    catWind: "Viento",
    catHeat: "Calor",
    catFire: "Incendio",
    catCold: "Frío intenso",
    catHail: "Granizo",
    catFlood: "Inundación",
    catCyclone: "Ciclón",
    catLandslide: "Deslizamiento",
    catDrought: "Sequía",
    catStorm: "Tormenta",
    catTornado: "Tornado",
    subRain1: "Lluvia leve",
    subRain2: "Lluvia moderada",
    subRain3: "Lluvia fuerte",
    subRain4: "Inundación",
    subWind1: "Viento leve",
    subWind2: "Viento fuerte",
    subWind3: "Vendaval",
    subWind4: "Árbol caído",
    subHeat1: "Muy caluroso",
    subHeat2: "Asfalto derritiéndose",
    subHeat3: "Personas sintiéndose mal",
    subFire1: "Humo visible",
    subFire2: "Fuego pequeño",
    subFire3: "Fuego cercano",
    subFire4: "Incendio activo",
    subCold1: "Frío intenso",
    subCold2: "Helada",
    subCold3: "Hielo en la carretera",
    subHail1: "Granizo pequeño",
    subHail2: "Granizo grande",
    subHail3: "Daños visibles",
    subFlood1: "Nivel de agua subiendo",
    subFlood2: "Calles inundadas",
    subFlood3: "Hogares afectados",
    subCyclone1: "Rachas fuertes",
    subCyclone2: "Vientos circulares",
    subCyclone3: "Daños estructurales",
    subLandslide1: "Terreno agrietado",
    subLandslide2: "Caída de rocas",
    subLandslide3: "Carretera bloqueada",
    subDrought1: "Vegetación seca",
    subDrought2: "Escasez de agua",
    subDrought3: "Suelo agrietado",
    subStorm1: "Relámpagos",
    subStorm2: "Truenos y lluvia",
    subStorm3: "Corte de luz",
    subTornado1: "Nube embudo",
    subTornado2: "Escombros volando",
    subTornado3: "Destrucción severa",
    typeFlooding: "Inundación",
    typeExtremeHeat: "Calor extremo",
    typeStrongWind: "Viento fuerte",
    typeFire: "Incendio",
    aiUnderstandAlert: "Entender esta alerta",
    aiUnderstandForecast: "Entender la diferencia",
    aiPowered: "IA Powered",
    alertRecommendedActions: "Acciones recomendadas",
    alertMoreInfo: "Más información",
    communityViewDetails: "Ver detalles",
  },
  pt: {
    location: "Madrid, Espanha",
    navHome: "Início",
    navAlerts: "Alertas",
    navReport: "Reportar",
    navMap: "Mapa",
    navProfile: "Perfil",
    weatherLocation: "Madrid, Centro",
    weatherPartlyCloudy: "Parcialmente nublado",
    weatherFeelsLike: "Sensação",
    weatherHumidity: "Umidade",
    weatherWind: "Vento",
    forecastTitle: "Previsão comparada",
    forecastOfficial: "Previsão Oficial",
    forecastML: "Previsão ML",
    forecastRain: "Chuva",
    forecastMLNote: "O modelo ML detecta +15% de chance de chuva intensa nas próximas 6h",
    communityTitle: "Comunidade ao redor",
    communitySubtitle: "Relatos num raio de 5km da sua localização",
    communityActiveNow: "Ativos agora",
    communityReportsToday: "Relatos hoje",
    communityAccuracy: "Precisão",
    aiTitle: "Assistente IA",
    aiPlaceholder: "Pergunte sobre o clima...",
    aiInitialMessage: "Olá! Sou o assistente do ClimateLoop. Com base nos dados oficiais e nas previsões de ML, vejo que sua região tem **55% de chance de chuva intensa** nas próximas 6 horas. A comunidade já reportou 3 alagamentos próximos. Posso explicar mais ou responder perguntas sobre o clima na sua área.",
    aiResponse: "Baseado nos dados históricos de ML e nos alertas CAP ativos, recomendo que você evite áreas baixas nas próximas horas. A previsão oficial indica 40% de chuva, mas nosso modelo indica 55% — a diferença se deve aos padrões de umidade que o ML detectou nos últimos 3 dias. As fotos enviadas pela comunidade também mostram nuvens de chuva se formando a oeste.",
    alertsTitle: "Alertas ativos",
    alertsFilter: "Filtrar",
    alertRedTitle: "Alerta vermelho: Chuva intensa",
    alertRedDesc: "Previsão de chuva acima de 80mm/h para as próximas 3 horas. Risco de alagamentos e deslizamentos.",
    alertOrangeTitle: "Alerta laranja: Temperatura elevada",
    alertOrangeDesc: "Temperaturas acima de 38°C esperadas para amanhã. Risco à saúde para idosos e crianças.",
    alertYellowWindTitle: "Alerta amarelo: Vento moderado",
    alertYellowWindDesc: "Rajadas de vento de até 60 km/h esperadas para a tarde. Atenção com objetos soltos.",
    alertMLHailTitle: "Previsão ML: Risco futuro de granizo",
    alertMLHailDesc: "O modelo de ML detectou padrões que indicam 35% de chance de granizo em 48h.",
    alertTimeAgo10: "Há 10 minutos",
    alertTimeAgo1h: "Há 1 hora",
    alertTimeAgo2h: "Há 2 horas",
    alertTimeAgoML48: "Previsão ML - 48h",
    alertAction1: "Evite áreas baixas e encostas",
    alertAction2: "Não atravesse ruas alagadas",
    alertAction3: "Tenha documentos e kit de emergência prontos",
    alertAction4: "Se necessário, dirija-se ao abrigo mais próximo",
    alertAction5: "Mantenha-se hidratado",
    alertAction6: "Evite exposição ao sol entre 10h e 16h",
    alertAction7: "Use roupas leves e protetor solar",
    alertAction8: "Recolha objetos leves de áreas externas",
    alertAction9: "Evite estacionar sob árvores",
    activeAlertTitle: "Alerta Laranja: Chuva forte",
    activeAlertDesc: "Previsão de chuvas acima de 50mm nas próximas horas. Fique atento às recomendações.",
    activeAlertTime: "Há 30 minutos",
    activeAlertAction1: "Evite áreas de alagamento conhecidas",
    activeAlertAction2: "Reporte qualquer alagamento visível",
    activeAlertAction3: "Prepare kit de emergência",
    activeAlertAction4: "Acompanhe as atualizações",
    mapTitle: "Mapa de riscos",
    mapRadius: "Raio de monitoramento",
    mapHighRisk: "Alto risco",
    mapModerateRisk: "Risco moderado",
    mapLowRisk: "Baixo risco",
    profileDemoUser: "Usuário Demo",
    profileReports: "Relatos",
    profileDaysActive: "Dias ativo",
    profileAccuracy: "Precisão",
    profileMyLocation: "Minha localização",
    profileLocationValue: "Madrid, Espanha",
    profileNotifications: "Notificações",
    profileNotifActive: "Ativas",
    profilePrivacy: "Privacidade",
    profileSettings: "Configurações",
    profileLogout: "Sair da conta",
    profileLanguage: "Idioma",
    reportTitle: "Ajude sua comunidade",
    reportSubtitle: "Reporte o que você está observando na sua região",
    reportWhat: "O que você está observando?",
    reportNotes: "Notas adicionais (opcional)",
    reportNotesPlaceholder: "Descreva o que observa...",
    reportAddPhoto: "Adicionar foto",
    reportPhotoWarning: "Não fotografe pessoas. A IA bloqueará imagens que contenham pessoas.",
    reportSend: "Enviar relato",
    reportBack: "← Voltar às categorias",
    reportSuccess: "Relato enviado com sucesso! Obrigado por contribuir.",
    reportCategory: "Reportar",
    catRain: "Chuva",
    catWind: "Vento",
    catHeat: "Calor",
    catFire: "Incêndio",
    catCold: "Frio intenso",
    catHail: "Granizo",
    catFlood: "Enchente",
    catCyclone: "Ciclone",
    catLandslide: "Deslizamento",
    catDrought: "Seca",
    catStorm: "Tempestade",
    catTornado: "Tornado",
    subRain1: "Chuva leve",
    subRain2: "Chuva moderada",
    subRain3: "Chuva forte",
    subRain4: "Alagamento",
    subWind1: "Vento leve",
    subWind2: "Vento forte",
    subWind3: "Vendaval",
    subWind4: "Árvore caída",
    subHeat1: "Muito quente",
    subHeat2: "Asfalto derretendo",
    subHeat3: "Pessoas passando mal",
    subFire1: "Fumaça visível",
    subFire2: "Fogo pequeno",
    subFire3: "Fogo próximo",
    subFire4: "Incêndio ativo",
    subCold1: "Frio intenso",
    subCold2: "Geada",
    subCold3: "Gelo na pista",
    subHail1: "Granizo pequeno",
    subHail2: "Granizo grande",
    subHail3: "Danos visíveis",
    subFlood1: "Nível da água subindo",
    subFlood2: "Ruas alagadas",
    subFlood3: "Casas afetadas",
    subCyclone1: "Rajadas fortes",
    subCyclone2: "Ventos circulares",
    subCyclone3: "Danos estruturais",
    subLandslide1: "Terreno rachado",
    subLandslide2: "Queda de rochas",
    subLandslide3: "Estrada bloqueada",
    subDrought1: "Vegetação seca",
    subDrought2: "Falta de água",
    subDrought3: "Solo rachado",
    subStorm1: "Relâmpagos",
    subStorm2: "Trovões e chuva",
    subStorm3: "Queda de energia",
    subTornado1: "Nuvem funil",
    subTornado2: "Destroços voando",
    subTornado3: "Destruição severa",
    typeFlooding: "Alagamento",
    typeExtremeHeat: "Calor extremo",
    typeStrongWind: "Vento forte",
    typeFire: "Incêndio",
    aiUnderstandAlert: "Entenda este alerta",
    aiUnderstandForecast: "Entenda a diferença",
    aiPowered: "IA Powered",
    alertRecommendedActions: "Ações recomendadas",
    alertMoreInfo: "Mais informações",
    communityViewDetails: "Ver detalhes",
  },
  fr: {
    location: "Madrid, Espagne",
    navHome: "Accueil",
    navAlerts: "Alertes",
    navReport: "Signaler",
    navMap: "Carte",
    navProfile: "Profil",
    weatherLocation: "Madrid, Centre",
    weatherPartlyCloudy: "Partiellement nuageux",
    weatherFeelsLike: "Ressenti",
    weatherHumidity: "Humidité",
    weatherWind: "Vent",
    forecastTitle: "Prévision comparée",
    forecastOfficial: "Prévision Officielle",
    forecastML: "Prévision ML",
    forecastRain: "Pluie",
    forecastMLNote: "Le modèle ML détecte +15% de risque de pluie intense dans les 6 prochaines heures",
    communityTitle: "Communauté à proximité",
    communitySubtitle: "Signalements dans un rayon de 5km de votre position",
    communityActiveNow: "Actifs maintenant",
    communityReportsToday: "Signalements aujourd'hui",
    communityAccuracy: "Précision",
    aiTitle: "Assistant IA",
    aiPlaceholder: "Posez une question sur la météo...",
    aiInitialMessage: "Bonjour ! Je suis l'assistant ClimateLoop. Selon les données officielles et les prévisions ML, votre zone a **55% de risque de pluie intense** dans les 6 prochaines heures. La communauté a déjà signalé 3 inondations à proximité. Je peux vous en dire plus ou répondre à vos questions sur la météo.",
    aiResponse: "D'après les données historiques ML et les alertes CAP actives, je recommande d'éviter les zones basses dans les prochaines heures. La prévision officielle indique 40% de pluie, mais notre modèle indique 55% — la différence est due aux schémas d'humidité détectés par le ML ces 3 derniers jours. Les photos de la communauté montrent aussi des nuages de pluie se formant à l'ouest.",
    alertsTitle: "Alertes actives",
    alertsFilter: "Filtrer",
    alertRedTitle: "Alerte rouge : Pluie intense",
    alertRedDesc: "Prévision de pluie supérieure à 80mm/h pour les 3 prochaines heures. Risque d'inondations et de glissements de terrain.",
    alertOrangeTitle: "Alerte orange : Température élevée",
    alertOrangeDesc: "Températures supérieures à 38°C attendues demain. Risque pour la santé des personnes âgées et des enfants.",
    alertYellowWindTitle: "Alerte jaune : Vent modéré",
    alertYellowWindDesc: "Rafales de vent jusqu'à 60 km/h attendues cet après-midi. Attention aux objets non fixés.",
    alertMLHailTitle: "Prévision ML : Risque futur de grêle",
    alertMLHailDesc: "Le modèle ML a détecté des schémas indiquant 35% de risque de grêle dans 48h.",
    alertTimeAgo10: "Il y a 10 minutes",
    alertTimeAgo1h: "Il y a 1 heure",
    alertTimeAgo2h: "Il y a 2 heures",
    alertTimeAgoML48: "Prévision ML - 48h",
    alertAction1: "Évitez les zones basses et les pentes",
    alertAction2: "Ne traversez pas les rues inondées",
    alertAction3: "Ayez documents et kit d'urgence prêts",
    alertAction4: "Si nécessaire, dirigez-vous vers l'abri le plus proche",
    alertAction5: "Restez hydraté",
    alertAction6: "Évitez l'exposition au soleil entre 10h et 16h",
    alertAction7: "Portez des vêtements légers et de la crème solaire",
    alertAction8: "Rangez les objets légers des zones extérieures",
    alertAction9: "Évitez de stationner sous les arbres",
    activeAlertTitle: "Alerte orange : Pluie forte",
    activeAlertDesc: "Prévision de pluies supérieures à 50mm dans les prochaines heures. Restez attentif aux recommandations.",
    activeAlertTime: "Il y a 30 minutes",
    activeAlertAction1: "Évitez les zones d'inondation connues",
    activeAlertAction2: "Signalez toute inondation visible",
    activeAlertAction3: "Préparez un kit d'urgence",
    activeAlertAction4: "Suivez les mises à jour",
    mapTitle: "Carte des risques",
    mapRadius: "Rayon de surveillance",
    mapHighRisk: "Risque élevé",
    mapModerateRisk: "Risque modéré",
    mapLowRisk: "Risque faible",
    profileDemoUser: "Utilisateur Démo",
    profileReports: "Signalements",
    profileDaysActive: "Jours actif",
    profileAccuracy: "Précision",
    profileMyLocation: "Ma position",
    profileLocationValue: "Madrid, Espagne",
    profileNotifications: "Notifications",
    profileNotifActive: "Actives",
    profilePrivacy: "Confidentialité",
    profileSettings: "Paramètres",
    profileLogout: "Déconnexion",
    profileLanguage: "Langue",
    reportTitle: "Aidez votre communauté",
    reportSubtitle: "Signalez ce que vous observez dans votre zone",
    reportWhat: "Qu'observez-vous ?",
    reportNotes: "Notes supplémentaires (optionnel)",
    reportNotesPlaceholder: "Décrivez ce que vous observez...",
    reportAddPhoto: "Ajouter une photo",
    reportPhotoWarning: "Ne photographiez pas de personnes. L'IA bloquera les images contenant des personnes.",
    reportSend: "Envoyer le signalement",
    reportBack: "← Retour aux catégories",
    reportSuccess: "Signalement envoyé avec succès ! Merci de contribuer.",
    reportCategory: "Signaler",
    catRain: "Pluie",
    catWind: "Vent",
    catHeat: "Chaleur",
    catFire: "Incendie",
    catCold: "Froid intense",
    catHail: "Grêle",
    catFlood: "Inondation",
    catCyclone: "Cyclone",
    catLandslide: "Glissement",
    catDrought: "Sécheresse",
    catStorm: "Orage",
    catTornado: "Tornade",
    subRain1: "Pluie légère",
    subRain2: "Pluie modérée",
    subRain3: "Pluie forte",
    subRain4: "Inondation",
    subWind1: "Vent léger",
    subWind2: "Vent fort",
    subWind3: "Tempête",
    subWind4: "Arbre tombé",
    subHeat1: "Très chaud",
    subHeat2: "Asphalte fondant",
    subHeat3: "Personnes malades",
    subFire1: "Fumée visible",
    subFire2: "Petit feu",
    subFire3: "Feu à proximité",
    subFire4: "Incendie actif",
    subCold1: "Froid intense",
    subCold2: "Gel",
    subCold3: "Verglas",
    subHail1: "Petite grêle",
    subHail2: "Grosse grêle",
    subHail3: "Dégâts visibles",
    subFlood1: "Niveau d'eau en hausse",
    subFlood2: "Rues inondées",
    subFlood3: "Habitations touchées",
    subCyclone1: "Rafales fortes",
    subCyclone2: "Vents circulaires",
    subCyclone3: "Dégâts structurels",
    subLandslide1: "Terrain fissuré",
    subLandslide2: "Chutes de pierres",
    subLandslide3: "Route bloquée",
    subDrought1: "Végétation sèche",
    subDrought2: "Pénurie d'eau",
    subDrought3: "Sol fissuré",
    subStorm1: "Éclairs",
    subStorm2: "Tonnerre et pluie",
    subStorm3: "Coupure de courant",
    subTornado1: "Nuage en entonnoir",
    subTornado2: "Débris volants",
    subTornado3: "Destruction sévère",
    typeFlooding: "Inondation",
    typeExtremeHeat: "Chaleur extrême",
    typeStrongWind: "Vent fort",
    typeFire: "Incendie",
    aiUnderstandAlert: "Comprendre cette alerte",
    aiUnderstandForecast: "Comprendre la différence",
    aiPowered: "IA Powered",
    alertRecommendedActions: "Actions recommandées",
    alertMoreInfo: "Plus d'informations",
    communityViewDetails: "Voir les détails",
  },
};
