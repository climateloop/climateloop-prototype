export type Locale = "en" | "es" | "pt" | "fr";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
  fr: "FR",
};

type TranslationKeys = {
  // Header
  location: string;
  // Bottom nav
  navHome: string;
  navAlerts: string;
  navReport: string;
  navMap: string;
  navAI: string;
  navCommunity: string;
  navProfile: string;
  // Weather card
  weatherLocation: string;
  weatherPartlyCloudy: string;
  weatherFeelsLike: string;
  weatherHumidity: string;
  weatherWind: string;
  weatherRainChance: string;
  forecastTitle: string;
  forecastOfficial: string;
  forecastML: string;
  forecastIoT: string;
  forecastRain: string;
  forecastMLNote: string;
  // Community
  communityTitle: string;
  communitySubtitle: string;
  communitySeeAllCTA: string;
  communityNoReportsNearby: string;
  // AI Chat
  aiTitle: string;
  aiPlaceholder: string;
  aiInitialMessage: string;
  aiResponse: string;
  aiDisclaimer: string;
  // Alerts page
  alertsTitle: string;
  alertsFilter: string;
  alertsFilterAll: string;
  alertsFilterSeverity: string;
  alertsFilterTime: string;
  alertsSeverityRed: string;
  alertsSeverityOrange: string;
  alertsSeverityYellow: string;
  alertsNoAlerts: string;
  alertOriginalLang: string;
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
  mapViewReport: string;
  // Profile
  profileDemoUser: string;
  profileReports: string;
  profileDaysActive: string;
  profileRating: string;
  profileRatingHint: string;
  profileMyLocation: string;
  profileLocationValue: string;
  profileNotifications: string;
  profileNotifActive: string;
  profilePrivacy: string;
  // Legal
  legalTitle: string;
  legalTermsHeading: string;
  legalPrivacyHeading: string;
  legalTermsContent: string;
  legalPrivacyContent: string;
  authTermsCheckbox: string;
  authTermsLink: string;
  authErrorTerms: string;
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
  reportPhotoAnalyzing: string;
  reportPhotoRejected: string;
  reportPhotoAccepted: string;
  reportSend: string;
  reportBack: string;
  reportSuccess: string;
  reportCategory: string;
  reportTitleLabel: string;
  reportTitlePlaceholder: string;
  reportAddressLabel: string;
  reportAddressPlaceholder: string;
  reportPhotoRequired: string;
  reportSending: string;
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
  typeRain: string;
  typeHail: string;
  typeFrost: string;
  typeLandslide: string;
  // AI-powered CTAs
  aiUnderstandAlert: string;
  aiUnderstandForecast: string;
  aiPowered: string;
  alertRecommendedActions: string;
  alertMoreInfo: string;
  communityViewDetails: string;
  // Detail screens
  alertDetailTitle: string;
  alertDetailExplanation: string;
  alertDetailContinueChat: string;
  forecastDetailTitle: string;
  forecastDetailOfficialExplanation: string;
  forecastDetailMLExplanation: string;
  forecastDetailContinueChat: string;
  forecastDetailIoTExplanation: string;
  forecastDetailDeeperTitle: string;
  forecastDetailWhyCompare: string;
  forecastDetailConfidenceLabel: string;
  forecastDetailDeeperDesc: string;
  alertDetailAskTitle: string;
  alertDetailAskDesc: string;
  alertDetailChatButton: string;
  communityDetailTitle: string;
  communityDetailVerified: string;
  communityDetailPending: string;
  communityDetailLocation: string;
  communityDetailTime: string;
  communityRateTitle: string;
  communityRateDesc: string;
  communityRateHelpful: string;
  communityRateNotHelpful: string;
  communityRateThanks: string;
  homeMapHint: string;
  backButton: string;
  // Notifications
  notifTitle: string;
  notifAlertReceived: string;
  notifReportSent: string;
  notifReportVerified: string;
  notifCommunityNearby: string;
  notifMarkAllRead: string;
  // Menu
  menuAbout: string;
  menuHelp: string;
  menuTerms: string;
  menuShare: string;
  menuMyContributions: string;
  // My Contributions
  myContribTitle: string;
  myContribEmpty: string;
  myContribStatus: string;
  myContribVerified: string;
  myContribPending: string;
  // Filters
  filterAll: string;
  filterByType: string;
  filterByRadius: string;
  filterRadiusKm: string;
  // Photo warning
  photoBlurWarning: string;
  // Emergency
  emergencyTitle: string;
  emergencyPolice: string;
  emergencyFire: string;
  emergencyMedical: string;
  emergencyCivilDefense: string;
  emergencyRedCross: string;
  // Community - own reports
  communitySentByMe: string;
  // My Location
  myLocationTitle: string;
  myLocationUseGPS: string;
  myLocationGPSDesc: string;
  myLocationSearchPlaceholder: string;
  myLocationSaved: string;
  myLocationNoSaved: string;
  myLocationSave: string;
  myLocationCurrent: string;
  myLocationDetecting: string;
  // IoT
  iotTitle: string;
  iotLive: string;
  iotLastUpdate: string;
  iotRadiusNote: string;
  iotInfoTitle: string;
  iotInfoDesc1: string;
  iotInfoDesc2: string;
  iotInfoDesc3: string;
  // Personalized alert explanations
  alertExplainOrangeRain: string;
  alertExplainRedRain: string;
  alertExplainOrangeHeat: string;
  alertExplainYellowWind: string;
  alertExplainMLHail: string;
  // Units
  profileUnits: string;
  // Forecast precip
  forecastPrecip: string;
  // Alert categories
  alertCategoryNow: string;
  alertCategoryFuture: string;
  alertCategoryPast: string;
  alertFutureHeatTitle: string;
  alertFutureHeatDesc: string;
  alertFutureHeatTime: string;
  alertPastRainTitle: string;
  alertPastRainDesc: string;
  alertPastYesterday: string;
  alertPast2Days: string;
  // Alert detail - official text block
  alertOfficialTextLabel: string;
  alertOfficialTextCopy: string;
  alertOfficialTextCopied: string;
  alertOfficialTextShare: string;
   alertOfficialTextTranslate: string;
  // Auth
  authLogin: string;
  authSignup: string;
  authLoginDesc: string;
  authSignupDesc: string;
  authName: string;
  authNamePlaceholder: string;
  authEmail: string;
  authEmailPlaceholder: string;
  authPassword: string;
  authPasswordPlaceholder: string;
  authTagline: string;
  authNoAccount: string;
  authHaveAccount: string;
  authErrorRequired: string;
  authErrorName: string;
  authErrorPassword: string;
  // Map filters
  mapFilters: string;
  mapFilterAll: string;
  catAir: string;
  catAlerts: string;
  catMetrics: string;
  catFrost: string;
};

