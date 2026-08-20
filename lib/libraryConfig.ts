export const LIBRARY_CONFIG = {
  name: "നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി",
  nameEnglish: "Nedumkandom Public Library",
  location: "നെടുങ്കണ്ടം, ഇടുക്കി, കേരളം",
  district: "ഇടുക്കി",
  taluk: "ഉടുമ്പൻചോല",
  panchayat: process.env.NEXT_PUBLIC_PANCHAYAT || "നെടുങ്കണ്ടം",
  establishedYear: process.env.NEXT_PUBLIC_ESTABLISHED_YEAR || "—",
  registrationNo: process.env.NEXT_PUBLIC_REGISTRATION_NO || "—",
  libraryCouncilNo: process.env.NEXT_PUBLIC_COUNCIL_NO || "—",
  bookCount: process.env.NEXT_PUBLIC_BOOK_COUNT || "—",
  memberCount: process.env.NEXT_PUBLIC_MEMBER_COUNT || "—",
  
  tagline: "അറിവിലേക്ക് ഒരു വാതിൽ | വായനയിലൂടെ ഒരു സമൂഹം",
  subTagline: "നാടിന്റെ വായനയ്ക്കും അറിവിനും ഒപ്പം.",
  vision: "ഓരോ വീട്ടിലും ഒരു വായനക്കാരൻ — ഓരോ മനസ്സിലും ഒരു നല്ല പുസ്തകം.",
  visionFull: "നെടുങ്കണ്ടത്തിന്റെ വായനാ സംസ്കാരത്തെ കൂടുതൽ ശക്തിപ്പെടുത്തുകയും, പുതിയ തലമുറയെ അറിവിലേക്കും സാഹിത്യത്തിലേക്കും ചിന്തയിലേക്കും നയിക്കുകയും ചെയ്യുന്ന ഒരു ജനകീയ പൊതുഗ്രന്ഥശാല.",
  
  contact: {
    address: "നെടുങ്കണ്ടം, ഇടുക്കി, കേരളം",
    phone: process.env.NEXT_PUBLIC_PHONE || "9446823434",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "9446823434",
    email: process.env.NEXT_PUBLIC_EMAIL || "nedumkandomlibrary@gmail.com",
    googleMapsUrl: "https://maps.google.com/?q=Nedumkandam+Idukki+Kerala",
  },
  
  openingHours: {
    weekday: process.env.NEXT_PUBLIC_WEEKDAY_HOURS || "3:00 PM – 8:00 PM",
    sunday: process.env.NEXT_PUBLIC_SUNDAY_HOURS || "3:00 PM – 8:00 PM",
    holiday: "പൊതു അവധി",
    note: "അവധിദിവസങ്ങളും സമയക്രമവും ലൈബ്രറി അധികൃതർക്ക് ആവശ്യാനുസരണം മാറ്റാം.",
  },
  
  feesNote: "കുറിപ്പ്: യഥാർത്ഥ ഫീസ് ലൈബ്രറി കമ്മിറ്റി അംഗീകരിച്ച നിരക്കുകൾ പ്രകാരം ഇവിടെ അപ്ഡേറ്റ് ചെയ്യണം.",
  
  navLinks: [
    { label: "ഹോം", href: "/" },
    { label: "ഞങ്ങളെക്കുറിച്ച്", href: "/about" },
    { label: "അംഗത്വം", href: "/membership" },
    { label: "പുസ്തകങ്ങൾ", href: "/books" },
    { label: "കുട്ടികളുടെ വിഭാഗം", href: "/children" },
    { label: "പരിപാടികൾ", href: "/events" },
    { label: "ഗാലറി", href: "/gallery" },
    { label: "ബന്ധപ്പെടുക", href: "/contact" },
  ],

  committeeRoles: [
    { title: "പ്രസിഡന്റ്", name: "—" },
    { title: "സെക്രട്ടറി", name: "—" },
    { title: "വൈസ് പ്രസിഡന്റ്", name: "—" },
    { title: "ജോയിന്റ് സെക്രട്ടറി", name: "—" },
    { title: "ട്രഷറർ", name: "—" },
    { title: "ലൈബ്രേറിയൻ / ചുമതലയുള്ള വ്യക്തി", name: "—" },
  ]
};
