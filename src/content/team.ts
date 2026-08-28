/**
 * Team content — src/content/team.ts
 *
 * Source of truth: ClimateWatch "Team" spreadsheet, read 17 August 2026.
 *
 * All 15 records previously carrying `placeholder: true` have been removed.
 * Every person below appears in the spreadsheet.
 *
 * Entries marked NEEDS CONFIRMATION are places where the spreadsheet
 * disagreed with itself and a reading was chosen. See the handover document.
 */

export type TeamMember = {
  name: string;
  department: string;
  designation: string;
  focus: string;
  email?: string;
  image?: string;
  linkedin?: string;
  instagram?: string;
  /**
   * Placeholder entries are illustrative staff records used to
   * populate the directory ahead of the real roster.
   *
   * Replace or delete every member carrying this flag before launch.
   */
  placeholder?: boolean;
};

export type TeamDepartment = {
  id: string;
  name: string;
  shortName: string;
  description: string;
};

/**
 * Advisors and board members. Unlike staff, these carry a short card
 * summary plus a long profile revealed in a modal.
 */
export type TeamProfile = {
  slug: string;
  name: string;
  role: string;
  /** Shown on the card. */
  summary: string;
  /** Shown in the modal. One entry per paragraph. */
  profile: readonly string[];
  /** Optional bulleted list rendered beneath the profile. */
  expertise?: readonly string[];
  /** Small line under the role, e.g. for people holding two roles. */
  note?: string;
  image?: string;
  /**
   * ISO 3166-1 alpha-2 code, e.g. "PL". Renders a flag beside the name.
   * Set only on international advisors — a flag beside every name on a
   * page of Pakistan-based staff would say nothing.
   */
  country?: string;
  linkedin?: string;
  instagram?: string;
};

/**
 * Divisional team members — interns, assistants, associates and
 * representatives who sit under a division head.
 */
export type TeamAssociate = {
  name: string;
  department: string;
  position: string;
  email?: string;
  image?: string;
};

