export type Pattern = {
  id: string;
  name: string;
  level: "watch" | "concerning" | "serious";
  summary: string;
  looksLike: string[];
  whatToDo: string;
};

export const PATTERNS: Pattern[] = [
  {
    id: "love-bombing",
    name: "Love bombing",
    level: "watch",
    summary: "Overwhelming affection and intensity very early, used to speed up trust.",
    looksLike: [
      "Constant messages, gifts or declarations within days of meeting",
      "Pressure to define the relationship immediately",
      "Sulking or anger when you need space",
    ],
    whatToDo: "Slow the pace deliberately. Healthy interest survives a slower timeline.",
  },
  {
    id: "guilt-tripping",
    name: "Guilt-tripping & obligation",
    level: "watch",
    summary: "Your ordinary choices are reframed as betrayals so you feel indebted.",
    looksLike: [
      "\"After everything I did for you...\"",
      "Keeping score of favours and money",
      "Your plans with others cause a crisis",
    ],
    whatToDo: "Name the pattern to yourself, keep your plan, and notice how they respond.",
  },
  {
    id: "gaslighting",
    name: "Gaslighting",
    level: "concerning",
    summary: "Your memory and judgement are steadily rewritten until you doubt yourself.",
    looksLike: [
      "\"That never happened, you're imagining it\"",
      "Denying things you have in writing",
      "Telling others you are unstable",
    ],
    whatToDo: "Keep a private, dated record of events. Facts outside their reach anchor you.",
  },
  {
    id: "isolation",
    name: "Isolation",
    level: "concerning",
    summary: "Your support network is thinned out one person at a time.",
    looksLike: [
      "Criticising your friends and family constantly",
      "Conflict scheduled around your social plans",
      "Moving you away from familiar places or work",
    ],
    whatToDo: "Protect at least two contacts they do not control. Add them to your Trusted Circle.",
  },
  {
    id: "financial-control",
    name: "Financial control",
    level: "concerning",
    summary: "Money is used to limit how far you can go on your own.",
    looksLike: [
      "Needing permission for ordinary spending",
      "Your salary or documents held by someone else",
      "Debt or loans taken in your name",
    ],
    whatToDo: "Keep an account, some cash and your ID documents that only you can access.",
  },
  {
    id: "monitoring",
    name: "Monitoring & digital surveillance",
    level: "serious",
    summary: "Your location, phone and accounts are checked as a condition of the relationship.",
    looksLike: [
      "Demanding passwords or live location at all times",
      "Apps installed on your phone you did not add",
      "Knowing things you never told them",
    ],
    whatToDo: "Check installed apps and account sessions from a device they have never touched.",
  },
  {
    id: "coercive-control",
    name: "Coercive control",
    level: "serious",
    summary: "Rules, punishments and monitoring combine into everyday control of your life.",
    looksLike: [
      "Rules about clothes, food, work or who you speak to",
      "Punishment (silence, anger, withholding) for breaking rules",
      "You plan your day around avoiding their reaction",
    ],
    whatToDo: "Treat this as serious. Build an exit plan quietly and involve someone you trust.",
  },
  {
    id: "threats",
    name: "Threats & intimidation",
    level: "serious",
    summary: "Fear is used directly — of harm, exposure, or losing what matters to you.",
    looksLike: [
      "Threats to hurt you, themselves, your family or pets",
      "Threats to share private photos or information",
      "Blocking doorways, breaking objects, driving dangerously",
    ],
    whatToDo: "Do not negotiate alone. Save evidence and contact a helpline or police.",
  },
  {
    id: "stalking",
    name: "Stalking",
    level: "serious",
    summary: "Repeated unwanted contact or presence that you cannot stop by asking.",
    looksLike: [
      "Turning up where you are without reason",
      "Messages from new numbers or fake accounts after blocking",
      "Contacting your workplace, family or friends about you",
    ],
    whatToDo: "Log every incident with date, time and screenshots. It matters if you report.",
  },
  {
    id: "sexual-coercion",
    name: "Sexual coercion & boundary violations",
    level: "serious",
    summary: "Consent is worn down with pressure, guilt or repeated ignoring of a no.",
    looksLike: [
      "Persisting after you said no",
      "Pressure framed as proof of love",
      "Recording or sharing intimate content without consent",
    ],
    whatToDo: "This is not a grey area. Support and legal options exist — see Get Help.",
  },
];

export type ChecklistItem = { id: string; title: string; detail: string };

