import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: { home: 'Home', about: 'About', services: 'Services', products: 'Products', careers: 'Careers', contact: 'Contact' },
      home: {
        title: 'Codentrix — Technology Solutions for Regulated Industries',
        subtitle: 'COBOL, legacy modernization, strategic advisory, and digital health solutions for banks, insurers and healthcare providers',
        announcement: {
          title: 'NEW:',
          text: 'Introducing our Telehealth Platform — secure, compliant healthcare built with the same expertise that powers banking transformations.',
          link: 'Learn More →'
        },
        telehealth: {
          title: 'Telehealth Platform',
          lead: 'Modern, secure telehealth solution bringing accessible healthcare to MENA.'
        },
        primary: 'Speak with an expert',
        secondary: 'Explore services',
        proof: ['20+ enterprise migrations','Regulated systems specialists','Regional presence — MENA & EU'],
        teamTitle: 'Leadership & Strategy',
        teamLead: 'Seasoned leadership delivering large-scale modernization and strategic advisory for financial institutions.',
        metrics: {
          title: 'Proven Track Record',
          projects: '50+',
          projectsSub: 'Successfully delivered',
          years: '30+',
          yearsSub: 'Combined experience',
          volume: '€500M+',
          volumeSub: 'Processed annually',
          uptime: '99.9%',
          uptimeSub: 'Mission-critical uptime'
        },
        strengths: {
          title: 'Core Capabilities',
          banking: {
            title: 'Banking Excellence',
            desc: 'Deep expertise in core banking systems, payments infrastructure, and regulatory compliance across MENA and European markets.'
          },
          modernization: {
            title: 'Legacy Modernization',
            desc: 'Proven methodologies for migrating COBOL/mainframe systems to modern architectures with zero-downtime transitions.'
          },
          compliance: {
            title: 'Regulatory Compliance',
            desc: 'Specialized knowledge in IAS/IFRS reporting, SEPA compliance, and banking regulations across multiple jurisdictions.'
          },
          strategy: {
            title: 'Strategic Advisory',
            desc: 'Executive-level consulting for digital transformation, technology roadmaps, and organizational change management.'
          }
        },
        cases: {
          title: 'Recent Success Stories'
        }
      },

      about: {
        title: 'About Codentrix',
        description: 'Codentrix delivers specialized consulting, custom development, training and maintenance for critical mainframe applications and strategic advisory. Our mission is to help institutions in banking, finance, and healthcare modernize reliably while keeping business continuity and compliance front and center.',
        expansion: {
          title: 'Portfolio Expansion',
          description: 'Codentrix has expanded from consulting to product development, launching a modern telehealth platform for the MENA region. This demonstrates our commitment to building complete digital solutions for regulated industries, applying the same rigorous standards we bring to banking transformations.'
        },
        leadershipTitle: 'Leadership',
        leadershipLead: 'Our leadership team brings decades of hands-on experience in core banking modernization, payments, and regulated financial systems delivery.',
        leaders: {
          nader: { lead: 'CEO with 20+ years leading telecom and technology operations across MENA.', back: 'Seasoned executive with a track record in regional leadership (Ericsson, Huawei, Siemens). Focused on strategy, P&L responsibility and high-performing teams.' },
          fethi: { lead: 'CTO with 30+ years in core banking modernization, payments and compliance.', back: 'Experienced in large-scale core migrations, payment systems and IAS/IFRS reporting—trusted to deliver compliant, resilient transformations.' },
          ahmed: { lead: 'CSO driving growth strategy, partnerships and product-market fit. PhD in Strategic Management.', back: 'Seasoned strategist with experience in business development, strategic partnerships and product strategy across telecom and banking sectors. 20+ years in program and academic management.' }
        }
      },

      services: {
        title: 'Services',
        intro: 'Comprehensive mainframe and strategic consulting services designed for financial institutions seeking reliable modernization and regulatory compliance.',
        bank: {
          title: 'Banking & Finance',
          lead: 'Deep mainframe and core-banking experience focused on legacy modernization, regulatory compliance and reliable transaction processing.',
          detailedTitle: 'Typical Engagements',
          techTitle: 'Technology Profile',
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
          techProfile: 'Technology profile: COBOL, JCL, MVS, CICS/IMS, VSAM, DB2; platforms and modules: Matrix/NSP, SENECA, IASIRA, check-truncation and payment engines.',
          capabilities: {
            core: {
              title: 'Core Banking Systems',
              desc: 'End-to-end modernization of legacy core banking platforms with zero-downtime migrations and improved performance.'
            },
            payments: {
              title: 'Payments & Settlement',
              desc: 'SEPA compliance, real-time payments integration, and settlement optimization for multi-currency environments.'
            },
            reporting: {
              title: 'Financial Reporting',
              desc: 'IAS/IFRS compliance implementations and automated regulatory reporting solutions for audit readiness.'
            },
            migration: {
              title: 'Data Migration',
              desc: 'Secure, tested migration of critical financial data from legacy systems to modern cloud and on-premise platforms.'
            }
          }
        },
        advisory: {
          title: 'Strategic Advisory',
          lead: 'Executive-level consulting for digital transformation, technology roadmaps, and organizational change management.',
          capabilities: {
            strategy: {
              title: 'Digital Strategy',
              desc: 'Comprehensive digital transformation roadmaps aligned with business objectives and regulatory requirements.'
            },
            leadership: {
              title: 'Program Leadership',
              desc: 'Seasoned project management and team leadership for complex, multi-stakeholder technology initiatives.'
            },
            compliance: {
              title: 'Compliance & Risk',
              desc: 'Risk assessment, regulatory alignment, and audit preparation for financial technology implementations.'
            },
            delivery: {
              title: 'Delivery Excellence',
              desc: 'Proven methodologies for successful project delivery, change management, and operational handover.'
            }
          }
        }
      },

      products: {
        badge: 'NEW OFFERING',
        telehealth: {
          title: 'Telehealth Platform',
          subtitle: 'Secure, compliant, and accessible healthcare for the MENA region',
          tagline: 'Built by the team trusted to modernize banking systems — bringing the same reliability and compliance to healthcare',
          cta: {
            primary: 'Request a Demo',
            secondary: 'Explore Features'
          },
          problem: {
            title: 'The Challenge',
            description: 'Healthcare accessibility remains a significant challenge across MENA. Long wait times, geographic barriers, and fragmented medical records limit patient care and provider efficiency.'
          },
          solution: {
            title: 'Our Solution',
            description: 'A comprehensive telehealth platform that connects patients with healthcare providers through secure video consultations, digital prescriptions, appointment management, and centralized medical records.'
          },
          featuresTitle: 'Platform Features',
          features: [
            {
              icon: '📹',
              title: 'Video Consultations',
              description: 'High-quality, secure video calls connecting patients with doctors in real-time, powered by WebRTC technology.'
            },
            {
              icon: '📅',
              title: 'Appointment Management',
              description: 'Streamlined booking system for patients and scheduling tools for healthcare providers with automated reminders.'
            },
            {
              icon: '💊',
              title: 'Digital Prescriptions',
              description: 'Electronic prescription generation and management, integrated with pharmacies for seamless medication fulfillment.'
            },
            {
              icon: '📋',
              title: 'Medical Records',
              description: 'Centralized, secure patient health records accessible to authorized providers with complete audit trails.'
            },
            {
              icon: '🔔',
              title: 'Smart Notifications',
              description: 'Automated reminders for appointments, medication schedules, and follow-up care to improve patient outcomes.'
            },
            {
              icon: '📊',
              title: 'Analytics Dashboard',
              description: 'Comprehensive insights for healthcare providers to track patient engagement, consultation metrics, and operational efficiency.'
            }
          ],
          benefitsTitle: 'Who Benefits',
          benefits: {
            providersTitle: 'For Healthcare Providers',
            providers: [
              'Expand patient reach beyond physical location',
              'Reduce no-shows with automated reminders',
              'Streamline administrative workflows',
              'Access complete patient history instantly',
              'Improve operational efficiency and revenue'
            ],
            patientsTitle: 'For Patients',
            patients: [
              'Access quality healthcare from anywhere',
              'Eliminate travel time and waiting rooms',
              'Secure storage of all medical records',
              'Easy prescription management',
              'Affordable and convenient care'
            ]
          },
          tech: {
            title: 'Built with Modern Technology',
            description: 'Our telehealth platform leverages cutting-edge technology while maintaining the security and compliance standards required in regulated healthcare environments.',
            modern: 'Modern Stack',
            secure: 'Security & Compliance'
          },
          connection: {
            title: 'The Codentrix Difference',
            description: 'Built by the team that modernizes mission-critical banking systems across MENA and Europe, our telehealth platform brings the same rigor to healthcare.',
            point1: 'Bank-grade security and encryption',
            point2: 'Deep expertise in regulated industries',
            point3: 'Proven track record of reliable, compliant systems'
          },
          finalCta: {
            title: 'Ready to Transform Healthcare Delivery?',
            description: 'Contact us to schedule a demo and learn how our telehealth platform can expand your reach and improve patient care.',
            button: 'Get in Touch'
          }
        }
      },

      cases: {
        0: { title: 'Core banking migration', summary: 'Large bank migrated core systems with zero-downtime cutover and improved throughput.' },
        1: { title: 'Payments platform modernization', summary: 'Payment rails consolidated, enabling faster settlement and improved compliance.' }
      },

      careers: {
        title: 'Careers',
        lead: 'Join Codentrix — we hire experienced engineers, architects and domain experts who want to work on high-impact modernization and advisory projects in banking and finance.',
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
      nav: { home: 'Accueil', about: 'À propos', services: 'Services', products: 'Produits', careers: 'Carrières', contact: 'Contact' },
      home: {
        title: 'Codentrix — Solutions Technologiques pour Industries Réglementées',
        subtitle: 'COBOL, modernisation legacy, conseil stratégique et solutions de santé numérique pour banques, assureurs et prestataires de santé',
        announcement: {
          title: 'NOUVEAU:',
          text: 'Découvrez notre plateforme de télésanté — soins sécurisés et conformes construits avec la même expertise qui transforme les systèmes bancaires.',
          link: 'En savoir plus →'
        },
        telehealth: {
          title: 'Plateforme de Télésanté',
          lead: 'Solution de télésanté moderne et sécurisée pour une santé accessible en MENA.'
        },
        primary: 'Parler à un expert',
        secondary: 'Explorer les services',
        proof: ['20+ migrations d\'entreprises','Spécialistes des systèmes réglementés','Présence régionale — MENA & UE'],
        teamTitle: 'Direction & stratégie',
        teamLead: 'Une équipe dirigeante expérimentée délivrant des programmes de modernisation et de conseil stratégique pour institutions financières.',
        metrics: {
          title: 'Références Éprouvées',
          projects: '50+',
          projectsSub: 'Livrés avec succès',
          years: '30+',
          yearsSub: 'Expérience combinée',
          volume: '€500M+',
          volumeSub: 'Traité annuellement',
          uptime: '99.9%',
          uptimeSub: 'Disponibilité critique'
        },
        strengths: {
          title: 'Capacités Centrales',
          banking: {
            title: 'Excellence Bancaire',
            desc: 'Expertise approfondie des systèmes bancaires centraux, infrastructures de paiement et conformité réglementaire en MENA et Europe.'
          },
          modernization: {
            title: 'Modernisation Legacy',
            desc: 'Méthodologies éprouvées pour migrer les systèmes COBOL/mainframe vers des architectures modernes avec transitions sans interruption.'
          },
          compliance: {
            title: 'Conformité Réglementaire',
            desc: 'Connaissance spécialisée du reporting IAS/IFRS, conformité SEPA et réglementations bancaires multi-juridictionnelles.'
          },
          strategy: {
            title: 'Conseil Stratégique',
            desc: 'Conseil de niveau exécutif pour transformation digitale, feuilles de route technologiques et gestion du changement organisationnel.'
          }
        },
        cases: {
          title: 'Réussites Récentes'
        }
      },

      about: {
        title: 'À propos de Codentrix',
        description: 'Codentrix propose du conseil spécialisé, du développement sur mesure, de la formation et la maintenance pour les applications mainframe critiques et le conseil stratégique. Notre mission est d\'aider les institutions dans la banque, la finance et la santé à se moderniser tout en préservant la continuité et la conformité.',
        expansion: {
          title: 'Expansion du Portefeuille',
          description: 'Codentrix est passé du conseil au développement de produits, lançant une plateforme moderne de télésanté pour la région MENA. Cela démontre notre engagement à construire des solutions numériques complètes pour les industries réglementées, en appliquant les mêmes normes rigoureuses que nous apportons aux transformations bancaires.'
        },
        leadershipTitle: 'Direction',
        leadershipLead: 'Notre équipe dirigeante apporte des décennies d\'expérience pratique en modernisation des systèmes bancaires centraux, paiements et systèmes réglementés.',
        leaders: {
          nader: { lead: 'PDG avec 20+ années à diriger les opérations télécom et technologie en MENA.', back: 'Cadre expérimenté ayant mené des équipes chez Ericsson, Huawei et Siemens. Focus stratégie, P&L et performances.' },
          fethi: { lead: 'Directeur technique (CTO) avec 30+ années en modernisation bancaire.', back: 'Expérimenté dans les migrations de grande échelle, systèmes de paiement et reporting IAS/IFRS.' },
          ahmed: { lead: 'Directeur de la stratégie (CSO) responsable de la stratégie de croissance et des partenariats. Docteur en management stratégique.', back: 'Stratège chevronné en développement commercial, partenariats et stratégie produit dans les télécoms et la banque. Plus de 20 ans dans la gestion de programmes et la direction académique.' }
        }
      },

      services: {
        title: 'Services',
        intro: 'Services complets de conseil mainframe et stratégique conçus pour les institutions financières recherchant une modernisation fiable et la conformité réglementaire.',
        bank: {
          title: 'Banque & Finance',
          lead: 'Expérience approfondie mainframe et core-banking axée sur la modernisation des legacy, la conformité réglementaire et le traitement fiable des transactions.',
          detailedTitle: 'Engagements Typiques',
          techTitle: 'Profil Technologique',
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
          techProfile: 'Profil technologique : COBOL, JCL, MVS, CICS/IMS, VSAM, DB2 ; plateformes et modules : Matrix/NSP, SENECA, IASIRA, check-truncation et moteurs de paiement.',
          capabilities: {
            core: {
              title: 'Systèmes Bancaires Centraux',
              desc: 'Modernisation complète des plateformes bancaires legacy avec migrations sans interruption et performances améliorées.'
            },
            payments: {
              title: 'Paiements & Règlement',
              desc: 'Conformité SEPA, intégration de paiements temps-réel et optimisation des règlements multi-devises.'
            },
            reporting: {
              title: 'Reporting Financier',
              desc: 'Implémentations de conformité IAS/IFRS et solutions de reporting réglementaire automatisé pour préparation aux audits.'
            },
            migration: {
              title: 'Migration de Données',
              desc: 'Migration sécurisée et testée de données financières critiques des systèmes legacy vers des plateformes cloud et on-premise modernes.'
            }
          }
        },
        advisory: {
          title: 'Conseil Stratégique',
          lead: 'Conseil de niveau exécutif pour transformation digitale, feuilles de route technologiques et gestion du changement organisationnel.',
          capabilities: {
            strategy: {
              title: 'Stratégie Digitale',
              desc: 'Feuilles de route complètes de transformation digitale alignées avec les objectifs métier et exigences réglementaires.'
            },
            leadership: {
              title: 'Leadership de Programme',
              desc: 'Gestion de projet expérimentée et leadership d\'équipe pour initiatives technologiques complexes multi-parties prenantes.'
            },
            compliance: {
              title: 'Conformité & Risque',
              desc: 'Évaluation des risques, alignement réglementaire et préparation aux audits pour implémentations technologiques financières.'
            },
            delivery: {
              title: 'Excellence en Livraison',
              desc: 'Méthodologies éprouvées pour livraison de projet réussie, gestion du changement et transfert opérationnel.'
            }
          }
        }
      },

      products: {
        badge: 'NOUVELLE OFFRE',
        telehealth: {
          title: 'Plateforme de Télésanté',
          subtitle: 'Soins de santé sécurisés, conformes et accessibles pour la région MENA',
          tagline: 'Construite par l\'équipe qui modernise les systèmes bancaires — apportant la même fiabilité et conformité à la santé',
          cta: {
            primary: 'Demander une Démo',
            secondary: 'Explorer les Fonctionnalités'
          },
          problem: {
            title: 'Le Défi',
            description: 'L\'accessibilité aux soins de santé reste un défi majeur en MENA. Les longs délais d\'attente, les barrières géographiques et les dossiers médicaux fragmentés limitent les soins aux patients et l\'efficacité des prestataires.'
          },
          solution: {
            title: 'Notre Solution',
            description: 'Une plateforme complète de télésanté qui connecte les patients aux prestataires de soins via des consultations vidéo sécurisées, des prescriptions numériques, la gestion des rendez-vous et des dossiers médicaux centralisés.'
          },
          featuresTitle: 'Fonctionnalités de la Plateforme',
          features: [
            {
              icon: '📹',
              title: 'Consultations Vidéo',
              description: 'Appels vidéo sécurisés de haute qualité connectant patients et médecins en temps réel, propulsés par la technologie WebRTC.'
            },
            {
              icon: '📅',
              title: 'Gestion des Rendez-vous',
              description: 'Système de réservation rationalisé pour les patients et outils de planification pour les prestataires avec rappels automatiques.'
            },
            {
              icon: '💊',
              title: 'Prescriptions Numériques',
              description: 'Génération et gestion électroniques des prescriptions, intégrées aux pharmacies pour une exécution fluide des médicaments.'
            },
            {
              icon: '📋',
              title: 'Dossiers Médicaux',
              description: 'Dossiers de santé centralisés et sécurisés accessibles aux prestataires autorisés avec pistes d\'audit complètes.'
            },
            {
              icon: '🔔',
              title: 'Notifications Intelligentes',
              description: 'Rappels automatiques pour les rendez-vous, les horaires de médication et les soins de suivi pour améliorer les résultats des patients.'
            },
            {
              icon: '📊',
              title: 'Tableau de Bord Analytique',
              description: 'Informations complètes pour les prestataires de soins pour suivre l\'engagement des patients, les métriques de consultation et l\'efficacité opérationnelle.'
            }
          ],
          benefitsTitle: 'Qui en Bénéficie',
          benefits: {
            providersTitle: 'Pour les Prestataires de Soins',
            providers: [
              'Élargir la portée des patients au-delà du lieu physique',
              'Réduire les absences avec des rappels automatiques',
              'Rationaliser les flux de travail administratifs',
              'Accéder instantanément à l\'historique complet du patient',
              'Améliorer l\'efficacité opérationnelle et les revenus'
            ],
            patientsTitle: 'Pour les Patients',
            patients: [
              'Accéder à des soins de qualité de n\'importe où',
              'Éliminer les temps de trajet et les salles d\'attente',
              'Stockage sécurisé de tous les dossiers médicaux',
              'Gestion facile des prescriptions',
              'Soins abordables et pratiques'
            ]
          },
          tech: {
            title: 'Construit avec une Technologie Moderne',
            description: 'Notre plateforme de télésanté exploite une technologie de pointe tout en maintenant les normes de sécurité et de conformité requises dans les environnements de soins de santé réglementés.',
            modern: 'Stack Moderne',
            secure: 'Sécurité & Conformité'
          },
          connection: {
            title: 'La Différence Codentrix',
            description: 'Construite par l\'équipe qui modernise les systèmes bancaires critiques en MENA et en Europe, notre plateforme de télésanté apporte la même rigueur aux soins de santé.',
            point1: 'Sécurité et cryptage de niveau bancaire',
            point2: 'Expertise approfondie des industries réglementées',
            point3: 'Antécédents prouvés de systèmes fiables et conformes'
          },
          finalCta: {
            title: 'Prêt à Transformer la Prestation de Soins?',
            description: 'Contactez-nous pour planifier une démo et découvrir comment notre plateforme de télésanté peut élargir votre portée et améliorer les soins aux patients.',
            button: 'Contactez-nous'
          }
        }
      },

      cases: {
        0: { title: 'Migration de système bancaire central', summary: 'Une grande banque a migré son noyau avec un basculement sans interruption et un débit amélioré.' },
        1: { title: 'Modernisation de la plateforme de paiements', summary: 'Consolidation des rails de paiement, accélération des règlements et meilleure conformité.' }
      },

      careers: {
        title: 'Carrières',
        lead: 'Rejoignez Codentrix — nous recrutons des ingénieurs, architectes et experts métiers pour des projets de modernisation et de conseil à fort impact dans la banque et la finance.',
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
