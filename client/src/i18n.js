import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: { home: 'Home', about: 'About', services: 'Services', careers: 'Careers', contact: 'Contact' },
      home: {
        title: 'Codentrix — Mainframe & IT Consulting',
        subtitle: 'COBOL, legacy modernization and telecom strategy for banks, insurers and enterprises',
        primary: 'Speak with an expert',
        secondary: 'Explore services',
        proof: ['20+ enterprise migrations','Regulated systems specialists','Regional presence — MENA & EU'],
        teamTitle: 'Leadership & Strategy',
        teamLead: 'Seasoned leadership delivering large-scale modernization and telecom programs.'
      },

      about: {
        title: 'About Codentrix',
        description: 'Codentrix delivers specialized consulting, custom development, training and maintenance for critical mainframe applications and telecom solutions. Our mission is to help institutions in banking, finance and telecom modernize reliably while keeping business continuity and compliance front and center.',
        leadershipTitle: 'Leadership',
        leadershipLead: 'Our leadership team brings decades of hands-on experience in core banking modernization, payments, and regulated financial systems delivery.',
        leaders: {
          nader: { lead: 'CEO with 20+ years leading telecom and technology operations across MENA.', back: 'Seasoned executive with a track record in regional leadership (Ericsson, Huawei, Siemens). Focused on strategy, P&L responsibility and high-performing teams.' },
          fethi: { lead: 'CTO with 30+ years in core banking modernization, payments and compliance.', back: 'Experienced in large-scale core migrations, payment systems and IAS/IFRS reporting—trusted to deliver compliant, resilient transformations.' },
          ahmed: { lead: 'CSO driving growth strategy, partnerships and product-market fit.', back: 'Seasoned strategist with experience in business development, strategic partnerships and product strategy across telecom and banking sectors.' }
        }
      },

      services: {
        title: 'Services',
        bank: {
          title: 'Banking & Finance',
          lead: 'Deep mainframe and core-banking experience focused on legacy modernization, regulatory compliance and reliable transaction processing. Typical engagements:',
          points: [
            'Core migration & modernization: Matrix, Seneca, IASIRA and NSP/TREND migrations from legacy platforms (OASI, TREND) to modern stacks.',
            'COBOL & batch modernization: refactoring, online-to-batch consolidation, job (JCL) tuning and performance optimization.',
            'SEPA/Payments & settlement: SDD/SCT/SEDA, check-truncation, settlement currency handling and integration with payment hubs.',
            'Accounting & reporting: IAS/IFRS implementations and IASIRA customizations to ensure compliant financial reporting.',
            'Portfolio & treasury systems: portfolio management integrations, reconciliation and regulatory reporting pipelines.',
            'Data & platform migration: secure data migration, DB2/VSAM/IMS to modern stores, migration testing and cutover planning.',
            'Regulatory readiness & QA: compliance testing, audit support and operational continuity for post-merger/platform conversions.',
            'Advisory & delivery: project leadership, vendor coordination, BPM-to-core transitions and runbook-driven operational handover.'
          ],
          techProfile: 'Technology profile: COBOL, JCL, MVS, CICS/IMS, VSAM, DB2; platforms and modules: Matrix/NSP, SENECA, IASIRA, check-truncation and payment engines.'
        },
        telecom: {
          title: 'Telecom',
          lead: 'OSS/BSS strategy and transformation, network modernization planning and migration roadmaps.',
          points: ['OSS/BSS strategy and transformation','Network modernization planning','Vendor selection and migration roadmaps']
        },
        advisory: { title: 'Advisory & Delivery', lead: 'Program leadership, compliance and operational handover.' }
      },

      cases: {
        0: { title: 'Core banking migration', summary: 'Large bank migrated core systems with zero-downtime cutover and improved throughput.' },
        1: { title: 'Payments platform modernization', summary: 'Payment rails consolidated, enabling faster settlement and improved compliance.' }
      },

      careers: {
        title: 'Careers',
        lead: 'Join Codentrix — we hire experienced engineers, architects and domain experts who want to work on high-impact modernization projects in banking and telecom.',
        whyTitle: 'Why work with us',
        why: ['Work on large-scale, mission-critical modernization projects.','Cross-functional teams combining business and technical expertise.','Flexible and hybrid working model; opportunities across MENA and EU.','Competitive compensation and continuous learning budget.'],
        ctaLead: 'Interested? Send your CV and a short note explaining the roles you are targeting.',
        cta: 'Send CV'
      },

      contact: {
        title: 'Contact',
        company: 'Codentrix SARL',
        addressLabel: 'Address',
  emailLabel: 'Email',
  phoneLabel: 'Phone',
  country: 'TUNISIA',
        form: { send: 'Send Message', name: 'Name', email: 'Email', message: 'Message' }
      },

      footer: { copy: '© {{year}} Codentrix. All rights reserved.' }
    }
  },

  fr: {
    translation: {
      nav: { home: 'Accueil', about: 'À propos', services: 'Services', careers: 'Carrières', contact: 'Contact' },
      home: {
        title: 'Codentrix — Conseil Mainframe & IT',
        subtitle: 'COBOL, modernisation et stratégie télécom pour banques et entreprises',
        primary: 'Parler à un expert',
        secondary: 'Explorer les services',
        proof: ['20+ migrations d\'entreprises','Spécialistes des systèmes réglementés','Présence régionale — MENA & UE'],
        teamTitle: 'Direction & stratégie',
        teamLead: 'Une équipe dirigeante expérimentée délivrant des programmes de modernisation à grande échelle.'
      },

      about: {
        title: 'À propos de Codentrix',
        description: 'Codentrix propose du conseil spécialisé, du développement sur mesure, de la formation et la maintenance pour les applications mainframe critiques et les solutions télécom. Notre mission est d\'aider les institutions dans la banque, la finance et les télécoms à se moderniser tout en préservant la continuité et la conformité.',
        leadershipTitle: 'Direction',
        leadershipLead: 'Notre équipe dirigeante apporte des décennies d\'expérience pratique en modernisation des systèmes bancaires centraux, paiements et systèmes réglementés.',
        leaders: {
          nader: { lead: 'PDG avec 20+ années à diriger les opérations télécom et technologie en MENA.', back: 'Cadre expérimenté ayant mené des équipes chez Ericsson, Huawei et Siemens. Focus stratégie, P&L et performances.' },
          fethi: { lead: 'Directeur technique (CTO) avec 30+ années en modernisation bancaire.', back: 'Expérimenté dans les migrations de grande échelle, systèmes de paiement et reporting IAS/IFRS.' },
          ahmed: { lead: 'Directeur de la stratégie (CSO) responsable de la stratégie de croissance et des partenariats.', back: 'Stratège chevronné en développement commercial, partenariats et stratégie produit dans les télécoms et la banque.' }
        }
      },

      services: {
        title: 'Services',
        bank: {
          title: 'Banque & Finance',
          lead: 'Expérience approfondie mainframe et core-banking axée sur la modernisation des legacy, la conformité réglementaire et le traitement fiable des transactions. Engagements typiques :',
          points: [
            'Migration et modernisation du core : Matrix, Seneca, IASIRA et migrations NSP/TREND depuis des plateformes legacy (OASI, TREND) vers des stacks modernes.',
            'COBOL & modernisation batch : refactorisation, consolidation online-to-batch, tuning des jobs (JCL) et optimisation des performances.',
            'SEPA/Paiements & règlement : SDD/SCT/SEDA, check-truncation, gestion des devises de règlement et intégration avec des hubs de paiement.',
            'Comptabilité & reporting : implémentations IAS/IFRS et customisations IASIRA pour garantir un reporting financier conforme.',
            'Systèmes de portefeuille & trésorerie : intégrations de gestion de portefeuille, réconciliation et pipelines de reporting réglementaire.',
            'Migration de données & plateformes : migration sécurisée des données, DB2/VSAM/IMS vers des stores modernes, tests de migration et planification du cutover.',
            'Préparation réglementaire & QA : tests de conformité, support d\'audit et continuité opérationnelle pour conversions post-fusion/plateforme.',
            'Conseil & delivery : leadership de projet, coordination des fournisseurs, transitions BPM-to-core et transfert opérationnel guidé par runbooks.'
          ],
          techProfile: 'Profil technologique : COBOL, JCL, MVS, CICS/IMS, VSAM, DB2 ; plateformes et modules : Matrix/NSP, SENECA, IASIRA, check-truncation et moteurs de paiement.'
        },
        telecom: {
          title: 'Télécom',
          lead: 'Stratégie OSS/BSS, planification de la modernisation du réseau et feuilles de route de migration.',
          points: ['Stratégie et transformation OSS/BSS','Planification de la modernisation du réseau','Sélection de fournisseurs et feuilles de route de migration']
        },
        advisory: { title: 'Conseil & Delivery', lead: 'Direction de programme, conformité et transfert opérationnel.' }
      },

      cases: {
        0: { title: 'Migration de système bancaire central', summary: 'Une grande banque a migré son noyau avec un basculement sans interruption et un débit amélioré.' },
        1: { title: 'Modernisation de la plateforme de paiements', summary: 'Consolidation des rails de paiement, accélération des règlements et meilleure conformité.' }
      },

      careers: {
        title: 'Carrières',
        lead: 'Rejoignez Codentrix — nous recrutons des ingénieurs, architectes et experts métiers pour des projets de modernisation à fort impact dans la banque et les télécoms.',
        whyTitle: 'Pourquoi travailler avec nous',
        why: ['Travailler sur des projets de modernisation critiques à grande échelle.','Équipes transverses combinant expertise métier et technique.','Modèle de travail flexible/hybride; opportunités en MENA et UE.','Rémunération compétitive et budget formation.'],
        ctaLead: 'Intéressé ? Envoyez votre CV et une brève note expliquant les postes visés.',
        cta: 'Envoyer le CV'
      },

      contact: {
        title: 'Contact',
        company: 'Codentrix SARL',
        addressLabel: 'Adresse',
  emailLabel: 'Email',
  phoneLabel: 'Téléphone',
  country: 'TUNISIE',
        form: { send: 'Envoyer', name: 'Nom', email: 'Email', message: 'Message' }
      },

      footer: { copy: '© {{year}} Codentrix. Tous droits réservés.' }
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n