export const translations: Record<Locale, TranslationKeys> = {
  en: {
    location: "Galicia, Spain",
    navHome: "Home",
    navAlerts: "Alerts",
    navReport: "Report",
    navMap: "Map",
    navAI: "AI",
    navCommunity: "Community",
    navProfile: "Profile",
    weatherLocation: "Galicia, Centro",
    weatherPartlyCloudy: "Partly cloudy",
    weatherFeelsLike: "Feels like",
    weatherHumidity: "Humidity",
    weatherWind: "Wind",
    forecastTitle: "Forecast comparison",
    forecastOfficial: "Official",
    forecastML: "ML Forecast",
    forecastIoT: "IoT Sensors",
    forecastRain: "Rain",
    forecastMLNote: "ML model detects +15% chance of heavy rain in the next 6h",
    communityTitle: "Community nearby",
    communitySubtitle: "Reports within 5km of your location",
    communitySeeAllCTA: "Tap the Community icon below to see all reports",
    communityNoReportsNearby: "No reports nearby yet. Tap the Community icon below to see all reports or increase the radius.",
    aiTitle: "AI Assistant",
    aiPlaceholder: "Ask about the weather...",
    aiInitialMessage: "Hello! I'm the ClimateLoop AI assistant. How can I help you today?",
    aiResponse: "Based on ML historical data and active CAP alerts, I recommend avoiding low-lying areas in the coming hours. The official forecast indicates 40% rain, but our model indicates 55% — the difference is due to humidity patterns the ML detected over the last 3 days. Community photos also show rain clouds forming to the west.",
    aiDisclaimer: "You are chatting with an AI assistant.",
    alertsTitle: "Active alerts",
    alertsFilter: "Filter",
    alertsFilterAll: "All",
    alertsFilterSeverity: "Severity",
    alertsFilterTime: "Period",
    alertsSeverityRed: "High",
    alertsSeverityOrange: "Moderate",
    alertsSeverityYellow: "Low",
    alertsNoAlerts: "No alerts for your area",
    alertOriginalLang: "Original",
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
    mapHighRisk: "High",
    mapModerateRisk: "Moderate",
    mapLowRisk: "Low",
    mapViewReport: "View report",
    profileDemoUser: "Demo User",
    profileReports: "Reports",
    profileDaysActive: "Days active",
    profileRating: "Rating",
    profileRatingHint: "Avg. community votes",
    profileMyLocation: "My location",
    profileLocationValue: "Galicia, Spain",
    profileNotifications: "Notifications",
    profileNotifActive: "Active",
    profilePrivacy: "Privacy Policy & Terms of Use",
    legalTitle: "Privacy Policy & Terms of Use",
    legalTermsHeading: "Terms of Use",
    legalPrivacyHeading: "Privacy Policy",
    legalTermsContent: `1. Definitions

"Platform" refers to Climate Loop.
"User" refers to any individual accessing the Platform.
"AI System" refers to machine learning and generative AI models integrated into the Platform.

2. Scope of Service

Climate Loop provides:
- Weather predictions based on Machine Learning models;
- Emergency alerts structured under the Common Alert Protocol (CAP);
- Community-generated reports;
- A generative AI assistant that explains alert content.

The Platform currently operates as an academic prototype evolving toward a commercial product.

3. No Automated Decision-Making

The AI assistant provides explanatory summaries only.
It does not make decisions producing legal or similarly significant effects under Article 22 GDPR.

4. Data Minimization

Account registration requires only:
- First name
- Email address
- Encrypted password

No additional personal data is required.

5. Community Contributions

Images are stored only if automated AI validation confirms:
- Absence of identifiable individuals;
- Consistency with the reported event.

Rejected submissions are permanently discarded. Public display format: First name + last name initial.

6. AI Act Transparency (Art. 52 AI Act)

Users are clearly informed when interacting with an AI system. The AI deployed qualifies as a limited-risk system under the EU AI Act. Climate Loop applies:
- Transparency measures;
- Risk-based safeguards;
- Human oversight proportional to system function.

7. Informational Disclaimer

The Platform does not replace official public authorities or emergency services.

8. Liability Limitation

To the extent permitted by law, Climate Loop shall not be liable for indirect or consequential damages arising from informational use of the Platform.

9. Governing Framework

These Terms are aligned with the General Data Protection Regulation (GDPR) and the EU Artificial Intelligence Act.`,
    legalPrivacyContent: `1. Data Controller

Climate Loop acts as Data Controller for personal data processed through the Platform.

2. Data Collected

- First name
- Email address
- Encrypted password
- Session logs
- Optional location data (consent-based)

3. Legal Basis (Article 6 GDPR)

Processing is based on:
- Contract performance (Art. 6(1)(b));
- Legitimate interest (Art. 6(1)(f));
- Consent where applicable (Art. 6(1)(a)).

4. Purpose of Processing

- Authentication and account management;
- Platform security;
- AI explanatory functionality;
- Personalized climate information.

5. Generative AI Processing

Text submitted for explanation may be processed by integrated AI providers under strict data minimization. No personal data is used to train proprietary AI models.

6. Data Retention

Data is retained only for as long as necessary for service provision or legal obligations.

7. Data Subject Rights (Arts. 15-22 GDPR)

Users may request:
- Access
- Rectification
- Erasure
- Restriction
- Data portability
- Objection

8. Security (Art. 32 GDPR)

Appropriate technical and organizational measures are implemented.

9. Supervisory Authority

Users may lodge a complaint with their competent data protection authority within the EU.`,
    authTermsCheckbox: "I have read and agree to the",
    authTermsLink: "Terms of Use and Privacy Policy",
    authErrorTerms: "You must accept the terms to continue",
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
    reportPhotoAnalyzing: "Analyzing image with AI…",
    reportPhotoRejected: "People detected in the image. Please take another photo without people.",
    reportPhotoAccepted: "Image approved — no people detected.",
    reportSend: "Send report",
    reportBack: "← Back to categories",
    reportSuccess: "Report sent successfully! Thank you for contributing.",
    reportCategory: "Report",
    reportTitleLabel: "Title",
    reportTitlePlaceholder: "E.g.: Fallen tree on Rúa Nova",
    reportAddressLabel: "Location",
    reportAddressPlaceholder: "Type the address or street name...",
    reportPhotoRequired: "A photo is required to submit your report.",
    reportSending: "Sending...",
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
    typeRain: "Rain",
    typeHail: "Hail",
    typeFrost: "Frost",
    typeLandslide: "Landslide",
    aiUnderstandAlert: "Understand this alert",
    aiUnderstandForecast: "Understand the difference",
    aiPowered: "AI Powered",
    alertRecommendedActions: "Recommended actions",
    alertMoreInfo: "More information",
    communityViewDetails: "View details",
    alertDetailTitle: "Alert analysis",
    alertDetailExplanation: "This alert was issued based on data from official meteorological agencies (AEMET) combined with real-time CAP (Common Alerting Protocol) feeds. Our AI system cross-referenced this information with historical patterns and community reports within a 25km radius to assess the local impact. The severity level reflects the probability and intensity of the event based on multiple data sources.",
    alertDetailContinueChat: "Have questions? Continue chatting with the AI assistant for personalized guidance.",
    forecastDetailTitle: "Understanding forecasts",
    forecastDetailOfficialExplanation: "The Official Forecast comes from national meteorological agencies (like AEMET in Spain) using physics-based weather models run on supercomputers. These models divide the atmosphere into grids of about 10 km and calculate how temperature, pressure and humidity will change over time. They are updated every 6 to 12 hours and are very reliable for the next 24 to 48 hours, but become less accurate beyond 5 days.",
    forecastDetailMLExplanation: "The ML Forecast uses artificial intelligence trained on over 30 years of local weather history. It learns patterns specific to your area that the large-scale models miss, such as how buildings trap heat in a city, how wind behaves in valleys, or how the coast affects rain. When the ML and official forecasts show different numbers, it usually means there is a local effect worth paying attention to.",
    forecastDetailContinueChat: "Want to dive deeper? Ask the AI assistant about specific patterns or discrepancies.",
    forecastDetailIoTExplanation: "IoT Sensors are physical devices deployed across the region that measure real-time conditions like temperature, humidity, and wind speed. Because they capture what is actually happening right now (not predictions), they have the highest confidence level. When IoT data aligns with forecasts, you can trust them. When it diverges, the sensors are showing a local microclimate effect the models didn't predict.",
    forecastDetailWhyCompare: "Comparing all three sources helps you make better decisions. The official forecast gives you the big picture, the ML forecast captures local patterns, and IoT sensors show what's actually happening right now. When all three agree, you can be very confident. When they diverge, the real-time IoT data is the ground truth — it often reveals microclimates or rapid changes the models didn't predict.",
    forecastDetailConfidenceLabel: "Confidence — how sure the model is about this forecast (100% = maximum certainty)",
    communityDetailTitle: "Community report",
    communityDetailVerified: "Verified by AI",
    communityDetailPending: "Pending verification",
    communityDetailLocation: "Location",
    communityDetailTime: "Reported",
    communityRateTitle: "Rate this report",
    communityRateDesc: "Was this community report helpful or accurate?",
    communityRateHelpful: "Helpful",
    communityRateNotHelpful: "Not helpful",
    communityRateThanks: "Thanks for your feedback!",
    homeMapHint: "Tap the Map icon for a detailed view",
    backButton: "Back",
    notifTitle: "Notifications",
    notifAlertReceived: "Alert received for your area",
    notifReportSent: "Your report was sent",
    notifReportVerified: "Your report was verified by AI",
    notifCommunityNearby: "New community report nearby",
    notifMarkAllRead: "Mark all as read",
    menuAbout: "About ClimateLoop",
    menuHelp: "Help & Support",
    menuTerms: "Terms of Use",
    menuShare: "Share App",
    menuMyContributions: "My Contributions",
    myContribTitle: "My Contributions",
    myContribEmpty: "You haven't submitted any reports yet.",
    myContribStatus: "Status",
    myContribVerified: "Verified",
    myContribPending: "Under review",
    filterAll: "All",
    filterByType: "Type",
    filterByRadius: "Radius",
    filterRadiusKm: "km",
    photoBlurWarning: "Photos must not contain identifiable persons.",
    weatherRainChance: "Rain",
    forecastDetailDeeperTitle: "Want to dive deeper?",
    forecastDetailDeeperDesc: "Tap the AI Assistant icon in the bottom bar to ask questions about specific patterns or discrepancies.",
    alertDetailAskTitle: "Have questions?",
    alertDetailAskDesc: "Tap the AI Assistant icon in the bottom bar for personalized guidance about this alert.",
    alertDetailChatButton: "Chat about this alert",
    emergencyTitle: "Emergency numbers — Spain",
    emergencyPolice: "Police",
    emergencyFire: "Fire department",
    emergencyMedical: "Medical emergency",
    emergencyCivilDefense: "Civil Defense",
    emergencyRedCross: "Red Cross",
    communitySentByMe: "Sent by me",
    myLocationTitle: "My Location",
    myLocationUseGPS: "Use GPS",
    myLocationGPSDesc: "Detect your current location automatically",
    myLocationSearchPlaceholder: "Search for a city or address...",
    myLocationSaved: "Saved locations",
    myLocationNoSaved: "No saved locations yet",
    myLocationSave: "Save this location",
    myLocationCurrent: "Current location",
    myLocationDetecting: "Detecting location...",
    iotTitle: "Nearest IoT Station",
    iotLive: "LIVE",
    iotLastUpdate: "Updated",
    iotRadiusNote: "Within 5km radius",
    iotInfoTitle: "What are IoT sensors?",
    iotInfoDesc1: "IoT (Internet of Things) sensors are small weather stations installed in strategic locations throughout your city. They measure temperature, humidity, wind speed, and other climate variables in real time.",
    iotInfoDesc2: "Unlike forecasts (which are predictions), IoT data shows exactly what's happening right now at a specific location. This makes them extremely valuable for validating whether official and ML forecasts are accurate.",
    iotInfoDesc3: "The ClimateLoop network is growing — the more sensors deployed in your area, the more precise and localized the climate information becomes. Each sensor covers an approximate radius of 5km.",
    alertExplainOrangeRain: "Hey, heads up — this orange rain alert is serious but manageable. Basically, they're expecting more than 50mm of rain in the next few hours, which is a lot. Think of it like dumping 50 liters of water per square meter. Streets can flood fast, especially in low areas. The good news is it's not the worst level (red), so if you stay alert and avoid risky spots, you'll be fine. Just don't try to cross flooded streets — that's how most accidents happen.",
    alertExplainRedRain: "This is a red alert, the highest level — take it very seriously. We're talking about rain above 80mm per hour, which can cause flash flooding, landslides, and real danger. This isn't a 'maybe carry an umbrella' situation. If you're near slopes, rivers, or low areas, consider moving to higher ground. Have your documents and emergency kit ready. If authorities say evacuate, do it. This kind of event can escalate very fast.",
    alertExplainOrangeHeat: "So tomorrow is going to be brutally hot — above 38°C. This isn't just uncomfortable, it's genuinely dangerous for elderly people, kids, and anyone with health conditions. Your body struggles to cool down at these temps. Stay hydrated (way more water than you think), avoid being outside between 10am and 4pm, and keep curtains closed. If you know elderly neighbors, check on them — heat can be a silent killer.",
    alertExplainYellowWind: "This is a yellow wind alert — not super dangerous, but worth paying attention to. We're expecting gusts up to 60km/h this afternoon. That's strong enough to knock over potted plants, break weak branches, and send lightweight objects flying. If you have anything loose on your balcony or terrace, bring it inside. Also, maybe don't park under trees today. It should calm down by evening.",
    alertExplainMLHail: "This one is interesting — our ML model spotted a pattern that suggests there's a 35% chance of hail in about 48 hours. This isn't from the official weather service; it's our AI analyzing historical data and current atmospheric conditions. 35% isn't certain, but it's high enough to plan ahead. If you have a car parked outside, consider covering it. Keep an eye on updates — we'll know more as conditions develop.",
    profileUnits: "Units",
    forecastPrecip: "Precip",
    alertCategoryNow: "Active now",
    alertCategoryFuture: "Upcoming",
    alertCategoryPast: "Recent",
    alertFutureHeatTitle: "Orange alert: Extreme heat D+1",
    alertFutureHeatDesc: "Temperatures above 40°C expected the day after tomorrow. Prepare in advance.",
    alertFutureHeatTime: "Forecast D+1",
    alertPastRainTitle: "Orange alert: Heavy rain (ended)",
    alertPastRainDesc: "Rain of 45mm recorded 2 days ago. Alert has been deactivated.",
    alertPastYesterday: "Yesterday",
    alertPast2Days: "2 days ago",
    alertOfficialTextLabel: "Official text",
    alertOfficialTextCopy: "Copy",
    alertOfficialTextCopied: "Copied!",
    alertOfficialTextShare: "Share",
    alertOfficialTextTranslate: "Translate to",
    authLogin: "Log in",
    authSignup: "Create account",
    authLoginDesc: "Enter your credentials to continue",
    authSignupDesc: "Create your account to get started",
    authName: "Name",
    authNamePlaceholder: "Your full name",
    authEmail: "Email",
    authEmailPlaceholder: "your@email.com",
    authPassword: "Password",
    authPasswordPlaceholder: "At least 6 characters",
    authTagline: "Community-powered climate intelligence",
    authNoAccount: "Don't have an account? Sign up",
    authHaveAccount: "Already have an account? Log in",
    authErrorRequired: "Email and password are required",
    authErrorName: "Name is required",
    authErrorPassword: "Password must be at least 6 characters",
    mapFilters: "Filters",
    mapFilterAll: "All",
    catAir: "Air quality",
    catAlerts: "Alerts",
    catMetrics: "Metrics",
    catFrost: "Frost",
  },
  es: {
    location: "Galicia, España",
    navHome: "Inicio",
    navAlerts: "Alertas",
    navReport: "Reportar",
    navMap: "Mapa",
    navAI: "IA",
    navCommunity: "Comunidad",
    navProfile: "Perfil",
    weatherLocation: "Galicia, Centro",
    weatherPartlyCloudy: "Parcialmente nublado",
    weatherFeelsLike: "Sensación",
    weatherHumidity: "Humedad",
    weatherWind: "Viento",
    forecastTitle: "Previsión comparada",
    forecastOfficial: "Oficial",
    forecastML: "Previsión ML",
    forecastIoT: "Sensores IoT",
    forecastRain: "Lluvia",
    forecastMLNote: "El modelo ML detecta +15% de probabilidad de lluvia intensa en las próximas 6h",
    communityTitle: "Comunidad cercana",
    communitySubtitle: "Reportes en un radio de 5km de tu ubicación",
    communitySeeAllCTA: "Toca el ícono Comunidad abajo para ver todos los reportes",
    communityNoReportsNearby: "No hay reportes cercanos. Toca el ícono Comunidad abajo para ver todos los reportes o ampliar el radio.",
    aiTitle: "Asistente IA",
    aiPlaceholder: "Pregunta sobre el clima...",
    aiInitialMessage: "¡Hola! Soy el asistente de IA de ClimateLoop. ¿En qué puedo ayudarte hoy?",
    aiResponse: "Basado en datos históricos de ML y alertas CAP activas, recomiendo evitar zonas bajas en las próximas horas. La previsión oficial indica 40% de lluvia, pero nuestro modelo indica 55% — la diferencia se debe a patrones de humedad que el ML detectó en los últimos 3 días. Las fotos de la comunidad también muestran nubes de lluvia formándose al oeste.",
    aiDisclaimer: "Estás conversando con un asistente de IA.",
    alertsTitle: "Alertas activas",
    alertsFilter: "Filtrar",
    alertsFilterAll: "Todos",
    alertsFilterSeverity: "Severidad",
    alertsFilterTime: "Período",
    alertsSeverityRed: "Alta",
    alertsSeverityOrange: "Moderada",
    alertsSeverityYellow: "Baja",
    alertsNoAlerts: "Sin alertas para tu zona",
    alertOriginalLang: "Original",
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
    mapHighRisk: "Alto",
    mapModerateRisk: "Moderado",
    mapLowRisk: "Bajo",
    mapViewReport: "Ver reporte",
    profileDemoUser: "Usuario Demo",
    profileReports: "Reportes",
    profileDaysActive: "Días activo",
    profileRating: "Valoración",
    profileRatingHint: "Votos medios de la comunidad",
    profileMyLocation: "Mi ubicación",
    profileLocationValue: "Galicia, España",
    profileNotifications: "Notificaciones",
    profileNotifActive: "Activas",
    profilePrivacy: "Política de Privacidad y Términos",
    legalTitle: "Política de Privacidad y Términos de Uso",
    legalTermsHeading: "Términos de Uso",
    legalPrivacyHeading: "Política de Privacidad",
    legalTermsContent: `1. Definiciones

"Plataforma" se refiere a Climate Loop.
"Usuario" es cualquier persona que acceda a la Plataforma.
"Sistema de IA" incluye modelos de Machine Learning e IA generativa.

2. Alcance

La Plataforma proporciona:
- Predicciones meteorológicas;
- Alertas estructuradas bajo CAP;
- Contribuciones comunitarias;
- Asistente IA explicativo.

Proyecto académico en evolución hacia producto comercial.

3. No Decisión Automatizada

La IA no produce efectos jurídicos conforme al Art. 22 del GDPR.

4. Minimización de Datos

Solo se recopilan:
- Nombre
- Correo electrónico
- Contraseña cifrada

5. Contribuciones

Las imágenes se almacenan solo si la IA confirma ausencia de personas identificables y coherencia con el evento.

6. Transparencia y AI Act (Art. 52 AI Act)

Los usuarios son informados claramente cuando interactúan con un sistema de IA. La IA desplegada se clasifica como sistema de riesgo limitado bajo el AI Act de la UE. Climate Loop aplica:
- Medidas de transparencia;
- Salvaguardas basadas en riesgo;
- Supervisión humana proporcional a la función del sistema.

7. Aviso Informativo

La Plataforma no sustituye a las autoridades públicas oficiales ni a los servicios de emergencia.

8. Limitación de Responsabilidad

En la medida permitida por la ley, Climate Loop no será responsable por daños indirectos o consecuentes derivados del uso informativo de la Plataforma.

9. Marco Legal

Estos Términos están alineados con el Reglamento General de Protección de Datos (GDPR) y el Reglamento de Inteligencia Artificial de la UE.`,
    legalPrivacyContent: `1. Responsable del Tratamiento

Climate Loop actúa como responsable del tratamiento de los datos personales procesados a través de la Plataforma.

2. Datos Recopilados

- Nombre
- Correo electrónico
- Contraseña cifrada
- Datos de sesión
- Localización opcional (basada en consentimiento)

3. Base Jurídica (Art. 6 GDPR)

El tratamiento se basa en:
- Ejecución contractual (Art. 6(1)(b));
- Interés legítimo (Art. 6(1)(f));
- Consentimiento cuando corresponda (Art. 6(1)(a)).

4. Finalidad del Tratamiento

- Autenticación y gestión de cuentas;
- Seguridad de la plataforma;
- Funcionalidad explicativa de la IA;
- Información climática personalizada.

5. Procesamiento por IA Generativa

Los textos enviados para explicación pueden ser procesados por proveedores de IA integrados bajo estricta minimización de datos. No se utilizan datos personales para entrenar modelos de IA propietarios.

6. Retención de Datos

Los datos se conservan solo durante el tiempo necesario para la prestación del servicio o el cumplimiento de obligaciones legales.

7. Derechos del Titular (Arts. 15-22 GDPR)

Los usuarios pueden solicitar:
- Acceso
- Rectificación
- Supresión
- Limitación
- Portabilidad de datos
- Oposición

8. Seguridad (Art. 32 GDPR)

Se implementan medidas técnicas y organizativas adecuadas.

9. Autoridad de Control

Los usuarios pueden presentar una reclamación ante la autoridad de protección de datos competente dentro de la UE.`,
    authTermsCheckbox: "He leído y acepto los",
    authTermsLink: "Términos de Uso y Política de Privacidad",
    authErrorTerms: "Debes aceptar los términos para continuar",
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
    reportPhotoAnalyzing: "Analizando imagen con IA…",
    reportPhotoRejected: "Se detectaron personas en la imagen. Por favor, toma otra foto sin personas.",
    reportPhotoAccepted: "Imagen aprobada — no se detectaron personas.",
    reportSend: "Enviar reporte",
    reportBack: "← Volver a categorías",
    reportSuccess: "¡Reporte enviado con éxito! Gracias por contribuir.",
    reportCategory: "Reportar",
    reportTitleLabel: "Título",
    reportTitlePlaceholder: "Ej.: Árbol caído en la Rúa Nova",
    reportAddressLabel: "Ubicación",
    reportAddressPlaceholder: "Escribe la dirección o nombre de la calle...",
    reportPhotoRequired: "Se requiere una foto para enviar el reporte.",
    reportSending: "Enviando...",
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
    typeRain: "Lluvia",
    typeHail: "Granizo",
    typeFrost: "Helada",
    typeLandslide: "Deslizamiento",
    aiUnderstandAlert: "Entender esta alerta",
    aiUnderstandForecast: "Entender la diferencia",
    aiPowered: "IA Powered",
    alertRecommendedActions: "Acciones recomendadas",
    alertMoreInfo: "Más información",
    communityViewDetails: "Ver detalles",
    alertDetailTitle: "Análisis de la alerta",
    alertDetailExplanation: "Esta alerta fue emitida con base en datos de agencias meteorológicas oficiales (AEMET) combinados con feeds CAP (Common Alerting Protocol) en tiempo real. Nuestro sistema de IA cruzó esta información con patrones históricos e informes de la comunidad en un radio de 25km para evaluar el impacto local. El nivel de severidad refleja la probabilidad e intensidad del evento según múltiples fuentes de datos.",
    alertDetailContinueChat: "¿Tienes preguntas? Continúa conversando con el asistente de IA para orientación personalizada.",
    forecastDetailTitle: "Entendiendo las previsiones",
    forecastDetailOfficialExplanation: "La Previsión Oficial proviene de agencias meteorológicas nacionales (como AEMET en España) que utilizan modelos físicos ejecutados en supercomputadores. Estos modelos dividen la atmósfera en cuadrículas de unos 10 km y calculan cómo cambiarán la temperatura, la presión y la humedad. Se actualizan cada 6 a 12 horas y son muy fiables para las próximas 24 a 48 horas, pero pierden precisión más allá de 5 días.",
    forecastDetailMLExplanation: "La Previsión ML usa inteligencia artificial entrenada con más de 30 años de historial climático local. Aprende patrones específicos de tu zona que los modelos globales no captan, como el calor atrapado en la ciudad, el comportamiento del viento en valles o cómo la costa afecta la lluvia. Cuando la previsión ML y la oficial muestran números diferentes, normalmente significa que hay un efecto local al que conviene prestar atención.",
    forecastDetailContinueChat: "¿Quieres profundizar? Pregunta al asistente de IA sobre patrones específicos o discrepancias.",
    forecastDetailIoTExplanation: "Los Sensores IoT son dispositivos físicos desplegados en la región que miden condiciones en tiempo real como temperatura, humedad y velocidad del viento. Como capturan lo que realmente está ocurriendo (no predicciones), tienen el nivel de confianza más alto. Cuando los datos IoT coinciden con las previsiones, puedes confiar en ellas. Cuando divergen, los sensores muestran un efecto microclimático local que los modelos no predijeron.",
    forecastDetailWhyCompare: "Comparar las tres fuentes te ayuda a tomar mejores decisiones. La oficial te da el panorama general, la ML captura patrones locales y los sensores IoT muestran lo que realmente está pasando ahora. Cuando las tres coinciden, puedes tener mucha confianza. Cuando divergen, los datos IoT en tiempo real son la verdad del terreno — a menudo revelan microclimas o cambios rápidos que los modelos no predijeron.",
    forecastDetailConfidenceLabel: "Confianza — cuán seguro está el modelo sobre esta previsión (100% = certeza máxima)",
    communityDetailTitle: "Reporte comunitario",
    communityDetailVerified: "Verificado por IA",
    communityDetailPending: "Pendiente de verificación",
    communityDetailLocation: "Ubicación",
    communityDetailTime: "Reportado",
    communityRateTitle: "Evaluar este reporte",
    communityRateDesc: "¿Fue útil o preciso este reporte comunitario?",
    communityRateHelpful: "Útil",
    communityRateNotHelpful: "No útil",
    communityRateThanks: "¡Gracias por tu feedback!",
    homeMapHint: "Toca el ícono Mapa para una vista detallada",
    backButton: "Volver",
    notifTitle: "Notificaciones",
    notifAlertReceived: "Alerta recibida para tu zona",
    notifReportSent: "Tu reporte fue enviado",
    notifReportVerified: "Tu reporte fue verificado por IA",
    notifCommunityNearby: "Nuevo reporte comunitario cercano",
    notifMarkAllRead: "Marcar todo como leído",
    menuAbout: "Sobre ClimateLoop",
    menuHelp: "Ayuda y Soporte",
    menuTerms: "Términos de Uso",
    menuShare: "Compartir App",
    menuMyContributions: "Mis Contribuciones",
    myContribTitle: "Mis Contribuciones",
    myContribEmpty: "Aún no has enviado ningún reporte.",
    myContribStatus: "Estado",
    myContribVerified: "Verificado",
    myContribPending: "En revisión",
    filterAll: "Todos",
    filterByType: "Tipo",
    filterByRadius: "Radio",
    filterRadiusKm: "km",
    photoBlurWarning: "Las fotos no deben contener personas identificables.",
    weatherRainChance: "Lluvia",
    forecastDetailDeeperTitle: "¿Quieres profundizar?",
    forecastDetailDeeperDesc: "Toca el ícono del Asistente IA en la barra inferior para preguntar sobre patrones específicos o discrepancias.",
    alertDetailAskTitle: "¿Tienes preguntas?",
    alertDetailAskDesc: "Toca el ícono del Asistente IA en la barra inferior para orientación personalizada sobre esta alerta.",
    alertDetailChatButton: "Conversar sobre esta alerta",
    emergencyTitle: "Teléfonos de emergencia — España",
    emergencyPolice: "Policía",
    emergencyFire: "Bomberos",
    emergencyMedical: "Emergencia médica",
    emergencyCivilDefense: "Protección Civil",
    emergencyRedCross: "Cruz Roja",
    communitySentByMe: "Enviado por mí",
    myLocationTitle: "Mi ubicación",
    myLocationUseGPS: "Usar GPS",
    myLocationGPSDesc: "Detectar tu ubicación actual automáticamente",
    myLocationSearchPlaceholder: "Buscar ciudad o dirección...",
    myLocationSaved: "Ubicaciones guardadas",
    myLocationNoSaved: "Aún no hay ubicaciones guardadas",
    myLocationSave: "Guardar esta ubicación",
    myLocationCurrent: "Ubicación actual",
    myLocationDetecting: "Detectando ubicación...",
    iotTitle: "Estación IoT más cercana",
    iotLive: "EN VIVO",
    iotLastUpdate: "Actualizado",
    iotRadiusNote: "En un radio de 5km",
    iotInfoTitle: "¿Qué son los sensores IoT?",
    iotInfoDesc1: "Los sensores IoT (Internet de las Cosas) son pequeñas estaciones meteorológicas instaladas en ubicaciones estratégicas de tu ciudad. Miden temperatura, humedad, velocidad del viento y otras variables climáticas en tiempo real.",
    iotInfoDesc2: "A diferencia de las previsiones (que son predicciones), los datos IoT muestran exactamente lo que está ocurriendo ahora en una ubicación específica. Esto los hace extremadamente valiosos para validar si las previsiones oficiales y de ML son precisas.",
    iotInfoDesc3: "La red ClimateLoop está creciendo — cuantos más sensores se desplieguen en tu zona, más precisa y localizada será la información climática. Cada sensor cubre un radio aproximado de 5km.",
    alertExplainOrangeRain: "Oye, ojo con esto — esta alerta naranja de lluvia es seria pero manejable. Básicamente, se esperan más de 50mm de lluvia en las próximas horas, que es bastante. Imagina 50 litros de agua por metro cuadrado. Las calles se pueden inundar rápido, especialmente en zonas bajas. Lo bueno es que no es el nivel más alto (rojo), así que si te mantienes alerta y evitas zonas de riesgo, estarás bien. Eso sí, no intentes cruzar calles inundadas — así es como ocurren la mayoría de accidentes.",
    alertExplainRedRain: "Esto es alerta roja, el nivel más alto — tómalo muy en serio. Hablamos de lluvia por encima de 80mm por hora, lo que puede causar inundaciones repentinas, deslizamientos y peligro real. No es una situación de 'quizá llevo paraguas'. Si estás cerca de laderas, ríos o zonas bajas, considera ir a terreno más alto. Ten documentos y kit de emergencia listos. Si las autoridades dicen evacuar, hazlo. Este tipo de evento puede escalar muy rápido.",
    alertExplainOrangeHeat: "Mañana va a ser brutalmente caluroso — más de 38°C. No es solo incómodo, es genuinamente peligroso para personas mayores, niños y cualquiera con problemas de salud. Tu cuerpo lucha por enfriarse a estas temperaturas. Mantente hidratado (mucha más agua de la que crees), evita estar fuera entre las 10h y las 16h, y mantén las cortinas cerradas. Si conoces vecinos mayores, comprueba cómo están — el calor puede ser un asesino silencioso.",
    alertExplainYellowWind: "Esta es una alerta amarilla de viento — no es súper peligrosa, pero merece atención. Se esperan ráfagas de hasta 60km/h esta tarde. Es suficiente para tirar macetas, romper ramas débiles y hacer volar objetos ligeros. Si tienes algo suelto en tu balcón o terraza, mételo dentro. Y quizá hoy no estaciones bajo árboles. Debería calmarse por la noche.",
    alertExplainMLHail: "Esta es interesante — nuestro modelo ML detectó un patrón que sugiere un 35% de probabilidad de granizo en unas 48 horas. No viene del servicio meteorológico oficial; es nuestra IA analizando datos históricos y condiciones atmosféricas actuales. 35% no es seguro, pero es suficiente para planificar. Si tienes el coche aparcado fuera, considera cubrirlo. Estate atento a las actualizaciones — sabremos más a medida que las condiciones evolucionen.",
    profileUnits: "Unidades",
    forecastPrecip: "Precipitación",
    alertCategoryNow: "Activos ahora",
    alertCategoryFuture: "Próximos",
    alertCategoryPast: "Recientes",
    alertFutureHeatTitle: "Alerta naranja: Calor extremo D+1",
    alertFutureHeatDesc: "Temperaturas superiores a 40°C esperadas pasado mañana. Prepárate con antelación.",
    alertFutureHeatTime: "Previsión D+1",
    alertPastRainTitle: "Alerta naranja: Lluvia fuerte (finalizada)",
    alertPastRainDesc: "Lluvia de 45mm registrada hace 2 días. La alerta ha sido desactivada.",
    alertPastYesterday: "Ayer",
    alertPast2Days: "Hace 2 días",
    alertOfficialTextLabel: "Texto oficial",
    alertOfficialTextCopy: "Copiar",
    alertOfficialTextCopied: "¡Copiado!",
    alertOfficialTextShare: "Compartir",
    alertOfficialTextTranslate: "Traducir a",
    authLogin: "Iniciar sesión",
    authSignup: "Crear cuenta",
    authLoginDesc: "Introduce tus credenciales para continuar",
    authSignupDesc: "Crea tu cuenta para empezar",
    authName: "Nombre",
    authNamePlaceholder: "Tu nombre completo",
    authEmail: "Correo electrónico",
    authEmailPlaceholder: "tu@email.com",
    authPassword: "Contraseña",
    authPasswordPlaceholder: "Al menos 6 caracteres",
    authTagline: "Inteligencia climática impulsada por la comunidad",
    authNoAccount: "¿No tienes cuenta? Regístrate",
    authHaveAccount: "¿Ya tienes cuenta? Inicia sesión",
    authErrorRequired: "El correo y la contraseña son obligatorios",
    authErrorName: "El nombre es obligatorio",
    authErrorPassword: "La contraseña debe tener al menos 6 caracteres",
    mapFilters: "Filtros",
    mapFilterAll: "Todos",
    catAir: "Aire",
    catAlerts: "Alertas",
    catMetrics: "Métricas",
    catFrost: "Helada",
  },
  pt: {
    location: "Galicia, Espanha",
    navHome: "Início",
    navAlerts: "Alertas",
    navReport: "Reportar",
    navMap: "Mapa",
    navAI: "IA",
    navCommunity: "Comunidade",
    navProfile: "Perfil",
    weatherLocation: "Galicia, Centro",
    weatherPartlyCloudy: "Parcialmente nublado",
    weatherFeelsLike: "Sensação",
    weatherHumidity: "Umidade",
    weatherWind: "Vento",
    forecastTitle: "Previsão comparada",
    forecastOfficial: "Oficial",
    forecastML: "Previsão ML",
    forecastIoT: "Sensores IoT",
    forecastRain: "Chuva",
    forecastMLNote: "O modelo ML detecta +15% de chance de chuva intensa nas próximas 6h",
    communityTitle: "Comunidade ao redor",
    communitySubtitle: "Relatos num raio de 5km da sua localização",
    communitySeeAllCTA: "Toque no ícone Comunidade abaixo para ver todos os relatos",
    communityNoReportsNearby: "Sem relatos por perto. Toque no ícone Comunidade abaixo para ver todos os relatos ou aumentar o raio.",
    aiTitle: "Assistente IA",
    aiPlaceholder: "Pergunte sobre o clima...",
    aiInitialMessage: "Olá! Sou o assistente de IA do ClimateLoop. Como posso te ajudar hoje?",
    aiResponse: "Baseado nos dados históricos de ML e nos alertas CAP ativos, recomendo que você evite áreas baixas nas próximas horas. A previsão oficial indica 40% de chuva, mas nosso modelo indica 55% — a diferença se deve aos padrões de umidade que o ML detectou nos últimos 3 dias. As fotos enviadas pela comunidade também mostram nuvens de chuva se formando a oeste.",
    aiDisclaimer: "Você está conversando com um assistente de IA.",
    alertsTitle: "Alertas ativos",
    alertsFilter: "Filtrar",
    alertsFilterAll: "Todos",
    alertsFilterSeverity: "Severidade",
    alertsFilterTime: "Período",
    alertsSeverityRed: "Alta",
    alertsSeverityOrange: "Moderada",
    alertsSeverityYellow: "Baixa",
    alertsNoAlerts: "Sem alertas para a sua zona",
    alertOriginalLang: "Original",
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
    mapHighRisk: "Alto",
    mapModerateRisk: "Moderado",
    mapLowRisk: "Baixo",
    mapViewReport: "Ver contribuição",
    profileDemoUser: "Usuário Demo",
    profileReports: "Relatos",
    profileDaysActive: "Dias ativo",
    profileRating: "Avaliação",
    profileRatingHint: "Votos médios da comunidade",
    profileMyLocation: "Minha localização",
    profileLocationValue: "Galicia, Espanha",
    profileNotifications: "Notificações",
    profileNotifActive: "Ativas",
    profilePrivacy: "Política de Privacidade e Termos",
    legalTitle: "Política de Privacidade e Termos de Uso",
    legalTermsHeading: "Termos de Uso",
    legalPrivacyHeading: "Política de Privacidade",
    legalTermsContent: `1. Definições

"Plataforma" refere-se ao Climate Loop.
"Usuário" refere-se a qualquer pessoa que acesse a Plataforma.
"Sistema de IA" refere-se aos modelos de Machine Learning e IA generativa integrados.

2. Escopo do Serviço

A Plataforma oferece:
- Previsões meteorológicas com Machine Learning;
- Alertas estruturados no padrão CAP;
- Contribuições da comunidade;
- Assistente de IA explicativo.

Trata-se de protótipo acadêmico em evolução para produto comercial.

3. Ausência de Decisão Automatizada

A IA apenas explica conteúdos.
Não produz efeitos jurídicos nos termos do Art. 22 do GDPR.

4. Minimização de Dados

Coletamos apenas:
- Nome
- E-mail
- Senha criptografada

5. Contribuições

Imagens são armazenadas somente se a IA confirmar:
- Ausência de pessoas identificáveis;
- Coerência com o evento reportado.

Formato público: Primeiro nome + inicial do sobrenome.

6. Transparência e AI Act (Art. 52 AI Act)

Os usuários são claramente informados quando interagem com um sistema de IA. A IA implantada qualifica-se como sistema de risco limitado sob o AI Act da UE. O Climate Loop aplica:
- Medidas de transparência;
- Salvaguardas baseadas em risco;
- Supervisão humana proporcional à função do sistema.

7. Natureza Informativa

A Plataforma não substitui autoridades públicas oficiais ou serviços de emergência.

8. Limitação de Responsabilidade

Na medida permitida por lei, o Climate Loop não será responsável por danos indiretos ou consequentes decorrentes do uso informativo da Plataforma.

9. Marco Legal

Estes Termos estão alinhados com o Regulamento Geral sobre a Proteção de Dados (GDPR) e o Regulamento de Inteligência Artificial da UE.`,
    legalPrivacyContent: `1. Controlador de Dados

O Climate Loop atua como Controlador de Dados para os dados pessoais processados através da Plataforma.

2. Dados Coletados

- Nome
- E-mail
- Senha criptografada
- Logs de sessão
- Localização opcional (baseada em consentimento)

3. Base Legal (Art. 6 GDPR)

O processamento baseia-se em:
- Execução de contrato (Art. 6(1)(b));
- Interesse legítimo (Art. 6(1)(f));
- Consentimento quando aplicável (Art. 6(1)(a)).

4. Finalidade do Processamento

- Autenticação e gestão de contas;
- Segurança da plataforma;
- Funcionalidade explicativa da IA;
- Informação climática personalizada.

5. Processamento por IA Generativa

Textos submetidos para explicação podem ser processados por provedores de IA integrados sob estrita minimização de dados. Dados pessoais não são utilizados para treinar modelos de IA proprietários.

6. Retenção de Dados

Os dados são retidos apenas pelo tempo necessário para a prestação do serviço ou cumprimento de obrigações legais.

7. Direitos do Titular (Arts. 15-22 GDPR)

Os usuários podem solicitar:
- Acesso
- Retificação
- Exclusão
- Limitação
- Portabilidade de dados
- Oposição

8. Segurança (Art. 32 GDPR)

Medidas técnicas e organizacionais adequadas são implementadas.

9. Autoridade Supervisora

Os usuários podem apresentar reclamação à autoridade de proteção de dados competente dentro da UE.`,
    authTermsCheckbox: "Li e concordo com os",
    authTermsLink: "Termos de Uso e Política de Privacidade",
    authErrorTerms: "Você precisa aceitar os termos para continuar",
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
    reportPhotoAnalyzing: "Analisando imagem com IA…",
    reportPhotoRejected: "Pessoas detectadas na imagem. Por favor, tire outra foto sem pessoas.",
    reportPhotoAccepted: "Imagem aprovada — nenhuma pessoa detectada.",
    reportSend: "Enviar relato",
    reportBack: "← Voltar às categorias",
    reportSuccess: "Relato enviado com sucesso! Obrigado por contribuir.",
    reportCategory: "Reportar",
    reportTitleLabel: "Título",
    reportTitlePlaceholder: "Ex.: Árvore caída na Rúa Nova",
    reportAddressLabel: "Localização",
    reportAddressPlaceholder: "Digite o endereço ou nome da rua...",
    reportPhotoRequired: "Uma foto é obrigatória para enviar o relato.",
    reportSending: "Enviando...",
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
    typeRain: "Chuva",
    typeHail: "Granizo",
    typeFrost: "Geada",
    typeLandslide: "Deslizamento",
    aiUnderstandAlert: "Entenda este alerta",
    aiUnderstandForecast: "Entenda a diferença",
    aiPowered: "IA Powered",
    alertRecommendedActions: "Ações recomendadas",
    alertMoreInfo: "Mais informações",
    communityViewDetails: "Ver detalhes",
    alertDetailTitle: "Análise do alerta",
    alertDetailExplanation: "Este alerta foi emitido com base em dados de agências meteorológicas oficiais (AEMET) combinados com feeds CAP (Common Alerting Protocol) em tempo real. Nosso sistema de IA cruzou essas informações com padrões históricos e relatos da comunidade num raio de 25km para avaliar o impacto local. O nível de severidade reflete a probabilidade e intensidade do evento com base em múltiplas fontes de dados.",
    alertDetailContinueChat: "Tem dúvidas? Continue conversando com o assistente de IA para orientação personalizada.",
    forecastDetailTitle: "Entendendo as previsões",
    forecastDetailOfficialExplanation: "A Previsão Oficial vem de agências meteorológicas nacionais (como a AEMET na Espanha) que usam modelos físicos rodando em supercomputadores. Esses modelos dividem a atmosfera em grades de cerca de 10 km e calculam como temperatura, pressão e umidade vão mudar ao longo do tempo. São atualizados a cada 6 a 12 horas e são muito confiáveis para as próximas 24 a 48 horas, mas perdem precisão além de 5 dias.",
    forecastDetailMLExplanation: "A Previsão ML usa inteligência artificial treinada com mais de 30 anos de histórico climático local. Ela aprende padrões específicos da sua região que os modelos globais não captam, como o calor preso nas cidades, o comportamento do vento em vales ou como a costa afeta a chuva. Quando a ML e a oficial mostram números diferentes, normalmente significa que há um efeito local que merece atenção.",
    forecastDetailContinueChat: "Quer se aprofundar? Pergunte ao assistente de IA sobre padrões específicos ou discrepâncias.",
    forecastDetailIoTExplanation: "Os Sensores IoT são dispositivos físicos espalhados pela região que medem condições em tempo real como temperatura, umidade e velocidade do vento. Como capturam o que realmente está acontecendo agora (não previsões), possuem o nível de confiança mais alto. Quando os dados IoT coincidem com as previsões, você pode confiar nelas. Quando divergem, os sensores revelam um efeito microclimático local que os modelos não previram.",
    forecastDetailWhyCompare: "Comparar as três fontes ajuda você a tomar decisões melhores. A oficial traz o panorama geral, a ML captura padrões locais e os sensores IoT mostram o que realmente está acontecendo agora. Quando as três concordam, você pode ter muita confiança. Quando divergem, os dados IoT em tempo real são a verdade do terreno — frequentemente revelam microclimas ou mudanças rápidas que os modelos não previram.",
    forecastDetailConfidenceLabel: "Confiança — o quanto o modelo tem certeza sobre esta previsão (100% = certeza máxima)",
    communityDetailTitle: "Relato da comunidade",
    communityDetailVerified: "Verificado por IA",
    communityDetailPending: "Pendente de verificação",
    communityDetailLocation: "Localização",
    communityDetailTime: "Reportado",
    communityRateTitle: "Avaliar este relato",
    communityRateDesc: "Este relato da comunidade foi útil ou preciso?",
    communityRateHelpful: "Útil",
    communityRateNotHelpful: "Não útil",
    communityRateThanks: "Obrigado pelo seu feedback!",
    homeMapHint: "Clique no ícone Mapa para uma versão detalhada",
    backButton: "Voltar",
    notifTitle: "Notificações",
    notifAlertReceived: "Alerta recebido para sua área",
    notifReportSent: "Seu relato foi enviado",
    notifReportVerified: "Seu relato foi verificado pela IA",
    notifCommunityNearby: "Novo relato da comunidade próximo",
    notifMarkAllRead: "Marcar tudo como lido",
    menuAbout: "Sobre o ClimateLoop",
    menuHelp: "Ajuda e Suporte",
    menuTerms: "Termos de Uso",
    menuShare: "Compartilhar App",
    menuMyContributions: "Minhas Contribuições",
    myContribTitle: "Minhas Contribuições",
    myContribEmpty: "Você ainda não enviou nenhum relato.",
    myContribStatus: "Status",
    myContribVerified: "Verificado",
    myContribPending: "Em análise",
    filterAll: "Todos",
    filterByType: "Tipo",
    filterByRadius: "Raio",
    filterRadiusKm: "km",
    photoBlurWarning: "As fotos não devem conter pessoas identificáveis.",
    weatherRainChance: "Chuva",
    forecastDetailDeeperTitle: "Quer se aprofundar?",
    forecastDetailDeeperDesc: "Toque no ícone do Assistente IA na barra inferior para perguntar sobre padrões específicos ou discrepâncias.",
    alertDetailAskTitle: "Tem dúvidas?",
    alertDetailAskDesc: "Toque no ícone do Assistente IA na barra inferior para orientação personalizada sobre este alerta.",
    alertDetailChatButton: "Conversar sobre este alerta",
    emergencyTitle: "Telefones de emergência — Espanha",
    emergencyPolice: "Polícia",
    emergencyFire: "Bombeiros",
    emergencyMedical: "Emergência médica",
    emergencyCivilDefense: "Proteção Civil",
    emergencyRedCross: "Cruz Vermelha",
    communitySentByMe: "Enviado por mim",
    myLocationTitle: "Minha localização",
    myLocationUseGPS: "Usar GPS",
    myLocationGPSDesc: "Detectar sua localização atual automaticamente",
    myLocationSearchPlaceholder: "Buscar cidade ou endereço...",
    myLocationSaved: "Localizações salvas",
    myLocationNoSaved: "Nenhuma localização salva ainda",
    myLocationSave: "Salvar esta localização",
    myLocationCurrent: "Localização atual",
    myLocationDetecting: "Detectando localização...",
    iotTitle: "Estação IoT mais próxima",
    iotLive: "AO VIVO",
    iotLastUpdate: "Atualizado",
    iotRadiusNote: "Num raio de 5km",
    iotInfoTitle: "O que são sensores IoT?",
    iotInfoDesc1: "Sensores IoT (Internet das Coisas) são pequenas estações meteorológicas instaladas em locais estratégicos da sua cidade. Eles medem temperatura, umidade, velocidade do vento e outras variáveis climáticas em tempo real.",
    iotInfoDesc2: "Diferente das previsões (que são estimativas), os dados IoT mostram exatamente o que está acontecendo agora em um local específico. Isso os torna extremamente valiosos para validar se as previsões oficiais e de ML estão corretas.",
    iotInfoDesc3: "A rede ClimateLoop está crescendo — quanto mais sensores na sua região, mais precisa e localizada será a informação climática. Cada sensor cobre um raio aproximado de 5km.",
    alertExplainOrangeRain: "Ei, atenção — esse alerta laranja de chuva é sério, mas dá pra lidar. Basicamente, estão prevendo mais de 50mm de chuva nas próximas horas, o que é bastante. Imagina 50 litros de água por metro quadrado. As ruas podem alagar rápido, especialmente em áreas baixas. A boa notícia é que não é o nível mais alto (vermelho), então se você ficar atento e evitar pontos de risco, vai ficar bem. Só não tente atravessar ruas alagadas — é assim que a maioria dos acidentes acontece.",
    alertExplainRedRain: "Isso é alerta vermelho, o nível mais alto — leve muito a sério. Estamos falando de chuva acima de 80mm por hora, o que pode causar enchentes relâmpago, deslizamentos e perigo real. Não é uma situação de 'talvez eu leve um guarda-chuva'. Se você está perto de encostas, rios ou áreas baixas, considere ir para um lugar mais alto. Tenha documentos e kit de emergência prontos. Se as autoridades mandarem evacuar, faça isso. Esse tipo de evento pode escalar muito rápido.",
    alertExplainOrangeHeat: "Amanhã vai ser brutalmente quente — acima de 38°C. Não é só desconfortável, é genuinamente perigoso para idosos, crianças e qualquer pessoa com problemas de saúde. Seu corpo tem dificuldade para se resfriar nessas temperaturas. Beba muita água (muito mais do que você acha), evite ficar fora entre 10h e 16h, e mantenha as cortinas fechadas. Se você conhece vizinhos idosos, passe para ver como estão — o calor pode ser um assassino silencioso.",
    alertExplainYellowWind: "Esse é um alerta amarelo de vento — não é super perigoso, mas vale prestar atenção. Estão prevendo rajadas de até 60km/h à tarde. É forte o suficiente para derrubar vasos, quebrar galhos fracos e fazer objetos leves voarem. Se você tem algo solto na varanda ou terraço, guarde. E talvez hoje não estacione embaixo de árvores. Deve acalmar à noite.",
    alertExplainMLHail: "Essa é interessante — nosso modelo ML detectou um padrão que sugere 35% de chance de granizo em cerca de 48 horas. Não é do serviço meteorológico oficial; é nossa IA analisando dados históricos e condições atmosféricas atuais. 35% não é certeza, mas é alto o suficiente para se planejar. Se seu carro está estacionado fora, considere cobri-lo. Fique de olho nas atualizações — vamos saber mais conforme as condições evoluem.",
    profileUnits: "Unidades",
    forecastPrecip: "Precipitação",
    alertCategoryNow: "Ativos agora",
    alertCategoryFuture: "Próximos",
    alertCategoryPast: "Passados",
    alertFutureHeatTitle: "Alerta laranja: Calor extremo D+1",
    alertFutureHeatDesc: "Temperaturas acima de 40°C esperadas depois de amanhã. Prepare-se com antecedência.",
    alertFutureHeatTime: "Previsão D+1",
    alertPastRainTitle: "Alerta laranja: Chuva forte (encerrado)",
    alertPastRainDesc: "Chuva de 45mm registrada há 2 dias. O alerta foi desativado.",
    alertPastYesterday: "Ontem",
    alertPast2Days: "Há 2 dias",
    alertOfficialTextLabel: "Texto oficial",
    alertOfficialTextCopy: "Copiar",
    alertOfficialTextCopied: "Copiado!",
    alertOfficialTextShare: "Compartilhar",
    alertOfficialTextTranslate: "Traduzir para",
    authLogin: "Entrar",
    authSignup: "Criar conta",
    authLoginDesc: "Insira suas credenciais para continuar",
    authSignupDesc: "Crie sua conta para começar",
    authName: "Nome",
    authNamePlaceholder: "Seu nome completo",
    authEmail: "E-mail",
    authEmailPlaceholder: "seu@email.com",
    authPassword: "Senha",
    authPasswordPlaceholder: "Pelo menos 6 caracteres",
    authTagline: "Inteligência climática impulsionada pela comunidade",
    authNoAccount: "Não tem conta? Cadastre-se",
    authHaveAccount: "Já tem conta? Entrar",
    authErrorRequired: "E-mail e senha são obrigatórios",
    authErrorName: "O nome é obrigatório",
    authErrorPassword: "A senha deve ter pelo menos 6 caracteres",
    mapFilters: "Filtros",
    mapFilterAll: "Todos",
    catAir: "Ar",
    catAlerts: "Alertas",
    catMetrics: "Métricas",
    catFrost: "Geada",
  },
  fr: {
    location: "Galicia, Espagne",
    navHome: "Accueil",
    navAlerts: "Alertes",
    navReport: "Signaler",
    navMap: "Carte",
    navAI: "IA",
    navCommunity: "Communauté",
    navProfile: "Profil",
    weatherLocation: "Galicia, Centre",
    weatherPartlyCloudy: "Partiellement nuageux",
    weatherFeelsLike: "Ressenti",
    weatherHumidity: "Humidité",
    weatherWind: "Vent",
    forecastTitle: "Prévision comparée",
    forecastOfficial: "Officielle",
    forecastML: "Prévision ML",
    forecastIoT: "Capteurs IoT",
    forecastRain: "Pluie",
    forecastMLNote: "Le modèle ML détecte +15% de risque de pluie intense dans les 6 prochaines heures",
    communityTitle: "Communauté à proximité",
    communitySubtitle: "Signalements dans un rayon de 5km de votre position",
    communitySeeAllCTA: "Appuyez sur l'icône Communauté ci-dessous pour voir tous les signalements",
    communityNoReportsNearby: "Aucun signalement à proximité. Appuyez sur l'icône Communauté ci-dessous pour voir tous les signalements ou augmenter le rayon.",
    aiTitle: "Assistant IA",
    aiPlaceholder: "Posez une question sur la météo...",
    aiInitialMessage: "Bonjour ! Je suis l'assistant IA de ClimateLoop. Comment puis-je vous aider aujourd'hui ?",
    aiResponse: "D'après les données historiques ML et les alertes CAP actives, je recommande d'éviter les zones basses dans les prochaines heures. La prévision officielle indique 40% de pluie, mais notre modèle indique 55% — la différence est due aux schémas d'humidité détectés par le ML ces 3 derniers jours. Les photos de la communauté montrent aussi des nuages de pluie se formant à l'ouest.",
    aiDisclaimer: "Vous discutez avec un assistant IA.",
    alertsTitle: "Alertes actives",
    alertsFilter: "Filtrer",
    alertsFilterAll: "Tous",
    alertsFilterSeverity: "Sévérité",
    alertsFilterTime: "Période",
    alertsSeverityRed: "Élevée",
    alertsSeverityOrange: "Modérée",
    alertsSeverityYellow: "Faible",
    alertsNoAlerts: "Aucune alerte pour votre zone",
    alertOriginalLang: "Original",
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
    mapHighRisk: "Élevé",
    mapModerateRisk: "Modéré",
    mapLowRisk: "Faible",
    mapViewReport: "Voir le rapport",
    profileDemoUser: "Utilisateur Démo",
    profileReports: "Signalements",
    profileDaysActive: "Jours actif",
    profileRating: "Évaluation",
    profileRatingHint: "Votes moyens de la communauté",
    profileMyLocation: "Ma position",
    profileLocationValue: "Galicia, Espagne",
    profileNotifications: "Notifications",
    profileNotifActive: "Actives",
    profilePrivacy: "Politique de Confidentialité et CGU",
    legalTitle: "Politique de Confidentialité et Conditions d'Utilisation",
    legalTermsHeading: "Conditions d'Utilisation",
    legalPrivacyHeading: "Politique de Confidentialité",
    legalTermsContent: `1. Définitions

"Plateforme" désigne Climate Loop.
"Utilisateur" désigne toute personne accédant au service.
"Système d'IA" inclut modèles ML et IA générative.

2. Portée

Prévisions météorologiques, alertes CAP, contributions communautaires et assistant explicatif.

Projet académique évoluant vers produit commercial.

3. Absence de Décision Automatisée

Aucun effet juridique au sens de l'Art. 22 RGPD.

4. Minimisation des Données

Collecte limitée à :
- Prénom
- Email
- Mot de passe chiffré

5. Contributions

Images stockées uniquement après validation IA confirmant absence de personnes identifiables.

6. Transparence et AI Act (Art. 52 AI Act)

Les utilisateurs sont clairement informés lorsqu'ils interagissent avec un système d'IA. L'IA déployée est classée comme système à risque limité en vertu du AI Act de l'UE. Climate Loop applique :
- Des mesures de transparence ;
- Des garanties basées sur le risque ;
- Une supervision humaine proportionnelle à la fonction du système.

7. Avertissement Informatif

La Plateforme ne remplace pas les autorités publiques officielles ni les services d'urgence.

8. Limitation de Responsabilité

Dans la mesure permise par la loi, Climate Loop ne sera pas responsable des dommages indirects ou consécutifs résultant de l'utilisation informative de la Plateforme.

9. Cadre Juridique

Ces Conditions sont alignées sur le Règlement Général sur la Protection des Données (RGPD) et le Règlement sur l'Intelligence Artificielle de l'UE.`,
    legalPrivacyContent: `1. Responsable du Traitement

Climate Loop agit comme responsable du traitement des données personnelles traitées via la Plateforme.

2. Données Collectées

- Prénom
- E-mail
- Mot de passe chiffré
- Données de session
- Localisation optionnelle (basée sur le consentement)

3. Base Légale (Art. 6 RGPD)

Le traitement est fondé sur :
- L'exécution du contrat (Art. 6(1)(b)) ;
- L'intérêt légitime (Art. 6(1)(f)) ;
- Le consentement le cas échéant (Art. 6(1)(a)).

4. Finalité du Traitement

- Authentification et gestion des comptes ;
- Sécurité de la plateforme ;
- Fonctionnalité explicative de l'IA ;
- Information climatique personnalisée.

5. Traitement par IA Générative

Les textes soumis pour explication peuvent être traités par des fournisseurs d'IA intégrés sous stricte minimisation des données. Aucune donnée personnelle n'est utilisée pour entraîner des modèles d'IA propriétaires.

6. Conservation des Données

Les données ne sont conservées que le temps nécessaire à la fourniture du service ou au respect des obligations légales.

7. Droits des Personnes Concernées (Arts. 15-22 RGPD)

Les utilisateurs peuvent demander :
- L'accès
- La rectification
- L'effacement
- La limitation
- La portabilité des données
- L'opposition

8. Sécurité (Art. 32 RGPD)

Des mesures techniques et organisationnelles appropriées sont mises en œuvre.

9. Autorité de Contrôle

Les utilisateurs peuvent déposer une plainte auprès de l'autorité de protection des données compétente au sein de l'UE.`,
    authTermsCheckbox: "J'ai lu et j'accepte les",
    authTermsLink: "Conditions d'Utilisation et Politique de Confidentialité",
    authErrorTerms: "Vous devez accepter les conditions pour continuer",
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
    reportPhotoAnalyzing: "Analyse de l'image par l'IA…",
    reportPhotoRejected: "Des personnes ont été détectées dans l'image. Veuillez prendre une autre photo sans personnes.",
    reportPhotoAccepted: "Image approuvée — aucune personne détectée.",
    reportSend: "Envoyer le signalement",
    reportBack: "← Retour aux catégories",
    reportSuccess: "Signalement envoyé avec succès ! Merci de contribuer.",
    reportCategory: "Signaler",
    reportTitleLabel: "Titre",
    reportTitlePlaceholder: "Ex. : Arbre tombé sur la Rúa Nova",
    reportAddressLabel: "Localisation",
    reportAddressPlaceholder: "Tapez l'adresse ou le nom de la rue...",
    reportPhotoRequired: "Une photo est requise pour soumettre le signalement.",
    reportSending: "Envoi en cours...",
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
    typeRain: "Pluie",
    typeHail: "Grêle",
    typeFrost: "Gel",
    typeLandslide: "Glissement",
    aiUnderstandAlert: "Comprendre cette alerte",
    aiUnderstandForecast: "Comprendre la différence",
    aiPowered: "IA Powered",
    alertRecommendedActions: "Actions recommandées",
    alertMoreInfo: "Plus d'informations",
    communityViewDetails: "Voir les détails",
    alertDetailTitle: "Analyse de l'alerte",
    alertDetailExplanation: "Cette alerte a été émise sur la base de données d'agences météorologiques officielles (AEMET) combinées avec des flux CAP (Common Alerting Protocol) en temps réel. Notre système d'IA a croisé ces informations avec des schémas historiques et des signalements communautaires dans un rayon de 25km pour évaluer l'impact local. Le niveau de sévérité reflète la probabilité et l'intensité de l'événement selon de multiples sources de données.",
    alertDetailContinueChat: "Des questions ? Continuez à discuter avec l'assistant IA pour un accompagnement personnalisé.",
    forecastDetailTitle: "Comprendre les prévisions",
    forecastDetailOfficialExplanation: "La Prévision Officielle provient d'agences météorologiques nationales (comme AEMET en Espagne) qui utilisent des modèles physiques exécutés sur des supercalculateurs. Ces modèles divisent l'atmosphère en grilles d'environ 10 km et calculent comment la température, la pression et l'humidité vont évoluer. Ils sont mis à jour toutes les 6 à 12 heures et sont très fiables pour les 24 à 48 prochaines heures, mais perdent en précision au-delà de 5 jours.",
    forecastDetailMLExplanation: "La Prévision ML utilise l'intelligence artificielle entraînée sur plus de 30 ans d'historique météo local. Elle apprend des schémas spécifiques à votre zone que les modèles globaux ne captent pas, comme la chaleur piégée en ville, le comportement du vent dans les vallées ou l'effet de la côte sur la pluie. Quand la ML et l'officielle montrent des chiffres différents, cela signifie généralement qu'il y a un effet local qui mérite attention.",
    forecastDetailContinueChat: "Envie d'approfondir ? Demandez à l'assistant IA des précisions sur des schémas ou divergences spécifiques.",
    forecastDetailIoTExplanation: "Les Capteurs IoT sont des dispositifs physiques déployés dans la région qui mesurent les conditions en temps réel comme la température, l'humidité et la vitesse du vent. Comme ils capturent ce qui se passe réellement (pas des prédictions), ils ont le niveau de confiance le plus élevé. Quand les données IoT concordent avec les prévisions, vous pouvez leur faire confiance. Quand elles divergent, les capteurs révèlent un effet microclimatique local que les modèles n'avaient pas prédit.",
    forecastDetailWhyCompare: "Comparer les trois sources vous aide à prendre de meilleures décisions. L'officielle donne une vue d'ensemble, la ML capture les détails locaux et les capteurs IoT montrent ce qui se passe réellement maintenant. Quand les trois concordent, vous pouvez être très confiant. Quand elles divergent, les données IoT en temps réel sont la vérité du terrain — elles révèlent souvent des microclimats ou des changements rapides que les modèles n'avaient pas prédits.",
    forecastDetailConfidenceLabel: "Confiance — à quel point le modèle est sûr de cette prévision (100% = certitude maximale)",
    communityDetailTitle: "Signalement communautaire",
    communityDetailVerified: "Vérifié par IA",
    communityDetailPending: "En attente de vérification",
    communityDetailLocation: "Localisation",
    communityDetailTime: "Signalé",
    communityRateTitle: "Évaluer ce signalement",
    communityRateDesc: "Ce signalement communautaire était-il utile ou précis ?",
    communityRateHelpful: "Utile",
    communityRateNotHelpful: "Pas utile",
    communityRateThanks: "Merci pour votre retour !",
    homeMapHint: "Appuyez sur l'icône Carte pour une vue détaillée",
    backButton: "Retour",
    notifTitle: "Notifications",
    notifAlertReceived: "Alerte reçue pour votre zone",
    notifReportSent: "Votre signalement a été envoyé",
    notifReportVerified: "Votre signalement a été vérifié par l'IA",
    notifCommunityNearby: "Nouveau signalement communautaire à proximité",
    notifMarkAllRead: "Tout marquer comme lu",
    menuAbout: "À propos de ClimateLoop",
    menuHelp: "Aide et Support",
    menuTerms: "Conditions d'utilisation",
    menuShare: "Partager l'application",
    menuMyContributions: "Mes Contributions",
    myContribTitle: "Mes Contributions",
    myContribEmpty: "Vous n'avez pas encore envoyé de signalement.",
    myContribStatus: "Statut",
    myContribVerified: "Vérifié",
    myContribPending: "En cours de vérification",
    filterAll: "Tous",
    filterByType: "Type",
    filterByRadius: "Rayon",
    filterRadiusKm: "km",
    photoBlurWarning: "Les photos ne doivent pas contenir de personnes identifiables.",
    weatherRainChance: "Pluie",
    forecastDetailDeeperTitle: "Envie d'approfondir ?",
    forecastDetailDeeperDesc: "Appuyez sur l'icône flottante de l'Assistant IA pour poser des questions sur des schémas ou divergences spécifiques.",
    alertDetailAskTitle: "Des questions ?",
    alertDetailAskDesc: "Appuyez sur l'icône flottante de l'Assistant IA pour un accompagnement personnalisé sur cette alerte.",
    alertDetailChatButton: "Discuter de cette alerte",
    emergencyTitle: "Numéros d'urgence — Espagne",
    emergencyPolice: "Police",
    emergencyFire: "Pompiers",
    emergencyMedical: "Urgence médicale",
    emergencyCivilDefense: "Protection Civile",
    emergencyRedCross: "Croix-Rouge",
    communitySentByMe: "Envoyé par moi",
    myLocationTitle: "Ma position",
    myLocationUseGPS: "Utiliser le GPS",
    myLocationGPSDesc: "Détecter votre position actuelle automatiquement",
    myLocationSearchPlaceholder: "Rechercher une ville ou adresse...",
    myLocationSaved: "Positions enregistrées",
    myLocationNoSaved: "Aucune position enregistrée",
    myLocationSave: "Enregistrer cette position",
    myLocationCurrent: "Position actuelle",
    myLocationDetecting: "Détection de la position...",
    iotTitle: "Station IoT la plus proche",
    iotLive: "EN DIRECT",
    iotLastUpdate: "Mis à jour",
    iotRadiusNote: "Dans un rayon de 5km",
    iotInfoTitle: "Que sont les capteurs IoT ?",
    iotInfoDesc1: "Les capteurs IoT (Internet des Objets) sont de petites stations météo installées à des emplacements stratégiques dans votre ville. Ils mesurent la température, l'humidité, la vitesse du vent et d'autres variables climatiques en temps réel.",
    iotInfoDesc2: "Contrairement aux prévisions (qui sont des estimations), les données IoT montrent exactement ce qui se passe maintenant à un endroit précis. Cela les rend extrêmement précieux pour vérifier si les prévisions officielles et ML sont exactes.",
    iotInfoDesc3: "Le réseau ClimateLoop grandit — plus il y a de capteurs dans votre zone, plus les informations climatiques seront précises et localisées. Chaque capteur couvre un rayon d'environ 5km.",
    alertExplainOrangeRain: "Attention — cette alerte orange de pluie est sérieuse mais gérable. En gros, on attend plus de 50mm de pluie dans les prochaines heures, c'est beaucoup. Imagine 50 litres d'eau par mètre carré. Les rues peuvent être inondées rapidement, surtout dans les zones basses. La bonne nouvelle, ce n'est pas le niveau le plus haut (rouge), donc si tu restes vigilant et évites les zones à risque, ça ira. Par contre, n'essaie pas de traverser des rues inondées — c'est comme ça que la plupart des accidents arrivent.",
    alertExplainRedRain: "C'est une alerte rouge, le niveau le plus élevé — prends ça très au sérieux. On parle de pluie au-dessus de 80mm par heure, ce qui peut provoquer des crues soudaines, des glissements de terrain et un danger réel. Ce n'est pas une situation 'peut-être que je prends un parapluie'. Si tu es près de pentes, rivières ou zones basses, envisage de monter en altitude. Aie tes documents et kit d'urgence prêts. Si les autorités disent d'évacuer, fais-le. Ce genre d'événement peut dégénérer très vite.",
    alertExplainOrangeHeat: "Demain va être brutalement chaud — au-dessus de 38°C. Ce n'est pas juste inconfortable, c'est vraiment dangereux pour les personnes âgées, les enfants et ceux qui ont des problèmes de santé. Ton corps a du mal à se refroidir à ces températures. Reste hydraté (beaucoup plus d'eau que tu ne penses), évite d'être dehors entre 10h et 16h, et garde les rideaux fermés. Si tu connais des voisins âgés, passe les voir — la chaleur peut être un tueur silencieux.",
    alertExplainYellowWind: "C'est une alerte jaune de vent — pas super dangereuse, mais ça vaut le coup d'y prêter attention. On attend des rafales jusqu'à 60km/h cet après-midi. C'est assez fort pour renverser des pots de fleurs, casser des branches fragiles et faire voler des objets légers. Si tu as quelque chose de mal fixé sur ton balcon ou ta terrasse, rentre-le. Et peut-être ne te gare pas sous les arbres aujourd'hui. Ça devrait se calmer en soirée.",
    alertExplainMLHail: "Celle-ci est intéressante — notre modèle ML a repéré un schéma qui suggère 35% de risque de grêle dans environ 48 heures. Ça ne vient pas du service météo officiel ; c'est notre IA qui analyse les données historiques et les conditions atmosphériques actuelles. 35% ce n'est pas certain, mais c'est assez élevé pour anticiper. Si ta voiture est garée dehors, pense à la couvrir. Reste attentif aux mises à jour — on en saura plus à mesure que les conditions évoluent.",
    profileUnits: "Unités",
    forecastPrecip: "Précipitations",
    alertCategoryNow: "Actives maintenant",
    alertCategoryFuture: "À venir",
    alertCategoryPast: "Passées",
    alertFutureHeatTitle: "Alerte orange : Chaleur extrême J+1",
    alertFutureHeatDesc: "Températures supérieures à 40°C attendues après-demain. Préparez-vous à l'avance.",
    alertFutureHeatTime: "Prévision J+1",
    alertPastRainTitle: "Alerte orange : Pluie forte (terminée)",
    alertPastRainDesc: "Pluie de 45mm enregistrée il y a 2 jours. L'alerte a été désactivée.",
    alertPastYesterday: "Hier",
    alertPast2Days: "Il y a 2 jours",
    alertOfficialTextLabel: "Texte officiel",
    alertOfficialTextCopy: "Copier",
    alertOfficialTextCopied: "Copié !",
    alertOfficialTextShare: "Partager",
    alertOfficialTextTranslate: "Traduire en",
    authLogin: "Se connecter",
    authSignup: "Créer un compte",
    authLoginDesc: "Entrez vos identifiants pour continuer",
    authSignupDesc: "Créez votre compte pour commencer",
    authName: "Nom",
    authNamePlaceholder: "Votre nom complet",
    authEmail: "E-mail",
    authEmailPlaceholder: "votre@email.com",
    authPassword: "Mot de passe",
    authPasswordPlaceholder: "Au moins 6 caractères",
    authTagline: "Intelligence climatique communautaire",
    authNoAccount: "Pas de compte ? Inscrivez-vous",
    authHaveAccount: "Déjà un compte ? Connectez-vous",
    authErrorRequired: "L'e-mail et le mot de passe sont requis",
    authErrorName: "Le nom est requis",
    authErrorPassword: "Le mot de passe doit contenir au moins 6 caractères",
    mapFilters: "Filtres",
    mapFilterAll: "Tous",
    catAir: "Air",
    catAlerts: "Alertes",
    catMetrics: "Métriques",
    catFrost: "Gel",
  },
};