export const teamContent = {
  hero: {
    eyebrow: "Members & staff",
    title: "The people behind ClimateWatch.",
    description:
      "ClimateWatch brings together climate policy specialists, researchers, educators, engineers and communicators working across Pakistan and international climate processes.",
    image: "/images/team/team-hero-2026-08.webp",
    imageAlt:
      "Young climate campaigners holding Fridays for Future placards.",
    imageCaption:
      "Our team works between mountain communities, national policy institutions and international climate negotiations.",
  },

  stats: [
    {
      /*
       * Divisional leads (9) plus divisional teams (26). Recount both arrays
       * below when someone joins or leaves — this figure does not derive
       * itself, so a stale number here is a visible error on the page.
       */
      label: "Team members",
      value: "35",
    },
    {
      // Nine department entries below, and the directory copy says nine.
      // This read "8" and was simply wrong.
      label: "Divisions",
      value: "9",
    },
    {
      label: "Based in",
      value: "Pakistan",
    },
  ],

  /* ============================================================
     DIVISIONAL LEADERSHIP
     ============================================================ */

  directory: {
    eyebrow: "Directory",
    title: "Organised across nine divisions.",
    description:
      "Each division carries its own programme responsibilities while contributing to shared research, policy and education work.",
  },

  departments: [
    {
      id: "directorate",
      name: "Directorate",
      shortName: "Directorate",
      description:
        "Institutional leadership, strategy and organisational representation.",
    },
    {
      id: "international-climate-policy",
      name: "International Climate Policy",
      shortName: "Climate Policy",
      description:
        "UNFCCC processes, negotiation tracking, climate finance and policy analysis.",
    },
    {
      id: "research-development",
      name: "Research and Development",
      shortName: "Research",
      description:
        "Evidence generation, climate data, glaciology and applied research methods.",
    },
    {
      id: "education-sustainable-development",
      name: "Education for Sustainable Development",
      shortName: "Education",
      description:
        "Curriculum design, training, climate literacy and youth engagement.",
    },
    {
      id: "partnerships-outreach",
      name: "Partnership and Outreach",
      shortName: "Partnerships",
      description:
        "Institutional partnerships, donor relations and stakeholder engagement.",
    },
    {
      id: "technical-engineering",
      name: "Technical and Engineering",
      shortName: "Engineering",
      description:
        "Monitoring instrumentation, geospatial systems and digital infrastructure.",
    },
    {
      id: "project-management",
      name: "Project Management",
      shortName: "Projects",
      description:
        "Programme delivery, field operations, planning and reporting.",
    },
    {
      // NEEDS CONFIRMATION: spreadsheet reads "Media and Communications";
      // the id is left unchanged so existing anchors keep working.
      id: "communications-media",
      name: "Media and Communications",
      shortName: "Communications",
      description:
        "Editorial output, broadcast production and public climate communication.",
    },
    {
      // NEEDS CONFIRMATION: spreadsheet reads "Human Resource" (singular).
      id: "human-resources",
      name: "Human Resources",
      shortName: "Human Resources",
      description:
        "Recruitment, staff development and organisational policy.",
    },
  ] satisfies readonly TeamDepartment[],

  members: [
    /* ==========================================
       DIRECTORATE
       ========================================== */
    {
      name: "Mr. Syed Kiram Ali",
      department: "directorate",
      designation: "Director",
      focus:
        "Institutional strategy, climate policy direction and organisational representation.",
      email: "syedkiram-cw@nccb-un.org",
      image: "/images/team/syed-kiram.webp",
      linkedin: "https://www.linkedin.com/in/syed-kiram-828377193/",
      instagram: "https://www.instagram.com/syedkiram/",
    },

    /* ==========================================
       INTERNATIONAL CLIMATE POLICY
       ========================================== */
    {
      name: "Mr. Pervez Aly",
      department: "international-climate-policy",
      designation: "Head of Division",
      focus:
        "Policy Advisor Anticipatory Action, UNFCCC negotiation tracking, climate policy analysis and international engagement.",
      email: "pervez-cw@nccb-un.org",
      image: "/images/team/pervez-aly-2026-08.webp",
      linkedin: "https://www.linkedin.com/in/pervezaly/",
      instagram: "https://www.instagram.com/_aka.aly/",
    },

    /* ==========================================
       RESEARCH AND DEVELOPMENT
       ========================================== */
    {
      name: "Ms. Atia Fehmi",
      department: "research-development",
      designation: "Head of Division",
      focus:
        "Research design, evidence standards and applied climate development work.",
      email: "atia@climatewatch-nccb.org",
      image: "/images/team/atia-fehmi.webp",
      linkedin: "https://www.linkedin.com/in/atia-f-a66553182/",
    },

    /* ==========================================
       EDUCATION FOR SUSTAINABLE DEVELOPMENT
       ========================================== */
    {
      name: "Mr. Didar Ali",
      department: "education-sustainable-development",
      designation: "Head of Division",
      focus:
        "Climate education programmes, training design and community learning.",
      email: "didar.ali@climatewatch-nccb.org",
      image: "/images/team/didar-ali.webp",
      linkedin: "https://www.linkedin.com/in/didar-ali-/",
      instagram: "https://www.instagram.com/didar.aly/",
    },

    /* ==========================================
       PARTNERSHIP AND OUTREACH
       ========================================== */
    {
      name: "Mr. Mehtab Kamal",
      department: "partnerships-outreach",
      designation: "Head of Division",
      focus:
        "Institutional partnerships, outreach strategy and stakeholder relations.",
      email: "mehtab@climatewatch-nccb.org",
      image: "/images/team/mehtab-kamal.webp",
      linkedin: "https://www.linkedin.com/in/mehtab-kamal-a75673387/",
      instagram: "https://www.instagram.com/mehtab_kml/",
    },

    /* ==========================================
       TECHNICAL AND ENGINEERING
       ========================================== */
    {
      name: "Mr. Mubeen Ishfaq",
      department: "technical-engineering",
      designation: "Head of Division",
      focus:
        "Technical systems, engineering projects and applied climate technology.",
      email: "mubeen@climatewatch-nccb.org",
      image: "/images/team/mubeen-ishfaq-2026-08.webp",
      linkedin: "https://www.linkedin.com/in/mubeen-ishfaq/",
      instagram: "https://www.instagram.com/mubeenishfaq7/",
    },

    /* ==========================================
       PROJECT MANAGEMENT
       ========================================== */
    {
      name: "Mr. Riaz Ahmed",
      department: "project-management",
      // Changed from "Head of Department" to match the spreadsheet.
      designation: "Head of Division",
      focus:
        "Programme delivery, project planning and operational coordination.",
      email: "riaz@climatewatch-nccb.org",
      image: "/images/team/riaz-ahmed.webp",
      linkedin: "https://www.linkedin.com/in/riaz-ahmed56",
      instagram: "https://www.instagram.com/thisisriiaz/",
    },

    /* ==========================================
       MEDIA AND COMMUNICATIONS
       ========================================== */
    {
      name: "Mr. Sajjad Ali",
      department: "communications-media",
      designation: "Head of Division",
      // NEEDS CONFIRMATION: no description supplied in the spreadsheet.
      // Written from the remit of the role, not from anything biographical.
      focus:
        "Editorial direction, media relations and public climate communication.",
      email: "sajjad@climatewatch-nccb.org",
      image: "/images/team/sajjad-ali.webp",
      linkedin: "https://www.linkedin.com/in/sajjadaly/",
      instagram: "https://www.instagram.com/sajjad_sharma/",
    },

    /* ==========================================
       HUMAN RESOURCES
       ========================================== */
    {
      name: "Mr. Michael Muyutu",
      department: "human-resources",
      designation: "Human Resource Manager",
      // NEEDS CONFIRMATION: no description supplied in the spreadsheet.
      focus: "Recruitment, staff development and organisational policy.",
      // NEEDS CONFIRMATION: personal address; every other member is on an
      // organisational domain.
      email: "michael@climatewatch-nccb.org",
      image: "/images/team/michael-muyutu.webp",
      linkedin:
        "https://www.linkedin.com/in/michael-muyutu-%E2%80%93bba-aab79126a",
      instagram: "https://www.instagram.com/iam_michael003",
    },
  ] satisfies readonly TeamMember[],

  /* ============================================================
     TECHNICAL ADVISORS
     ============================================================ */

  advisory: {
    eyebrow: "National Advisory",
    title: "Specialists who advise and review the substance of our work.",
    description:
      "Pakistan-based advisors, consulted on the projects and publications where their expertise is required. They review technical and analytical content before it is published.",
  },

  internationalAdvisory: {
    eyebrow: "International Advisory",
    title: "Advisors working on climate policy beyond Pakistan.",
    description:
      "Specialists based outside Pakistan who advise on the international rules and standards ClimateWatch's work has to sit inside. Consulted on the projects and publications where that expertise is required.",
  },

  advisors: [
    {
      slug: "mehnaz-parveen",
      image: "/images/team/mehnaz-parveen.webp",
      name: "Ms. Mehnaz Parveen",
      role: "Technical Advisor — Gender and Social Inclusion",
      summary:
        "Policy, gender and climate security specialist based in Islamabad. Advised ClimateWatch on the Women and Gender Module for the Glacier School.",
      profile: [
        "Mehnaz Parveen is ClimateWatch's External Advisor on Gender and Social Inclusion. Her work sits where climate policy meets gender, with strategic partnerships, inclusive technology and climate security running through it. She is based in Islamabad.",
        "For ClimateWatch, she advised on the Women and Gender Module for the Glacier School, our training programme on the cryosphere and mountain resilience in Gilgit-Baltistan and Chitral. Gender in climate training is usually handled as a paragraph in a concept note. Her contribution made it a taught component that participants had to work through, and it changed how the rest of the programme was designed.",
        "In her advisory role, she reviews the gender analysis in ClimateWatch research papers and project concepts before publication, advises on module design for future Glacier School cohorts, and guides inclusive recruitment and safeguarding for participants travelling to and within the north. She also advises on gender-responsive indicators where projects carry a monitoring and evaluation framework.",
        "Her engagement with ClimateWatch is need-based: she is consulted on specific projects and publications where her expertise is required.",
      ],
      expertise: [
        "Gender and social inclusion in climate policy",
        "Climate security",
        "Inclusive technology and digital access",
        "Strategic partnerships and multi-stakeholder engagement",
        "Policy design and analysis",
      ],
    },
    {
      slug: "fozia-tahir",
      image: "/images/team/fozia-tahir.webp",
      name: "Dr. Fozia Tahir",
      role: "External Advisor — Climate Literacy and Literacy based action",
      summary:
        "Environmental scientist and Assistant Professor at the Aga Khan University's Faculty of Arts and Sciences. A World Economic Forum Young Global Leader and a board member of WWF-Pakistan, she works on environmental education and sustainability curricula.",
      profile: [
        "Dr. Fozia Tahir is ClimateWatch's External Advisor on Climate Literacy and Literacy based action.",
        "She is Assistant Professor at the Aga Khan University's Faculty of Arts and Sciences, and works with the University's Institute for Educational Development on sustainability education and on training teachers to build environmental education into early childhood and K-12 curricula. She holds a DPhil from the University of Oxford, an MS from the National University of Sciences and Technology, and a BS from Fatima Jinnah Women University.",
        "An environmental scientist from Gilgit-Baltistan, her research covers water and wastewater treatment, microplastic pollution, environmental education, and behaviour change toward sustainability, and she works at the meeting point of scientific and indigenous knowledge. She has authored a module on climate change and sustainability, trained more than a hundred youth educators, and, with her students and team, produced around ten free open-access resources for teachers, parents and students.",
        "She is a World Economic Forum Young Global Leader in the class of 2025 and sits on the board of WWF-Pakistan.",
        "She advises ClimateWatch on curriculum design and pedagogy: the structure of the Glacier School and other training programmes, what participants should be able to do afterwards, and how the education components of ClimateWatch's project work are built.",
      ],
      expertise: [
        "Environmental and sustainability education",
        "Curriculum design and teacher training",
        "Water and wastewater treatment",
        "Microplastic pollution",
        "Behaviour change for sustainability",
      ],
    },
    {
      slug: "amjad-ali",
      image: "/images/team/amjad-ali.webp",
      name: "Mr. Amjad Ali",
      role: "Technical Advisor — Environmental Economics and Mountain Development",
      summary:
        "Assistant Professor and Head of the Department of Development Studies at Karakoram International University, Hunza Campus. A SANDEE-trained environmental economist working on climate vulnerability and ecosystem services.",
      profile: [
        "Amjad Ali is ClimateWatch's External Advisor on Environmental Economics and Mountain Development.",
        "He is Assistant Professor and Head of the Department of Development Studies at Karakoram International University, Hunza Campus, in Gilgit-Baltistan, and a SANDEE-trained environmental economist.",
        "His research covers environmental and resource economics and sustainable development in high-mountain regions, with published work on climate vulnerability, ecosystem services valuation, sustainable tourism, and the socio-economic dimensions of environmental change in mountain communities. He has held a fellowship at the International Sustainability Academy in Hamburg, where he worked on sustainable tourism in mountain regions, and a research fellowship at the Asian Institute of Technology in Bangkok.",
        "Alongside his academic work he has carried out research and consultancy assignments for WWF Pakistan, the Aga Khan Rural Support Programme, ETI-GB and ICIMOD, covering climate resilience, sustainable livelihoods, and evaluation of development programmes in mountain regions.",
        "He advises ClimateWatch on the economics underlying its research and project work: what mountain ecosystems are worth, what adaptation options return per rupee spent, and how climate vulnerability in Gilgit-Baltistan and Chitral can be measured rather than asserted.",
      ],
      expertise: [
        "Environmental and resource economics",
        "Ecosystem services valuation",
        "Climate vulnerability assessment in mountain communities",
        "Sustainable tourism in high-mountain regions",
        "Economic appraisal of adaptation and development interventions",
      ],
    },
    {
      slug: "tasawar-baig",
      image: "/images/team/tasawar-baig.webp",
      name: "Dr Tasawar Baig",
      role: "Technical Advisor — Climate and Environmental Governance",
      summary:
        "Associate Professor of Politics and International Studies and Director of Advanced Studies and Research at Karakoram International University, Gilgit-Baltistan. Founding faculty member since 2003 and co-editor of Mountain Studies.",
      profile: [
        "Dr Tasawar Baig is ClimateWatch's External Advisor on Climate and Environmental Governance.",
        "Tasawar Baig is an Associate Professor of Politics and International Studies and Director of Advanced Studies and Research at Karakoram International University (KIU), Gilgit-Baltistan. A member of KIU's founding faculty since 2003, he has contributed extensively to the university's academic and institutional development through various leadership roles, including Associate Dean, Faculty of Social Sciences (2020–2023), and Chair, Department of Politics and International Studies.",
        "Dr. Baig earned his PhD in International Studies from Old Dominion University, USA, as a Fulbright Scholar, and holds an International Master's degree in Asian Studies from Lund University, Sweden. His teaching and research interests include comparative politics and area studies, globalization and social change, political sociology, political ecology, interdependence and transnationalism, and social capital. His work increasingly focuses on the social and political dimensions of environmental change, sustainability, and mountain communities. He is also a co-editor of Mountain Studies: Understanding and Managing the Mountains for People and Nature.",
        "In 2008 he received the Higher Education Commission's Best University Teacher Award, and he has served on the HEC's National Curriculum Revision Committee for International Relations and Gender Studies.",
        "He advises ClimateWatch on the theoretical grounding of its work. Environmental research in Pakistan is dominated by pure-science backgrounds, and the theory that lets climate be read as a societal problem is borrowed from sociology, geography, anthropology and political science. His role is to keep that grounding present in ClimateWatch's papers and briefs, and in the Glacier School curriculum.",
      ],
      expertise: [
        "Climate and environmental governance",
        "Comparative politics and area studies",
        "Political ecology and political sociology",
        "Social capital and community-induced development in mountain societies",
        "Transnationalism, interdependence and globalisation",
        "Interdisciplinary research design in the social sciences",
      ],
    },
    {
      slug: "anam-rathor",
      image: "/images/team/anam-rathor.webp",
      name: "Ms. Anam Rathor",
      role: "Technical Advisor — Climate Finance",
      summary:
        "Programme Lead for Pakistan at the Climate Vulnerable Forum and V20 Finance Ministers (CVF-V20), with fifteen years in climate finance, climate policy design and multi-level stakeholder engagement.",
      profile: [
        "Anam Rathor is ClimateWatch's External Technical Advisor on Climate Finance.",
        "She is Programme Lead for Pakistan at the Climate Vulnerable Forum and V20 Finance Ministers (CVF-V20), the grouping of finance ministries from the world's most climate-vulnerable economies. She has previously worked with GIZ as a climate finance technical advisor, and with UNDP, DAI and SPARC.",
        "An environment and climate change professional with fifteen years of experience, her work covers climate finance, climate policy design, and multi-level stakeholder engagement for sustainable development. She works in the space between climate governance, investment frameworks and implementation, turning climate risk and vulnerability assessments into strategies that planning and financing systems can act on.",
        "She has argued for anticipatory financing instruments, including climate insurance, to protect vulnerable households from the income shocks that follow disasters, and for recognising that climate vulnerability in Pakistan is unevenly distributed, heat pressing on urban populations while drought presses on farming districts in southern Punjab.",
        "She advises ClimateWatch on the financing dimensions of its research and project work: the financing logic behind project concepts, access modalities for international climate funds, and the technical accuracy of its climate finance analysis.",
      ],
      expertise: [
        "Climate finance strategy and access to international climate funds",
        "Climate policy design",
        "Climate risk and vulnerability assessment",
        "Anticipatory and risk-transfer instruments, including climate insurance",
        "Multi-level stakeholder engagement across government, international institutions and civil society",
      ],
    },
    {
      slug: "ahmad-rafay-alam",
      image: "/images/team/ahmad-rafay-alam.webp",
      // NEEDS CONFIRMATION: spreadsheet name column reads "Mr. Rafey Alam";
      // the profile text reads "Ahmad Rafay Alam". Using the profile spelling.
      name: "Mr. Ahmad Rafay Alam",
      role: "Technical Advisor — Climate Litigation and Environmental Law",
      summary:
        "One of Pakistan's leading environmental lawyers and co-founder of Saleem, Alam & Co. He has served on the Pakistan Climate Change Council and the Punjab Environment Protection Council, and teaches at LUMS.",
      profile: [
        "Ahmad Rafay Alam is ClimateWatch's External Advisor on Climate Litigation and Environmental Law.",
        "He is one of Pakistan's leading environmental lawyers. In 2013, after more than a decade practising corporate and constitutional law, he co-founded Saleem, Alam & Co., a firm working in the energy, water, natural resources and urban infrastructure sectors. He advises federal and provincial governments, and international and national NGOs, on policy and strategy in those sectors.",
        "He has served as a member of the Pakistan Climate Change Council and of the Punjab Environment Protection Council, and is a Yale World Fellow.",
        "He has taught property and environment law at the Lahore University of Management Sciences since 2006, urban development at the University of the Punjab, and climate change and environmental economics at the Lahore School of Economics.",
        "He advises ClimateWatch on the legal dimensions of its research and advocacy: the framing of arguments that rest on statute or case law, the analysis of environmental and climate legislation, and the legal and regulatory questions that arise in project design.",
      ],
      expertise: [
        "Environmental and climate litigation in Pakistan",
        "Environmental protection legislation and the EIA and IEE regime",
        "Energy, water and natural resources law",
        "Urban infrastructure and land regulation",
        "Climate policy and environmental governance",
      ],
    },
    {
      slug: "imran-saqib-khalid",

      name: "Dr Imran Saqib Khalid",

      role: "Technical Advisor — Water Governance and Environmental Policy",

      summary:
        "Water Resource Governance Technical Expert on the FCDO-funded Catalytic Fund for Water Resource Accountability in Pakistan at Oxford Policy Management, and formerly Director of Governance and Policy at WWF-Pakistan.",

      profile: [
        "Dr Imran Saqib Khalid is ClimateWatch's External Advisor on Water Governance and Environmental Policy.",
        "He is a Water Resource Governance Technical Expert on the Catalytic Fund for Water Resource Accountability in Pakistan (CF-WRAP) at Oxford Policy Management. CF-WRAP forms part of WRAP, a \u00a330 million programme funded by the UK Foreign, Commonwealth and Development Office, which supports water governance reform and the scaling of water innovations across federal and provincial government and the private sector.",
        "He was previously Director of Governance and Policy at WWF-Pakistan, and before that spent close to six years as a Research Fellow at the Sustainable Development Policy Institute in Islamabad. He studied at the State University of New York College of Environmental Science and Forestry.",
        "He advises ClimateWatch on water governance and environmental policy: the institutional arrangements that determine how water is allocated and managed in Pakistan, the accountability gaps in those arrangements, and how water security connects to the cryosphere and mountain resilience work in Gilgit-Baltistan and Chitral.",
      ],

      expertise: [
        "Water resource governance and accountability",
        "Environmental policy and institutional reform",
        "Climate resilience and adaptation policy",
        "Research and evidence for policy influence",
        "Federal and provincial governance in Pakistan",
      ],

      image: "/images/team/imran-saqib-khalid.webp",
    },
  ] satisfies readonly TeamProfile[],

  /* ============================================================
     INTERNATIONAL ADVISORY
     Advisors based outside Pakistan. Separate from the advisory
     board above so the international bench is visible as such,
     and each entry carries a country code that renders a flag
     beside the name.
     ============================================================ */

  internationalAdvisors: [
    {
      slug: "tomasz-kowalczewski",
      image: "/images/team/tomasz-kowalczewski.webp",
      name: "Mr. Tomasz Kowalczewski",
      country: "PL",
      role: "External Advisor — Carbon Market Methodologies and GHG Standards",
      summary:
        "Climate Policy Director at Green Alchemy and a UNFCCC Article 6.4 Expert Reviewer for 2026–2028, with seventeen years in climate policy and carbon markets.",
      profile: [
        "Tomasz Kowalczewski is ClimateWatch's External Advisor on Carbon Market Methodologies and GHG Standards.",
        "He has seventeen years in climate policy and carbon markets, and is currently Climate Policy Director at Green Alchemy. He holds an active UNFCCC Article 6.4 Expert Reviewer mandate for 2026–2028. Earlier he built carbon farming standards at Agreena, and negotiated on Poland's official UNFCCC team at COP19.",
        "That combination is the reason for the appointment. Carbon market rules are written in negotiating rooms and then applied through methodologies and monitoring standards, and he has worked on both sides of that line — inside a national delegation, and inside the standards that crediting claims are later measured against.",
        "His advisory input covers technical review of carbon methodology and greenhouse gas monitoring content in ClimateWatch publications, guidance on the Article 6.4 mechanism and its supervisory and review architecture, advice on standards for carbon farming and land-sector crediting, and review of ClimateWatch assessments of carbon crediting claims before they are published.",
        "The engagement is need-based rather than standing. ClimateWatch approaches him when a specific project, publication or decision requires this expertise — usually a written review, a call, or comments on a draft. His Article 6.4 Expert Reviewer mandate takes precedence over any request, and advice he gives is his own professional view rather than a position held by Green Alchemy or any other organisation.",
      ],
      expertise: [
        "Carbon market methodologies",
        "Greenhouse gas monitoring standards",
        "The Article 6.4 mechanism and its review architecture",
        "Carbon farming and land-sector crediting standards",
        "Assessment of carbon crediting claims",
        "UNFCCC negotiation dynamics",
      ],
    },
  ] satisfies readonly TeamProfile[],

  /* ============================================================
     BOARD OF DIRECTORS
     ============================================================ */

  governance: {
    eyebrow: "Governance",
    title: "The board that carries institutional responsibility.",
    description:
      "The Board of Directors holds responsibility for institutional direction, oversight and accountability.",
  },

  board: [
    {
      slug: "iqbal-badruddin",
      image: "/images/team/iqbal-badruddin.webp",
      // NEEDS CONFIRMATION: spreadsheet name column reads "Iqbal Baddruddin";
      // the profile text reads "Iqbal Badruddin". Using the profile spelling.
      name: "Mr. Iqbal Badruddin",
      role: "Chairman",
      summary:
        "Founder of Fridays For Future Pakistan and a COP26 delegate. Holds a Master's in Climate Change from the University of Waterloo and is completing an MBA at the Ivey Business School.",
      profile: [
        "Iqbal Badruddin founded Fridays For Future Pakistan and grew the chapter past 4,000 members. He attended COP26 as a delegate, and his writing for the World Economic Forum was picked up by The Guardian.",
        "He holds a Master's in Climate Change from the University of Waterloo and is completing an MBA at the Ivey Business School, Western University, where he is founding president of Ivey's first AI in Business Club. He spent a year with the Aga Khan Development Network on a $10 million multi-country programme, and led a regional campaign turnaround at Costco.",
        "He came to the operational side of climate work from the advocacy side, on the view that advocacy moves people but not budgets, and that the gap between the two is an operating problem.",
      ],
    },
    {
      slug: "syed-kiram-board",
      image: "/images/team/syed-kiram.webp",
      name: "Mr. Syed Kiram Ali",
      // NEEDS CONFIRMATION: the board row reads "Executive Director"; the staff
      // row and the current live site read "Director".
      role: "Executive Director",
      note: "Also Director, ClimateWatch",
      summary:
        "A climate activist and youth leader from Chitral, and a 2023 Prime Minister's Youth Innovation Award recipient for his contribution to SDG 4.",
      profile: [
        "Syed Kiram is a Pakistani climate activist, researcher and youth leader from Chitral, Khyber Pakhtunkhwa, with a strong focus on climate action, youth participation, sustainable development and community resilience. He has been engaged in climate advocacy since his early teens and has contributed to youth-led movements and initiatives promoting climate action and sustainable development.",
        "He serves as a Youth Ambassador and Climate Change Advisor, contributing to climate advocacy, research, youth engagement and sustainable development initiatives. He has also held leadership roles in youth-led organisations and student initiatives.",
        "Kiram is actively involved in climate research and policy work, particularly on climate adaptation, climate justice, Indigenous and traditional knowledge, environmental education, and sustainable development in northern Pakistan. His work includes research, policy analysis, public awareness, youth capacity building and community-focused climate initiatives.",
        "In 2023 he received the Prime Minister's Youth Innovation Award for his contribution to SDG 4 (Quality Education) through his work on Sustainable Community Libraries. His work reflects a commitment to using youth-led innovation, education, research and community engagement to address environmental and social challenges.",
        "He is currently studying Business Sustainability at FAST-NUCES Islamabad, with interests in climate finance, ESG, sustainable development, and the intersection of business and climate action.",
      ],
    },
    {
      slug: "kamran-ali",
      image: "/images/team/kamran-ali.webp",
      name: "Mr. Kamran Ali",
      role: "Director",
      summary:
        "Co-founder of Fridays For Future Pakistan and a COP28 delegate. Cluster Head at the Plant-for-the-Planet Foundation, working on nature-based solutions, carbon markets and corporate sustainability.",
      profile: [
        "Kamran Ali co-founded Fridays For Future Pakistan and attended COP28 as a delegate. He is a Cluster Head at the Plant-for-the-Planet Foundation.",
        "His work covers nature-based solutions and carbon markets, climate adaptation and risk analysis, and corporate sustainability. He has trained government personnel on integrating nature-based solutions into policy frameworks, run more than thirty climate education sessions across Pakistan, and collaborated with organisations including WWF-Pakistan.",
        "He traces his work to 2006, when a flash flood hit his village in Yasin, Gilgit-Baltistan. What he saw there took him from local response toward institutional policy.",
      ],
    },
    {
      slug: "sajida-jan",
      image: "/images/team/sajida-jan.webp",
      // NEEDS CONFIRMATION: spreadsheet name column reads "Sajida Bibi"; the
      // profile text reads "Sajida Jan". Using the profile spelling.
      name: "Ms. Sajida Jan",
      role: "Director",
      summary:
        "Founder of the Cycle Care Campaign and a PhD student in neuroscience and pharmaceutical sciences at the University of Rhode Island. Her fieldwork on health in Gilgit underpins her work on climate justice.",
      profile: [
        "Sajida Jan founded the Cycle Care Campaign, which works with girls in less-advantaged areas of northern Pakistan on menstrual hygiene management. The project grew out of her own research in Gilgit, which found a strong correlation between menstrual hygiene management and gynaecological disorders, and was supported by a United World Colleges Go Make a Difference grant.",
        "She is a PhD student in neuroscience and pharmaceutical sciences at the University of Rhode Island, working in the Ross Lab, and holds a degree in behavioural neuroscience with a minor in statistics from St. Lawrence University, where she was a Davis Scholar. She studied the neuroscience of consciousness at the Danish Institute for Study Abroad in Copenhagen, and is a graduate of United World College Costa Rica.",
        "She brings quantitative research training to the board: experimental design, statistics, and primary fieldwork in Gilgit-Baltistan.",
      ],
    },
    {
      // Slug and image filename keep the earlier spelling so the photograph in
      // public/images/team/ still resolves. Neither appears in a URL.
      slug: "irshad-iqbal",

      image: "/images/team/irshad-iqbal.webp",

      name: "Mr. Irshad Qabool",

      role: "Director",

      summary:
        "Legal Associate at MOL Pakistan Oil and Gas Company B.V. and a 2025 LUMS law graduate, formerly Executive Director of the Organisation for Educational Change. His interests lie at the intersection of corporate regulation, environmental law and sustainability.",

      profile: [
        "Irshad Qabool is from Darkut Yasin, a village in District Ghizer, Gilgit-Baltistan.",
        "He graduated with a BA-LL.B. (Honours) from the Lahore University of Management Sciences (LUMS) in 2025. He currently works as a Legal Associate at MOL Pakistan Oil and Gas Company B.V., where his work focuses on corporate litigation and legal advisory on corporate, constitutional, environmental and other matters within Pakistan's exploration and production (E&P) sector. He aspires to build a legal career at the intersection of corporate regulation, environmental law and sustainability.",
        "Previously, Irshad served as Executive Director of the Organisation for Educational Change, a student-led NGO working across Gilgit-Baltistan and Chitral.",
        "He brings to the Board legal training and professional experience in contracts, corporate and constitutional law, alongside a strong interest in environmental governance and sustainability.",
      ],
    },
    {
      slug: "sajina-rehmat",
      image: "/images/team/sajina-rehmat.webp",
      name: "Ms. Sajina Rehmat",
      role: "Director",
      summary:
        "A forester with interests in environmental sustainability and community development. Holds a BS in Forestry from Karakoram International University, Gilgit, and led the Fridays For Future Gilgit-Baltistan chapter.",
      // NEEDS CONFIRMATION: the profile in the spreadsheet is cut off
      // mid-sentence. Closed using her card text; needs a proper ending.
      profile: [
        "Sajina Rehmat holds a Bachelor's degree in Forestry from Karakoram International University, Gilgit. Her interests are environmental sustainability, community development and leadership.",
        "She served as chapter lead of Fridays For Future Gilgit-Baltistan, and belongs to one of the communities most affected by the climate crisis in northern Pakistan.",
      ],
    },
    {
      slug: "atia-fehmi-board",
      image: "/images/team/atia-fehmi.webp",
      name: "Ms. Atia Fehmi",
      role: "Director",
      note: "Interim Head of Division, Research and Development",
      summary:
        "Environmental researcher with a Master's from the National University of Sciences and Technology, working on emissions, carbon markets and the energy transition.",
      profile: [
        "Atia Fehmi is an environmental scientist with a Master's degree in Environmental Sciences from the National University of Sciences and Technology, Islamabad. She has experience in environmental research, climate change, sustainability, GIS and remote sensing, greenhouse-gas emissions, carbon credits and environmental assessment.",
        "Her research experience includes assessing biomass co-firing in existing coal-fired power plants, with a focus on environmental and economic impacts, emissions reduction, and the potential application of carbon credits. She has also worked on municipal solid waste management, environmental impact assessment, glacier and snow monitoring, and field-based environmental research.",
        "She is interested in climate action, decarbonisation, carbon markets, climate resilience, and practical solutions that support a transition toward more sustainable and low-carbon systems.",
      ],
      linkedin: "https://www.linkedin.com/in/atia-f-a66553182/",
    },

    {
      slug: "nida-khan",
      name: "Ms. Nida Khan",
      role: "Director",
      summary:
        "Social Development student at Aga Khan University and former Canada-to-Pakistan Ambassador for a Day. Youth advocate working on gender equality, women's empowerment, climate action and community engagement.",
      profile: [
        "Nida Khan is a second-year Social Development student at Aga Khan University's Faculty of Arts and Sciences.",
        "She has worked with UN Women Pakistan for a year and a half, gaining experience in gender equality, women's empowerment and community engagement. She has also worked with local organisations on girls' empowerment and climate advocacy, including co-organising Chitral's first ever Regional Youth Climate Summit.",
        "She is currently Chitral Regional Lead at Buttercups, an initiative focused on youth mental well-being and public health, and is part of the Youth Climate Action Initiative run by UN Women Pakistan and the Ministry of Climate Change and Environmental Coordination. She previously served as Canada-to-Pakistan Ambassador for a Day.",
        "Her interests include social development, youth engagement, gender equality, community-based initiatives and climate advocacy.",
      ],
      image: "/images/team/nida-khan.webp",
    },
  ] satisfies readonly TeamProfile[],

  /* ============================================================
     DIVISIONAL TEAMS
     Interns, assistants, associates and specialists, listed under the
     division they work in. Source: roster spreadsheet.

     ORDER WITHIN A DIVISION is by seniority, and it is manual — nothing
     sorts this array at runtime, so a new entry has to be inserted in the
     right place by hand:

       1. Staff
       2. Research Associate
       3. Student Assistant
       4. any other specialist title
          (Junior Policy Advisor, AI Engineer, Media Host,
          Project Coordinator)
       5. Interns, last

     People sharing a title keep the order they are listed in. A title that
     is not an internship belongs at step 4 rather than the bottom — a new
     specialist role should never be filed below the interns by default.
     ============================================================ */

  associates: [
    /* ==========================================
       RESEARCH AND DEVELOPMENT
       ========================================== */
    {
      name: "Nisha Irfan",
      department: "research-development",
      position: "Staff",
      email: "nisha@climatewatch-nccb.org",
      image:
        "/images/team/nisha-irfan.webp",
    },
    {
      name: "Fatimah Muneer",
      department: "research-development",
      position: "Research Associate",
      email: "fatimah.muneer@climatewatch-nccb.org",
      image:
        "/images/team/fatimah-muneer.webp",
    },
    {
      name: "Imtiaz Ali Zeb",
      department: "research-development",
      position: "Research Associate",
      email: "imtiaz.ali@climatewatch-nccb.org",
      image:
        "/images/team/imtiaz-ali-zeb.webp",
    },
    {
      name: "Sania Asim",
      department: "research-development",
      position: "Research Associate",
      email: "saniaasim26@gmail.com",
      image:
        "/images/team/sania-asim.webp",
    },
    {
      name: "Mamoona Asim",
      department: "research-development",
      position: "Intern",
      email: "mamoonaasim@climatewatch-nccb.org",
      image:
        "/images/team/mamoona-asim.webp",
    },
    {
      name: "Bilal Ahmed",
      department: "research-development",
      position: "Intern",
      email: "bilal@climatewatch-nccb.org",
      image:
        "/images/team/bilal-ahmed.webp",
    },
    {
      name: "Muhammad Ehsaan",
      department: "research-development",
      position: "Intern",
      email: "muhammadehsaan@climatewatch-nccb.org",
      image:
        "/images/team/muhammad-ehsaan.webp",
    },
    /* ==========================================
       INTERNATIONAL CLIMATE POLICY
       ========================================== */
    {
      name: "Anfal Nadir",
      department: "international-climate-policy",
      position: "Research Associate",
      email: "anfal.nadir@climatewatch-nccb.org",
      image:
        "/images/team/anfal-nadir.webp",
    },
    {
      name: "Mutahira Hasnain Gillani",
      department: "international-climate-policy",
      position: "Junior Policy Advisor",
      email: "mutahira@climatewatch-nccb.org",
      image:
        "/images/team/mutahira-hasnain-gillani.webp",
    },
    {
      name: "Babar Nasir",
      department: "international-climate-policy",
      position: "Intern",
      email: "n.babar@climatewatch-nccb.org",
      image:
        "/images/team/babar-nasir.webp",
    },
    {
      name: "Mehak Mir",
      department: "international-climate-policy",
      position: "Intern",
      image:
        "/images/team/mehak-mir.webp",
      email:
        "mehakmaqsadmir@gmail.com",
    },
    {
      name: "Rima Sahar",
      department: "international-climate-policy",
      position: "Intern",
      email: "rimasahar786@gmail.com",
      image:
        "/images/team/rima-sahar.webp",
    },
    {
      /*
       * Spelling follows the supplied photo file ("Fatimah Zaheer") and the
       * roster's existing Fatimah Muneer. The request adding her wrote
       * "Fatima" — worth confirming which she uses.
       */
      name: "Fatimah Zaheer",
      department: "international-climate-policy",
      position: "Intern",
      email:
        "fatimazaheer602@gmail.com",
      image:
        "/images/team/fatimah-zaheer.webp",
    },
    /* ==========================================
       EDUCATION FOR SUSTAINABLE DEVELOPMENT
       ========================================== */
    {
      name: "Rafia Imtiaz",
      department: "education-sustainable-development",
      position: "Student Assistant",
      email: "rafiaimtiaz@climatewatch-nccb.org",
      image:
        "/images/team/rafia-imtiaz.webp",
    },
    {
      name: "Syeda Hoorain Imran",
      department: "education-sustainable-development",
      position: "Student Assistant",
      email: "hoorain.imran@climatewatch-nccb.org",
      image:
        "/images/team/syeda-hoorain-imran.webp",
    },
    {
      name: "Hashma Shahzad Ahmad",
      department: "education-sustainable-development",
      position: "Intern",
      email: "hashma.shahzad@climatewatch-nccb.org",
      image:
        "/images/team/hashma-shahzad-ahmad.webp",
    },
    /* ==========================================
       PARTNERSHIP AND OUTREACH
       ========================================== */
    {
      name: "Ariba Khan",
      department: "partnerships-outreach",
      position: "Student Assistant",
      email: "k.ariba@climatewatch-nccb.org",
      image:
        "/images/team/ariba-khan.webp",
    },
    {
      name: "Alexandra Schiller",
      department: "partnerships-outreach",
      position: "Intern",
      email: "s.alexandra@climatewatch-nccb.org",
      image:
        "/images/team/alexandra-schiller.webp",
    },
    /* ==========================================
       TECHNICAL AND ENGINEERING
       ========================================== */
    {
      name: "Amin Fahim",
      department: "technical-engineering",
      position: "AI Engineer",
      email: "fahamin5149@gmail.com",
      image:
        "/images/team/amin-fahim.webp",
    },
    /* ==========================================
       PROJECT MANAGEMENT
       ========================================== */
    {
      name: "Ahbab Ullah Qureshi",
      department: "project-management",
      position: "Project Coordinator",
      email: "ahbab.ullah@climatewatch-nccb.org",
      image:
        "/images/team/ahbab-ullah.webp",
    },
    {
      name: "Syeda Fiza Kazmi",
      department: "project-management",
      position: "Project Coordinator",
      email: "fiza.kazmi@climatewatch-nccb.org",
      image:
        "/images/team/syeda-fiza-kazmi.webp",
    },
    /* ==========================================
       MEDIA AND COMMUNICATIONS
       ========================================== */
    {
      name: "Aimen Tahir",
      department: "communications-media",
      position: "Media Host",
      email: "aimantahirhashmi2@gmail.com",
      image:
        "/images/team/aimen-tahir.webp",
    },
    {
      name: "Ebrahim Jamali",
      department: "communications-media",
      position: "Media Host",
      email: "ebrahimjamali181005@gmail.com",
      image:
        "/images/team/ebrahim-jamali.webp",
    },
    {
      name: "Aqsa Essa",
      department: "communications-media",
      position: "Intern",
      email: "aqsaessa4@gmail.com",
      image:
        "/images/team/aqsa-essa.webp",
    },
    {
      name: "Habiba Tariq",
      department: "communications-media",
      position: "Intern, Blog Writer",
      email: "habibat990@gmail.com",
      image:
        "/images/team/habiba-tariq-2026-08.webp",
    },
    /* ==========================================
       HUMAN RESOURCES
       ========================================== */
    {
      name: "Shahab Uddin",
      department: "human-resources",
      position: "Intern",
      email: "HR@climatewatch-nccb.org",
      image:
        "/images/team/shahab-uddin.webp",
    },
  ] satisfies readonly TeamAssociate[],

  join: {
    eyebrow: "Work with us",
    title: "We work with researchers, educators and climate practitioners.",
    description:
      "ClimateWatch collaborates with contributors across climate policy, research, education and technical work. If your work connects with ours, we would like to hear from you.",
  },

  closing: {
    eyebrow: "Contact",
    title: "For institutional, research or programme enquiries.",
    email: "info@climatewatch-nccb.org",
  },
} as const;
