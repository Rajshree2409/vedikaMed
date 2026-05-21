export const productData = {
  Capsules: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        <g transform="translate(170,55)">
          <rect x="-90" y="-22" width="180" height="44" rx="22" fill="#f5c518" />
          <rect x="-90" y="-22" width="90" height="44" rx="22" fill="#e6a800" />
          <text x="-18" y="8" fontSize="22" fontWeight="bold" fill="#fff" fontFamily="sans-serif">
            L | U
          </text>
        </g>
        <g transform="translate(170,115)">
          <rect x="-90" y="-22" width="180" height="44" rx="22" fill="#f5c518" />
          <rect x="-90" y="-22" width="90" height="44" rx="22" fill="#e6a800" />
          <text x="-24" y="8" fontSize="22" fontWeight="bold" fill="#fff" fontFamily="sans-serif">
            D 0 3
          </text>
        </g>
      </svg>
    ),
    products: [
      { name: "A TRET 25MG CAPSULE", stars: 1, mrp: 0.0, price: 0.0, discount: 0.0, unit: "" },
      { name: "ABCLOX 250MG/250MG CAPSULE", stars: 1, mrp: 0.0, price: 0.0, discount: 0.0, unit: "" },
      { name: "AC DOX 250MG/250MG CAPSULE", stars: 1, mrp: 0.0, price: 0.0, discount: 0.0, unit: "" },
    ],
  },
  capsule: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        {[
          { x: 240, y: 30, r: -30 },
          { x: 120, y: 25, r: 20 },
          { x: 280, y: 90, r: 45 },
          { x: 80, y: 90, r: -10 },
          { x: 190, y: 110, r: 15 },
          { x: 60, y: 135, r: 30 },
          { x: 290, y: 140, r: -20 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x},${c.y}) rotate(${c.r})`}>
            <rect x="-45" y="-16" width="90" height="32" rx="16" fill="#7ac942" />
            <rect x="-45" y="-16" width="45" height="32" rx="16" fill="#5ba832" />
            {[[-20, -5], [-5, -5], [10, -5], [-20, 6], [-5, 6], [10, 6]].map(([dx, dy], j) => (
              <circle key={j} cx={dx + 22} cy={dy} r="2.5" fill="#fff" opacity="0.6" />
            ))}
          </g>
        ))}
      </svg>
    ),
    products: [
      { name: "CRESEMBA 100MG CAPSULE", stars: 1, mrp: 120.0, price: 120.0, discount: 0.0, unit: "capsule" },
      { name: "GENERIC ZOLOFIT", stars: 1, mrp: 50.0, price: 50.0, discount: 0.0, unit: "box" },
    ],
  },
  Medicine: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        <g transform="translate(170,88) rotate(-20)">
          <rect x="-80" y="-34" width="160" height="68" rx="34" fill="#c8392b" />
          <rect x="-80" y="-34" width="80" height="68" rx="34" fill="#f0d9b5" />
        </g>
      </svg>
    ),
    products: [
      { name: "A 1 5MG TABLET 10 TABLETS IN 1 STRIP", stars: 4, mrp: 15.0, price: 15.0, discount: 0.0, unit: "10 tablets in 1 strip" },
      { name: "A C FORD 100MG TABLET 4 TABLETS IN 1 STRIP", stars: 1, mrp: 597.0, price: 597.0, discount: 0.0, unit: "4 tablets in 1 strip" },
      { name: "A CLO 200MG TABLET SR 10 TABLET SR IN 1 STRIP", stars: 1, mrp: 595.0, price: 595.0, discount: 0.0, unit: "10 tablets in 1 strip" },
    ],
  },
  Injection: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        <rect x="140" y="30" width="70" height="100" rx="12" fill="#d8b4fe" />
        <rect x="148" y="38" width="54" height="84" rx="8" fill="#ede9fe" />
        <rect x="140" y="30" width="70" height="22" rx="8" fill="#9333ea" />
        <text x="155" y="82" fontSize="9" fill="#7c3aed" fontWeight="bold">
          COVID
        </text>
        <text x="158" y="94" fontSize="9" fill="#7c3aed" fontWeight="bold">
          -19
        </text>
        <rect x="80" y="60" width="32" height="80" rx="10" fill="#fca5a5" />
        <rect x="80" y="60" width="32" height="20" rx="8" fill="#ef4444" />
        <text x="83" y="82" fontSize="6" fill="#fff" fontWeight="bold" transform="rotate(-90,96,100)">
          COVID-19
        </text>
        <rect x="170" y="68" width="120" height="14" rx="7" fill="#93c5fd" transform="rotate(-35,170,68)" />
        <rect x="268" y="110" width="6" height="20" rx="3" fill="#f97316" transform="rotate(-35,268,110)" />
      </svg>
    ),
    products: [
      { name: "A CEF 1GM INJECTION 1 INJECTION IN 1 VIAL", stars: 4, mrp: 50.3, price: 45.3, discount: 5.0, unit: "1 Injection in 1 vial" },
      { name: "A CEF 2GM INJECTION 1 INJECTION IN 1 VIAL", stars: 1, mrp: 149.9, price: 135.0, discount: 15.0, unit: "1 Injection in 1 vial" },
      { name: "A CON 150MG INJECTION 2 ML IN 1 VIAL", stars: 1, mrp: 83.5, price: 75.2, discount: 8.3, unit: "2 ml in 1 vial" },
    ],
  },
  Insulin: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        <rect x="40" y="95" width="200" height="28" rx="14" fill="#c8b89a" />
        <rect x="40" y="95" width="40" height="28" rx="14" fill="#6b7280" />
        <rect x="230" y="99" width="40" height="20" rx="10" fill="#d97706" />
        <circle cx="240" cy="109" r="8" fill="#f59e0b" />
        <rect x="230" y="20" width="50" height="75" rx="10" fill="#e5e7eb" />
        <rect x="234" y="28" width="42" height="58" rx="7" fill="#f9fafb" />
        <rect x="230" y="20" width="50" height="18" rx="8" fill="#9ca3af" />
        <rect x="248" y="10" width="14" height="12" rx="3" fill="#6b7280" />
        <rect x="60" y="120" width="180" height="12" rx="6" fill="#d1d5db" transform="rotate(-8,60,120)" />
        <rect x="228" y="125" width="5" height="22" rx="2" fill="#9ca3af" transform="rotate(-8,228,125)" />
      </svg>
    ),
    products: [
      { name: "ACTRAPID 100 IU/ML FLEXPEN 3 ML IN 1 FLEXPEN", stars: 5, mrp: 569.8, price: 512.8, discount: 57.0, unit: "3 ml in 1 flexpen" },
      { name: "ACTRAPID 100IU/ML SOLUTION FOR INJECTION 10 ML IN 1 VIAL", stars: 1, mrp: 350.9, price: 315.8, discount: 35.1, unit: "10 ml in 1 vial" },
      { name: "ACTRAPID HM 100IU/ML PENFILL 3 ML IN 1 PENFILL", stars: 1, mrp: 386.0, price: 347.4, discount: 38.6, unit: "3 ml in 1 penfill" },
    ],
  },
  Bottle: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        <rect x="148" y="12" width="44" height="14" rx="7" fill="#9ca3af" />
        <path d="M140 26 Q130 50 128 80 L128 148 Q128 156 170 156 Q212 156 212 148 L212 80 Q210 50 200 26Z" fill="#e5e7eb" />
        <path d="M140 26 Q130 50 128 80 L128 148 Q128 156 170 156 Q212 156 212 148 L212 80 Q210 50 200 26Z" fill="#f9fafb" opacity="0.7" />
        <rect x="136" y="85" width="68" height="50" rx="4" fill="#f3f4f6" />
        <path d="M148 26 Q140 50 138 80 L202 80 Q198 50 192 26Z" fill="#d1fae5" opacity="0.5" />
      </svg>
    ),
    products: [
      { name: "ACILOC 150MG SYRUP 100ML", stars: 3, mrp: 52.0, price: 47.0, discount: 5.0, unit: "100 ml bottle" },
      { name: "ARISTOZYME LIQUID 200ML", stars: 2, mrp: 98.0, price: 88.0, discount: 10.0, unit: "200 ml bottle" },
      { name: "BENADRYL COUGH SYRUP 100ML", stars: 4, mrp: 79.0, price: 71.0, discount: 8.0, unit: "100 ml bottle" },
    ],
  },
  Syrup: {
    bannerBg: "#fff",
    bannerSvg: (
      <svg viewBox="0 0 340 160" width="340" height="160">
        <rect x="180" y="10" width="60" height="100" rx="12" fill="#fca5a5" />
        <rect x="184" y="18" width="52" height="84" rx="8" fill="#fecaca" />
        <rect x="180" y="10" width="60" height="20" rx="8" fill="#ef4444" />
        <rect x="196" y="2" width="28" height="10" rx="5" fill="#dc2626" />
        <path d="M180 70 Q160 90 155 130 Q165 140 175 130 Q172 100 185 80Z" fill="#f87171" opacity="0.7" />
        <ellipse cx="120" cy="138" rx="40" ry="14" fill="#fca5a5" opacity="0.5" />
        <rect x="155" y="132" width="60" height="8" rx="4" fill="#d1d5db" />
      </svg>
    ),
    products: [
      { name: "ALEX SYRUP 100ML", stars: 3, mrp: 85.0, price: 76.5, discount: 8.5, unit: "100 ml" },
      { name: "BENADRYL DR 100ML", stars: 2, mrp: 97.0, price: 87.0, discount: 10.0, unit: "100 ml" },
      { name: "COREX DX 100ML SYRUP", stars: 4, mrp: 110.0, price: 99.0, discount: 11.0, unit: "100 ml" },
    ],
  },
};

export const categorySidebarItems = [
  {
    key: "Capsules",
    label: "Capsules",
    svgThumb: (
      <svg viewBox="0 0 60 60" width="44" height="44">
        <g transform="translate(30,22)">
          <rect x="-22" y="-8" width="44" height="16" rx="8" fill="#f5c518" />
          <rect x="-22" y="-8" width="22" height="16" rx="8" fill="#e6a800" />
        </g>
        <g transform="translate(30,40)">
          <rect x="-22" y="-8" width="44" height="16" rx="8" fill="#f5c518" />
          <rect x="-22" y="-8" width="22" height="16" rx="8" fill="#e6a800" />
        </g>
      </svg>
    ),
  },
  {
    key: "capsule",
    label: "capsule",
    svgThumb: (
      <svg viewBox="0 0 60 60" width="44" height="44">
        {[
          { x: 20, y: 18, r: 20 },
          { x: 40, y: 15, r: -15 },
          { x: 15, y: 38, r: 30 },
          { x: 42, y: 40, r: -30 },
          { x: 30, y: 30, r: 5 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x},${c.y}) rotate(${c.r})`}>
            <rect x="-14" y="-5" width="28" height="10" rx="5" fill="#7ac942" />
            <rect x="-14" y="-5" width="14" height="10" rx="5" fill="#5ba832" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    key: "Medicine",
    label: "Medicine",
    svgThumb: (
      <svg viewBox="0 0 60 60" width="44" height="44">
        <g transform="translate(30,30) rotate(-20)">
          <rect x="-20" y="-9" width="40" height="18" rx="9" fill="#c8392b" />
          <rect x="-20" y="-9" width="20" height="18" rx="9" fill="#f0d9b5" />
        </g>
      </svg>
    ),
  },
  {
    key: "Injection",
    label: "Injection",
    svgThumb: (
      <svg viewBox="0 0 60 60" width="44" height="44">
        <rect x="20" y="8" width="18" height="44" rx="6" fill="#fca5a5" />
        <rect x="20" y="8" width="18" height="14" rx="6" fill="#ef4444" />
        <rect x="26" y="2" width="6" height="8" rx="3" fill="#dc2626" />
        <rect x="14" y="28" width="32" height="8" rx="4" fill="#93c5fd" transform="rotate(-40,30,32)" />
      </svg>
    ),
  },
  {
    key: "Insulin",
    label: "Insulin",
    svgThumb: (
      <svg viewBox="0 0 60 60" width="44" height="44">
        <rect x="6" y="30" width="48" height="12" rx="6" fill="#c8b89a" />
        <rect x="6" y="30" width="12" height="12" rx="6" fill="#6b7280" />
        <rect x="48" y="32" width="10" height="8" rx="4" fill="#d97706" />
        <rect x="32" y="8" width="14" height="26" rx="5" fill="#e5e7eb" />
        <rect x="32" y="8" width="14" height="8" rx="4" fill="#9ca3af" />
      </svg>
    ),
  },
  {
    key: "Bottle",
    label: "Bottle",
    svgThumb: (
      <svg viewBox="0 0 60 60" width="44" height="44">
        <rect x="24" y="2" width="12" height="6" rx="3" fill="#9ca3af" />
        <path d="M22 8 Q18 18 17 30 L17 55 Q17 58 30 58 Q43 58 43 55 L43 30 Q42 18 38 8Z" fill="#e5e7eb" />
        <rect x="20" y="32" width="20" height="16" rx="3" fill="#f3f4f6" />
      </svg>
    ),
  },
  {
    key: "Syrup",
    label: "Syrup",
    svgThumb: (
      <svg viewBox="0 0 60 60" width="44" height="44">
        <rect x="22" y="6" width="20" height="36" rx="6" fill="#fca5a5" />
        <rect x="22" y="6" width="20" height="10" rx="6" fill="#ef4444" />
        <rect x="27" y="2" width="10" height="6" rx="3" fill="#dc2626" />
        <path d="M22 28 Q14 36 12 50 Q18 54 22 50 Q20 40 26 32Z" fill="#f87171" opacity="0.7" />
      </svg>
    ),
  },
];