export const ROOM_CHECK: ChecklistItem[] = [
  {
    id: "lights-off-scan",
    title: "Do a lights-off scan",
    detail:
      "Turn off all lights, close the curtains, and slowly sweep the room with your phone torch. Camera lenses reflect back as small bright dots.",
  },
  {
    id: "phone-camera",
    title: "Look through your phone camera",
    detail:
      "Some infrared lights show up as faint purple dots on a front camera in a dark room. Pan slowly across smoke detectors, vents and clocks.",
  },
  {
    id: "usual-suspects",
    title: "Check the usual hiding spots",
    detail:
      "Smoke detectors, air fresheners, alarm clocks, TV area, chargers and plug adapters, hooks, mirrors, decor facing the bed or shower.",
  },
  {
    id: "line-of-sight",
    title: "Follow the line of sight",
    detail:
      "Stand where you will undress or shower and look back. Anything pointed at that spot deserves a closer look.",
  },
  {
    id: "two-way-mirror",
    title: "Test suspicious mirrors",
    detail:
      "Place a fingertip on the glass. A gap between finger and reflection is normal glass; no gap means it may be see-through.",
  },
  {
    id: "wifi-scan",
    title: "Scan the Wi-Fi network",
    detail:
      "A network scanner app can list connected devices. Camera-like device names on a private room network are a red flag.",
  },
  {
    id: "cover-and-report",
    title: "If you find something",
    detail:
      "Do not touch or dismantle it. Photograph it in place, leave the room, and report it to the police and the property platform.",
  },
  {
    id: "door-security",
    title: "Secure the door before you sleep",
    detail:
      "Use the deadbolt and latch, add a portable door wedge, and check the balcony or connecting door is locked.",
  },
];

export const POST_SEPARATION: ChecklistItem[] = [
  {
    id: "contact-after-no",
    title: "Contact continues after you asked them to stop",
    detail: "New numbers, new accounts, or messages through friends and family.",
  },
  {
    id: "showing-up",
    title: "They appear where you are",
    detail: "Your home, workplace, gym or usual routes, framed as coincidence.",
  },
  {
    id: "accounts",
    title: "Account or device activity you did not cause",
    detail: "Password resets, unfamiliar logins, shared subscriptions still tracking you.",
  },
  {
    id: "image-threats",
    title: "Threats to share private images or information",
    detail: "Including hints, screenshots sent to you, or posts about you.",
  },
  {
    id: "reputation",
    title: "Campaigns against your reputation",
    detail: "Messaging your employer, family or friends with claims about you.",
  },
  {
    id: "money-legal",
    title: "Money or legal pressure used as contact",
    detail: "Repeated disputes, complaints or bills used to keep you engaged.",
  },
  {
    id: "escalation",
    title: "Escalation after you set a limit",
    detail: "Anger, threats or intensified contact each time you block or say no.",
  },
  {
    id: "fear",
    title: "You have changed your routine out of fear",
    detail: "Different routes, staying elsewhere, not going out alone.",
  },
];

export type Resource = {
  name: string;
  number?: string;
  url?: string;
  description: string;
  category: "Emergency" | "Helpline" | "Cyber" | "Legal & support";
};

export const RESOURCES: Resource[] = [
  {
    name: "Emergency services (all-in-one)",
    number: "112",
    description: "Police, fire and ambulance across India. Use when you are in immediate danger.",
    category: "Emergency",
  },
  {
    name: "Police",
    number: "100",
    description: "Direct police control room.",
    category: "Emergency",
  },
  {
    name: "Women Helpline",
    number: "1091",
    description: "Police women's helpline for women in distress.",
    category: "Emergency",
  },
  {
    name: "Women Helpline (domestic abuse)",
    number: "181",
    description: "24x7 support, counselling and shelter referrals for women facing violence.",
    category: "Helpline",
  },
  {
    name: "National Commission for Women",
    number: "7827170170",
    url: "https://ncwapps.nic.in/onlinecomplaintsv2/",
    description: "File a complaint with the NCW online or by WhatsApp.",
    category: "Helpline",
  },
  {
    name: "Childline",
    number: "1098",
    description: "For anyone under 18 who needs help or protection.",
    category: "Helpline",
  },
  {
    name: "Cyber Crime Helpline",
    number: "1930",
    description: "Report online harassment, blackmail and financial cyber fraud immediately.",
    category: "Cyber",
  },
  {
    name: "National Cyber Crime Reporting Portal",
    url: "https://cybercrime.gov.in/",
    description:
      "Report stalking, obscene content and non-consensual images — anonymous reporting is available.",
    category: "Cyber",
  },
  {
    name: "StopNCII",
    url: "https://stopncii.org/",
    description: "Helps block intimate images of you from being shared on major platforms.",
    category: "Cyber",
  },
  {
    name: "Kiran Mental Health Helpline",
    number: "18005990019",
    description: "24x7 free counselling and psychological support.",
    category: "Legal & support",
  },
  {
    name: "Sneha India",
    number: "04424640050",
    description: "Emotional support and suicide prevention, 24 hours.",
    category: "Legal & support",
  },
  {
    name: "NALSA legal aid",
    number: "15100",
    url: "https://nalsa.gov.in/",
    description: "Free legal aid and advice, including protection orders under the DV Act.",
    category: "Legal & support",
  },
];
