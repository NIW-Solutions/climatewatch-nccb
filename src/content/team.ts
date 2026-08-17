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
    image: "/images/team/team-hero.webp",
    imageAlt:
      "ClimateWatch team members working with mountain communities in northern Pakistan.",
    imageCaption:
      "Our team works between mountain communities, national policy institutions and international climate negotiations.",
  },

  stats: [
    {
      label: "Team members",
      value: "47",
    },
    {
      label: "Divisions",
      value: "09",
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
      name: "Syed Kiram",
      department: "directorate",
      designation: "Director",
      focus:
        "Institutional strategy, climate policy direction and organisational representation.",
      email: "syedkiram-cw@nccb-un.org",
      image: "/images/team/syed-kiram.jpeg",
      linkedin: "https://www.linkedin.com/in/syed-kiram-828377193/",
      instagram: "https://www.instagram.com/syedkiram/",
    },

    /* ==========================================
       INTERNATIONAL CLIMATE POLICY
       ========================================== */
    {
      name: "Pervez Aly",
      department: "international-climate-policy",
      designation: "Head of Division",
      focus:
        "UNFCCC negotiation tracking, climate policy analysis and international engagement.",
      email: "pervez-cw@nccb-un.org",
      image: "/images/team/pervez-aly.jpg",
      linkedin: "https://www.linkedin.com/in/pervezaly/",
      instagram: "https://www.instagram.com/_aka.aly/",
    },

    /* ==========================================
       RESEARCH AND DEVELOPMENT
       ========================================== */
    {
      name: "Atia Fehmi",
      department: "research-development",
      designation: "Head of Division",
      focus:
        "Research design, evidence standards and applied climate development work.",
      email: "atia@climatewatch-nccb.org",
      image: "/images/team/atia-fehmi.png",
      linkedin: "https://www.linkedin.com/in/atia-f-a66553182/",
    },

    /* ==========================================
       EDUCATION FOR SUSTAINABLE DEVELOPMENT
       ========================================== */
    {
      name: "Didar Ali",
      department: "education-sustainable-development",
      designation: "Head of Division",
      focus:
        "Climate education programmes, training design and community learning.",
      email: "didar@climatewatch-nccb.org",
      image: "/images/team/didar-ali.jpg",
      linkedin: "https://www.linkedin.com/in/didar-ali-/",
      instagram: "https://www.instagram.com/didar.aly/",
    },

    /* ==========================================
       PARTNERSHIP AND OUTREACH
       ========================================== */
    {
      name: "Mehtab Kamal",
      department: "partnerships-outreach",
      designation: "Head of Division",
      focus:
        "Institutional partnerships, outreach strategy and stakeholder relations.",
      email: "mehtab@climatewatch-nccb.org",
      image: "/images/team/mehtab-kamal.jpg",
      linkedin: "https://www.linkedin.com/in/mehtab-kamal-a75673387/",
      instagram: "https://www.instagram.com/mehtab_kml/",
    },

    /* ==========================================
       TECHNICAL AND ENGINEERING
       ========================================== */
    {
      name: "Mubeen Ishfaq",
      department: "technical-engineering",
      designation: "Head of Division",
      focus:
        "Technical systems, engineering projects and applied climate technology.",
      email: "mubeen@climatewatch-nccb.org",
      image: "/images/team/mubeen-ishfaq.jpg",
      linkedin: "https://www.linkedin.com/in/mubeen-ishfaq/",
      instagram: "https://www.instagram.com/mubeenishfaq7/",
    },

    /* ==========================================
       PROJECT MANAGEMENT
       ========================================== */
    {
      name: "Riaz Ahmed",
      department: "project-management",
      // Changed from "Head of Department" to match the spreadsheet.
      designation: "Head of Division",
      focus:
        "Programme delivery, project planning and operational coordination.",
      email: "riaz@climatewatch-nccb.org",
      image: "/images/team/riaz-ahmed.png",
      linkedin: "https://www.linkedin.com/in/riaz-ahmed56",
      instagram: "https://www.instagram.com/thisisriiaz/",
    },

    /* ==========================================
       MEDIA AND COMMUNICATIONS
       ========================================== */
    {
      name: "Sajjad Ali",
      department: "communications-media",
      designation: "Head of Division",
      // NEEDS CONFIRMATION: no description supplied in the spreadsheet.
      // Written from the remit of the role, not from anything biographical.
      focus:
        "Editorial direction, media relations and public climate communication.",
      email: "sajjad@climatewatch-nccb.org",
      image: "/images/team/sajjad-ali.jpg",
      linkedin: "https://www.linkedin.com/in/sajjadaly/",
      instagram: "https://www.instagram.com/sajjad_sharma/",
    },

    /* ==========================================
       HUMAN RESOURCES
       ========================================== */
    {
      name: "Michael Muyutu",
      department: "human-resources",
      designation: "Human Resource Manager",
      // NEEDS CONFIRMATION: no description supplied in the spreadsheet.
      focus: "Recruitment, staff development and organisational policy.",
      // NEEDS CONFIRMATION: personal address; every other member is on an
      // organisational domain.
      email: "michaelmuyutu1@gmail.com",
      image: "/images/team/michael-muyutu.jpeg",
      linkedin:
        "https://www.linkedin.com/in/michael-muyutu-%E2%80%93bba-aab79126a",
      instagram: "https://www.instagram.com/iam_michael003",
    },
  ] satisfies readonly TeamMember[],

  /* ============================================================
     TECHNICAL ADVISORS
     ============================================================ */

  advisory: {
    eyebrow: "Advisory",
    title: "Specialists who review the substance of our work.",
    description:
      "External advisors are consulted on the projects and publications where their expertise is required. They review technical and analytical content before it is published.",
  },

  advisors: [
    {
      slug: "mehnaz-parveen",
      image: "/images/team/mehnaz-parveen.jpeg",
      name: "Mehnaz Parveen",
      role: "External Advisor — Gender and Social Inclusion",
      summary:
        "Policy, gender and climate security specialist based in Islamabad. Advised ClimateWatch on the Women and Gender Module for the Glacier School.",
      profile: [
        "Mehnaz Parveen is ClimateWatch's External Advisor on Gender and Social Inclusion. Her work sits where climate policy meets gender, with strategic partnerships, inclusive technology and climate security running through it. She is based in Islamabad.",
        "For ClimateWatch, she advised on the Women and Gender Module for the Glacier School, our training programme on the cryosphere and mountain resilience in Gilgit-Baltistan and Chitral. Gender in climate training is usually handled as a paragraph in a concept note. Her contribution made it a taught component that participants had to work through, and it changed how the rest of the programme was designed.",
        "In her advisory role she reviews the gender analysis in ClimateWatch research papers and project concepts before publication, advises on module design for future Glacier School cohorts, and guides inclusive recruitment and safeguarding for participants travelling to and within the north. She also advises on gender-responsive indicators where projects carry a monitoring and evaluation framework.",
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
      slug: "tasawar-baig",
      image: "/images/team/tasawar-baig.png",
      name: "Dr Tasawar Baig",
      role: "External Advisor — Climate and Environmental Governance",
      summary:
        "Associate Professor of Social Sciences and Humanities at the University of Central Asia, and formerly Associate Dean and Chairman of Politics and International Studies at Karakoram International University.",
      profile: [
        "Dr Tasawar Baig is ClimateWatch's External Advisor on Climate and Environmental Governance.",
        "He is Associate Professor in the Department of Social Sciences and Humanities at the University of Central Asia, Naryn, and previously served as Associate Dean and Chairman of the Department of Politics and International Studies at Karakoram International University, Gilgit. He holds a PhD in International Studies from Old Dominion University, completed under a Fulbright scholarship, and an International Master's in Asian Studies from Lund University. In 2008 he received the Higher Education Commission's Best University Teacher Award, and he has served on the HEC's National Curriculum Revision Committee for International Relations and Gender Studies.",
        "His research covers comparative politics and area studies, transnationalism, globalisation and social change, social capital, and community-induced development in mountain societies. He is co-editor of Mountain Studies: Understanding and Managing the Mountains for People and Nature.",
        "He advises ClimateWatch on the theoretical grounding of its work. Environmental research in Pakistan is dominated by pure-science backgrounds, and the theory that lets climate be read as a societal problem is borrowed from sociology, geography, anthropology and political science. His role is to keep that grounding present in ClimateWatch's papers and briefs, and in the Glacier School curriculum.",
      ],
      expertise: [
        "Climate and environmental governance",
        "Comparative politics and area studies",
        "Social capital and community-induced development in mountain societies",
        "Transnationalism, interdependence and globalisation",
        "Interdisciplinary research design in the social sciences",
      ],
    },
    {
      slug: "amjad-ali",
      image: "/images/team/amjad-ali.jpeg",
      name: "Professor Amjad Ali",
      role: "External Advisor — Environmental Economics and Mountain Development",
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
      slug: "anam-rathor",
      image: "/images/team/anam-rathor.png",
      name: "Anam Rathor",
      role: "External Technical Advisor — Climate Finance",
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
      image: "/images/team/ahmad-rafay-alam.jpg",
      // NEEDS CONFIRMATION: spreadsheet name column reads "Mr. Rafey Alam";
      // the profile text reads "Ahmad Rafay Alam". Using the profile spelling.
      name: "Ahmad Rafay Alam",
      role: "External Advisor — Climate Litigation and Environmental Law",
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
      image: "/images/team/iqbal-badruddin.jpeg",
      // NEEDS CONFIRMATION: spreadsheet name column reads "Iqbal Baddruddin";
      // the profile text reads "Iqbal Badruddin". Using the profile spelling.
      name: "Iqbal Badruddin",
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
      image: "/images/team/syed-kiram.jpeg",
      name: "Syed Kiram",
      // NEEDS CONFIRMATION: the board row reads "Executive Director"; the staff
      // row and the current live site read "Director".
      role: "Executive Director",
      note: "Also Director, ClimateWatch",
      summary:
        "A climate activist and youth leader from Chitral. Youth Ambassador and Climate Change Advisor at NCCB, and a 2023 Prime Minister's Youth Innovation Award recipient for his contribution to SDG 4.",
      profile: [
        "Syed Kiram is a Pakistani climate activist, researcher and youth leader from Chitral, Khyber Pakhtunkhwa, with a strong focus on climate action, youth participation, sustainable development and community resilience. He has been engaged in climate advocacy since his early teens and has contributed to youth-led movements and initiatives promoting climate action and sustainable development.",
        "He serves as a Youth Ambassador and Climate Change Advisor at the Northern Citizens' Community Board (NCCB), a UN ECOSOC-accredited organisation, where he contributes to climate advocacy, research, youth engagement and sustainable development initiatives. He has also held leadership roles in youth-led organisations and student initiatives.",
        "Kiram is actively involved in climate research and policy work, particularly on climate adaptation, climate justice, Indigenous and traditional knowledge, environmental education, and sustainable development in northern Pakistan. His work includes research, policy analysis, public awareness, youth capacity building and community-focused climate initiatives.",
        "In 2023 he received the Prime Minister's Youth Innovation Award for his contribution to SDG 4 (Quality Education) through his work on Sustainable Community Libraries. His work reflects a commitment to using youth-led innovation, education, research and community engagement to address environmental and social challenges.",
        "He is currently studying Business Sustainability at FAST-NUCES Islamabad, with interests in climate finance, ESG, sustainable development, and the intersection of business and climate action.",
      ],
      linkedin: "https://www.linkedin.com/in/syed-kiram-828377193/",
      instagram: "https://www.instagram.com/syedkiram/",
    },
    {
      slug: "kamran-ali",
      image: "/images/team/kamran-ali.jpeg",
      name: "Kamran Ali",
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
      image: "/images/team/sajida-jan.jpeg",
      // NEEDS CONFIRMATION: spreadsheet name column reads "Sajida Bibi"; the
      // profile text reads "Sajida Jan". Using the profile spelling.
      name: "Sajida Jan",
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
      slug: "irshad-iqbal",
      image: "/images/team/irshad-iqbal.jpeg",
      // NEEDS CONFIRMATION: spreadsheet name column reads "Irshad Iqbal"; the
      // profile text reads "Irshad Qabool". Using the name column.
      name: "Irshad Iqbal",
      role: "Director",
      // NEEDS CONFIRMATION: no card text supplied; condensed from the profile.
      summary:
        "Legal Associate at MOL Pakistan Oil and Gas Company B.V. and a 2025 BA-LL.B (Honours) graduate of the Lahore University of Management Sciences, from Darkut Yasin in District Ghizer.",
      profile: [
        "Irshad Iqbal is from Darkut Yasin, a village in District Ghizer, Gilgit-Baltistan.",
        "He graduated with a BA-LL.B (Honours) from the Lahore University of Management Sciences in 2025, with a foundation in contract, commercial, property and constitutional law, and training in legal research, case law analysis and drafting within Pakistan's constitutional and regulatory framework. He works as a Legal Associate at MOL Pakistan Oil and Gas Company B.V.",
        "His interests run to commercial and contract law, intellectual property, tax and cybersecurity law, and commercial arbitration and alternative dispute resolution. He brings legal training in contracts and constitutional law to the board.",
      ],
    },
    {
      slug: "sajina-rehmat",
      image: "/images/team/sajina-rehmat.png",
      name: "Sajina Rehmat",
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
      image: "/images/team/atia-fehmi.png",
      name: "Atia Fehmi",
      role: "Director",
      note: "Also Head of Division, Research and Development",
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
      name: "Nida Khan",
      role: "Director",
      summary:
        "Social Development student at Aga Khan University and former Canada-to-Pakistan Ambassador for a Day. Youth advocate working on gender equality, women's empowerment, climate action and community engagement.",
      profile: [
        "Nida Khan is a second-year Social Development student at Aga Khan University's Faculty of Arts and Sciences.",
        "She has worked with UN Women Pakistan for a year and a half, gaining experience in gender equality, women's empowerment and community engagement. She has also worked with local organisations on girls' empowerment and climate advocacy, including co-organising Chitral's first ever Regional Youth Climate Summit.",
        "She is currently Chitral Regional Lead at Buttercups, an initiative focused on youth mental well-being and public health, and is part of the Youth Climate Action Initiative run by UN Women Pakistan and the Ministry of Climate Change and Environmental Coordination. She previously served as Canada-to-Pakistan Ambassador for a Day.",
        "Her interests include social development, youth engagement, gender equality, community-based initiatives and climate advocacy.",
      ],
      image: "/images/team/nida-khan.jpg",
    },

    /*
     * NEEDS CONFIRMATION — Shahzadi Naira
     * Listed on the board in the spreadsheet with no role, no biography and
     * no photograph. Omitted rather than rendered as an empty card.
     * Fill in and uncomment:
     *
     * {
     *   slug: "shahzadi-naira",
     *   name: "Shahzadi Naira",
     *   role: "Director",
     *   summary: "",
     *   profile: [],
     * },
     */
  ] satisfies readonly TeamProfile[],

  /* ============================================================
     DIVISIONAL TEAMS
     Interns, assistants, associates and representatives, listed
     under the division they work in. Source: roster spreadsheet.
     ============================================================ */

  associates: [
    /* ==========================================
       RESEARCH AND DEVELOPMENT
       ========================================== */
    {
      name: "Mamoona Asim",
      department: "research-development",
      position: "Intern",
      email: "i234525@isb.nu.edu.pk",
    },
    {
      name: "Fatimah Muneer",
      department: "research-development",
      position: "Intern",
      email: "fatimah.muneer@climatewatch-nccb.org",
    },
    {
      name: "Imtiaz Ali Zeb",
      department: "research-development",
      position: "Intern",
      email: "imtiaz.ali@climatewatch-nccb.org",
    },
    {
      name: "Bushra Ansari",
      department: "research-development",
      position: "Intern",
      email: "bushra@climatewatch-nccb.org",
    },
    {
      name: "Bilal Ahmed",
      department: "research-development",
      position: "Intern",
      email: "bilal@climatewatch-nccb.org",
    },
    {
      name: "Sania Asim",
      department: "research-development",
      position: "Intern",
      email: "saniaasim26@gmail.com",
    },
    {
      name: "Muhammad Ehsaan",
      department: "research-development",
      position: "Intern",
      email: "muhammadehsaan9990@gmail.com",
    },
    {
      name: "Nisha Irfan",
      department: "research-development",
      position: "Staff",
      email: "nisha@climatewatch-nccb.org",
    },
    /* ==========================================
       INTERNATIONAL CLIMATE POLICY
       ========================================== */
    {
      name: "Anfal Nadir",
      department: "international-climate-policy",
      position: "Research Associate",
      email: "anfal.nadir@climatewatch-nccb.org",
    },
    {
      name: "Mutahira Hasnain Gillani",
      department: "international-climate-policy",
      position: "Junior Policy Advisor",
      email: "mutahira@climatewatch-nccb.org",
    },
    {
      name: "Babar Nasir",
      department: "international-climate-policy",
      position: "Intern",
      email: "n.babar@climatewatch-nccb.org",
    },
    {
      name: "Mehak Mir",
      department: "international-climate-policy",
      position: "Intern",
      // NEEDS CONFIRMATION: no email of any kind in the roster sheet.
    },
    {
      name: "Rima Sahar",
      department: "international-climate-policy",
      position: "Intern",
      email: "rimasahar786@gmail.com",
    },
    /* ==========================================
       EDUCATION FOR SUSTAINABLE DEVELOPMENT
       ========================================== */
    {
      name: "Rafia Imtiaz",
      department: "education-sustainable-development",
      position: "Student Assistant",
      email: "rafiaimtiaz@climatewatch-nccb.org",
    },
    {
      name: "Syeda Hoorain Imran",
      department: "education-sustainable-development",
      position: "Student Assistant",
      email: "hoorain.imran@climatewatch-nccb.org",
    },
    {
      name: "Hashma Shahzad Ahmad",
      department: "education-sustainable-development",
      position: "Representative",
      email: "hashma.shahzad@climatewatch-nccb.org",
    },
    {
      name: "Alishba Rauf",
      department: "education-sustainable-development",
      position: "Representative",
      email: "alishba.rauf@climatewatch-nccb.org",
    },
    /* ==========================================
       PARTNERSHIP AND OUTREACH
       ========================================== */
    {
      name: "Alexandra Schiller",
      department: "partnerships-outreach",
      position: "Intern",
      email: "alexschiller92@gmail.com",
    },
    {
      name: "Ariba Khan",
      department: "partnerships-outreach",
      position: "Student Assistant",
      email: "aribakw123@gmail.com",
    },
    /* ==========================================
       PROJECT MANAGEMENT
       ========================================== */
    {
      name: "Ahbab Ullah",
      department: "project-management",
      position: "Intern",
      email: "ahbab.ullah@climatewatch-nccb.org",
    },
    {
      name: "Syeda Fiza Kazmi",
      department: "project-management",
      position: "Intern",
      email: "fiza.kazmi@climatewatch-nccb.org",
    },
    /* ==========================================
       MEDIA AND COMMUNICATIONS
       ========================================== */
    {
      name: "Aimen Tahir",
      department: "communications-media",
      position: "Media Host",
      email: "aimantahirhashmi2@gmail.com",
    },
    {
      name: "Ebrahim Jamali",
      department: "communications-media",
      position: "Media Host",
      email: "ebrahimjamali181005@gmail.com",
    },
    {
      name: "Aqsa Essa",
      department: "communications-media",
      position: "Intern",
      email: "aqsaessa4@gmail.com",
    },
    {
      // NEEDS CONFIRMATION: possibly the same person as "Shahzadi Naira",
      // listed on the board in the earlier sheet with no details.
      name: "Naira Shahzadi",
      department: "communications-media",
      position: "Staff",
      email: "naira@climatewatch-nccb.org",
    },
    {
      name: "Habiba Tariq",
      department: "communications-media",
      position: "Intern, Blog Writer",
      email: "habibat990@gmail.com",
    },
    /* ==========================================
       HUMAN RESOURCES
       ========================================== */
    {
      name: "Shahab Uddin",
      department: "human-resources",
      position: "Intern",
      email: "HR@climatewatch-nccb.org",
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