export const privacySections = [
  {
    heading: "1. Introduction",
    body: `Welcome to Vedikamed. Vedikamed ("us", "we", or "our") operates vedikamed.com (hereinafter referred to as "Service"). Our Privacy Policy governs your visit to vedikamed.com, and explains how we collect, safeguard and disclose information that results from your use of our Service. We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions. Our Terms and Conditions ("Terms") govern all use of our Service and together with the Privacy Policy constitutes your agreement with us ("agreement").`,
  },
  {
    heading: "2. Definitions",
    body: `SERVICE means the vedikamed.com website operated by Vedikamed. PERSONAL DATA means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).\nUSAGE DATA is data collected automatically either generated by the use of Service or from Service infrastructure itself (for example, the duration of a page visit).\nCOOKIES are small files stored on your device (computer or mobile device).\nDATA CONTROLLER means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.\nDATA PROCESSORS (OR SERVICE PROVIDERS) means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.\nSUBJECT any living individual who is the subject of Personal Data.\nTHE USER is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.`,
  },
  {
    heading: "3. Information Collection and Use",
    body: `We collect several different types of information for various purposes to provide and improve our Service to you.`,
  },
  {
    heading: "4. Types of Data Collected Personal Data",
    body: `While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:\n\n0.1. Email address\n0.2. First name and last name\n0.3. Phone number\n0.4. Address, Country, State, Province, ZIP/Postal code, City\n0.5. Cookies and Usage Data\n\nWe may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link.\nUsage Data\n\nWe may also collect information that your browser sends whenever you visit our Service or when you access Service by or through any device ("Usage Data").`,
  },
  {
    heading: "5. Use of Data",
    body: `Vedikamed uses the collected data for various purposes:\n0.1. to provide and maintain our Service;\n0.2. to notify you about changes to our Service;\n0.3. to allow you to participate in interactive features of our Service when you choose to do so;\n0.4. to provide customer support;\n0.5. to gather analysis or valuable information so that we can improve our Service;\n0.6. to monitor the usage of our Service;\n0.7. to detect, prevent and address technical issues;\n0.8. to fulfil any other purpose for which you provide it;\n0.9. to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;\n0.10. to provide you with notices about your account and/or subscription, including expiration and renewal notices;\n0.11. to provide you with news, special offers and general information about other goods, services and events;\n0.12. in any other way we may describe when you provide the information;\n0.13. for any other purpose with your consent.`,
  },
  {
    heading: "6. Retention of Data",
    body: `We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.`,
  },
  {
    heading: "7. Transfer of Data",
    body: `Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there.`,
  },
  {
    heading: "8. Disclosure of Data",
    body: `We may disclose personal information that we collect, or you provide:\n0.1. Disclosure for Law Enforcement. Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.\n0.2. Business Transaction. If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.\n0.3. Other cases:\n0.3.1. to our subsidiaries and affiliates;\n0.3.2. to contractors, service providers, and other third parties we use to support our business;\n0.3.3. to fulfill the purpose for which you provide it;\n0.3.4. for the purpose of including your company's logo on our website;\n0.3.5. for any other purpose disclosed by us when you provide the information;\n0.3.6. with your consent in any other cases;\n0.3.7. if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Company, our customers, or others.`,
  },
  {
    heading: "9. Security of Data",
    body: `The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.`,
  },
  {
    heading: "10. Your Data Protection Rights Under General Data Protection Regulation (GDPR)",
    body: `If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights, covered by GDPR. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.\n0.1. the right to access, update or to delete the information we have on you;\n0.2. the right of rectification;\n0.3. the right to object;\n0.4. the right of restriction;\n0.5. the right to data portability;\n0.6. the right to withdraw consent.`,
  },
  {
    heading: "11. Your Data Protection Rights under the California Privacy Protection Act (CalOPPA)",
    body: `CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy.\n0.1. users can visit our site anonymously;\n0.2. our Privacy Policy link includes the word "Privacy", and can easily be found on the home page of our website;\n0.3. users will be notified of any privacy policy changes on our Privacy Policy Page;\n0.4. users are able to change their personal information by emailing us at vedikamedi@gmail.com.`,
  },
  {
    heading: "12. Your Data Protection Rights under the India Consumer Privacy Act",
    body: `If you are an Indian resident, you are entitled to learn what data we collect about you, ask to delete your data and not to sell (share) it. To exercise your data protection rights, you can make certain requests and ask us:\n0.1. What personal information we have about you;\n0.2. To delete your personal information;\n0.3. To stop selling your personal information.`,
  },
  {
    heading: "13. Service Providers",
    body: `We may employ third party companies and individuals to facilitate our Service ("Service Providers"), provide Service on our behalf, perform Service-related services or assist us in analysing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.`,
  },
  {
    heading: "14. Links to Other Sites",
    body: `Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any other site or service.`,
  },
  {
    heading: "15. Children's Privacy",
    body: `Our Services are not intended for use by children under the age of 18 ("Child" or "Children"). We do not knowingly collect personally identifiable information from Children under 18. If you become aware that a Child has provided us with Personal Data, please contact us.`,
  },
  {
    heading: "16. Changes to This Privacy Policy",
    body: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update "effective date" at the top of this Privacy Policy.`,
  },
];
