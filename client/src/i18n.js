import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home', about: 'About', services: 'Services', products: 'Products', careers: 'Careers', contact: 'Contact',
        primary: 'Main', skipToContent: 'Skip to content', toggleMenu: 'Menu', switchLanguage: 'Passer en français'
      },
      home: {
        title: 'Codentrix — Healthcare Expertise, Applied AI',
        subtitle: 'Clinical and post-market studies, advisory and AI training for pharmaceutical companies and public-health institutions, and AI workflow automation for any organisation.',
        telehealth: {
          title: 'Healthcare Products',
          lead: 'SehatyNet for telehealth, MedForm Pro for clinical studies and MedForm Marketing for post-market surveys.'
        },
        primary: 'Speak with an expert',
        secondary: 'Explore services',
        teamTitle: 'Leadership & Strategy',
        teamLead: 'Expert leadership delivering cutting-edge AI automation and strategic transformation.',
        strengths: {
          title: 'What we do'
        },
        cases: {
          eyebrow: 'Case studies',
          title: 'Recent Success Stories',
          more: 'Learn more'
        }
      },

      about: {
        title: 'About Codentrix',
        description: 'Codentrix is a Tunisian company that helps pharmaceutical companies, public-health institutions and other organisations run studies, build capability and apply AI. We build our own software, SehatyNet, MedForm Pro and MedForm Marketing, and bring the same practice to client work.',
        expansion: {
          title: 'Our Products',
          description: 'Codentrix builds software for regulated healthcare: SehatyNet for telehealth, MedForm Pro for clinical studies and MedForm Marketing for post-market surveys. We focus on solving real-world problems with precision and care.'
        },
        leadershipTitle: 'Leadership',
        leadershipLead: 'Our leadership team combines deep technical expertise in AI with strategic vision for healthcare transformation.',
        leaders: {
          nader: { lead: 'CEO & Tech Visionary - 20+ years driving technology innovation in MENA.', back: 'Expert in scaling tech operations and leading high-performance teams at global giants like Ericsson and Huawei.' },
          ahmed: { lead: 'CSO - Strategy & Growth. PhD in Strategic Management.', back: 'Driving partnerships and product-market fit for AI healthcare solutions across telecom and enterprise sectors.' },
          more: 'Full profile',
          less: 'Less'
        }
      },

      services: {
        title: 'Services',
        intro: 'Codentrix supports pharmaceutical companies and public-health institutions in Tunisia with clinical and post-market studies, advisory work and AI training.',
        includesTitle: 'What this includes',
        studies: {
          title: 'Clinical and post-market studies',
          lead: 'We design and run clinical, observational and post-market studies on our own MedForm platform, from questionnaire to final report.',
          points: [
            'Study design and questionnaire build, including from a protocol.',
            'Data collection from investigators and physicians.',
            'Statistical analysis and reporting.',
            'Expert-consensus (Delphi) studies.'
          ]
        },
        advisory: {
          title: 'Public-health and pharma advisory',
          lead: 'Independent assessments and structured recommendations for institutions and companies in regulated health sectors.',
          points: [
            'As-is assessments and landscape mapping.',
            'Regulatory and stakeholder analysis.',
            'Deliverable-based consulting, with revision and sign-off cycles.',
            'Stakeholder workshops and consultations.'
          ]
        },
        training: {
          title: 'AI training for teams',
          lead: 'Hands-on training that gets teams using AI tools in their daily work.',
          points: [
            'A curriculum built around your sector and roles.',
            'Practical workshops on AI assistants and workflow tools.',
            'Training materials and assessments.',
            'On-site delivery.'
          ]
        },
        automation: {
          title: 'Workflow automation and applied AI',
          lead: 'We automate repetitive and document-heavy processes with AI and workflow tools, and connect them to the systems you already use.',
          points: [
            'Process mapping and automation design.',
            'Document and data processing with language models.',
            'Integration with existing tools.',
            'Handover and team training.'
          ]
        },
        band: { title: 'Prefer ready-made software?', lead: 'See SehatyNet, MedForm Pro and MedForm Marketing.', button: 'View products' }
      },

      products: {
        badge: 'SEHATYNET',
        overview: {
          title: 'Products',
          lead: 'Software for clinical research, post-market surveillance and connected care.',
          more: 'Learn more',
          cards: {
            sehatynet: { name: 'SehatyNet', kind: 'Telehealth platform', desc: 'Video consultations, e-prescriptions, appointments and medical records in one place.' },
            medformPro: { name: 'MedForm Pro', kind: 'Clinical study data capture', desc: 'Electronic case report forms with randomisation, audit trail and statistical analysis.' },
            medformMarketing: { name: 'MedForm Marketing', kind: 'Post-market surveys and physician research', desc: 'Design and run post-market surveys and market research with physicians, with AI-assisted insights.' }
          }
        },
        detail: {
          featuresTitle: 'Key features',
          ctaPrimary: 'Request a Demo',
          ctaSecondary: 'Explore Features',
          finalTitle: 'See it in action',
          finalDescription: 'Contact us to schedule a demo.',
          finalButton: 'Get in Touch'
        },
        medformPro: {
          title: 'MedForm Pro',
          subtitle: 'Electronic data capture for clinical studies in Tunisia.',
          features: [
            { title: 'Protocol to eCRF', description: 'Upload a study protocol (.docx or .pdf) and AI drafts the questionnaire for you to review and edit.' },
            { title: 'Study designs', description: 'Observational, interventional and cross-sectional studies, with repeating sections for multi-visit schedules such as D0, D15 and M1.' },
            { title: 'Randomisation and blinding', description: 'Simple, block and stratified randomisation, with single and double blinding and emergency unblinding.' },
            { title: 'Data integrity', description: 'Draft, submitted and locked states, plus a field-level audit trail recording every edit with reason, time and IP address.' },
            { title: 'Analysis and reporting', description: 'Descriptive statistics, survival analysis and cross-tabulation, with CSV, Excel, PDF and DOCX export.' },
            { title: 'Built for Tunisia', description: 'English and French throughout, separate workspaces per sponsor, and designed with Tunisian Law No. 2004-63 and GDPR in mind.' },
            { title: 'Expert consensus (Delphi) studies', description: 'Run multi-round Delphi studies in the same platform. Experts stay anonymous, consensus is measured per question (median, IQR and percentage agreement), AI summarises open-ended answers between rounds, and a one-click DOCX report presents the findings.' }
          ]
        },
        medformMarketing: {
          title: 'MedForm Marketing',
          subtitle: 'Post-market surveys and physician research, designed and analysed with AI.',
          features: [
            { title: 'From prompt to survey', description: 'Describe a post-market surveillance question and AI generates the study.' },
            { title: 'Research workflows', description: 'NPS, competitive analysis and market research.' },
            { title: 'AI-assisted analysis', description: 'Sentiment scoring, theme extraction and executive summaries.' },
            { title: 'Live dashboards', description: 'Enrolment, specialty and regional views, plus cross-tabulation.' },
            { title: 'Export', description: 'CSV and Excel.' },
            { title: 'Bilingual and multi-tenant', description: 'English and French, with separate workspaces per company.' }
          ]
        },
        telehealth: {
          title: 'AI-Powered Telehealth',
          subtitle: 'The future of connected care in the MENA region',
          tagline: 'Intelligent, secure, and accessible healthcare powered by advanced AI diagnostic support.',
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
              icon: '🧠',
              title: 'AI Smart Triage',
              description: 'Intelligent symptom checker assists patients to the right care path instantly using NLP.'
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
            description: 'Our platform integrates state-of-the-art AI models for decision support, ensuring that technology enhances the human touch in healthcare.',
            modern: 'Modern Stack',
            secure: 'Security & Compliance'
          },
          connection: {
            title: 'The Codentrix Difference',
            description: 'We don’t just digitize healthcare; we make it intelligent. Our AI models are trained to assist, not replace, ensuring better outcomes.',
            point1: 'AI-Enhanced Decision Support',
            point2: 'Automated Administrative Workflows',
            point3: 'Secure Cloud-Native Architecture'
          },
          finalCta: {
            title: 'Ready to Transform Healthcare Delivery?',
            description: 'Contact us to schedule a demo and learn how our telehealth platform can expand your reach and improve patient care.',
            button: 'Get in Touch'
          }
        }
      },

      cases: {
        0: { title: 'Clinical data capture, end to end', summary: 'A Tunisian pharmaceutical sponsor runs a live clinical study on MedForm Pro, our eCRF platform. Investigators enter data online, every change is audit-trailed, and statistical analysis is built in.' },
        1: { title: 'Post-market feedback from physicians', summary: 'A pharmaceutical company collects structured post-market feedback from physicians with MedForm Marketing, with AI-assisted insights on the responses.' }
      },

      careers: {
        title: 'Careers',
        lead: 'Codentrix is a small team working remotely from Tunisia. We take on interns and project collaborators in AI, data and healthcare research, and we read every spontaneous application.',
        whyTitle: 'Why work with us',
        why: ['Real projects: studies, advisory deliverables and software for pharmaceutical and public-health clients.', 'Direct access to the founder, with real responsibility from the first week.', 'Remote by default: we work from home, so what you deliver matters more than where you sit.', 'Hands-on learning in AI, data and clinical research.'],
        ctaLead: 'Interested? Send your CV and a short note explaining what you would like to work on.',
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

      forms: {
        required: 'This field is required.',
        invalidEmail: 'Enter a valid email address.',
        sending: 'Sending…',
        contactSent: 'Thanks — your message is on its way.',
        contactError: 'We could not send your message. Please try again, or email contact@codentrix.io directly.'
      },

      apply: {
        title: 'Send your CV',
        lead: 'Fill in the form and attach your CV. We review every application and get back to you about next steps.',
        submit: 'Submit application',
        sent: 'Application received — thank you. We will be in touch.',
        error: 'We could not send your application. Please try again, or email career@codentrix.io directly.',
        fields: {
          phone: 'Phone',
          education: 'Education',
          experience: 'Experience summary'
        },
        file: {
          label: 'Attach your CV',
          prompt: 'Drop your CV here, or click to browse',
          hint: 'PDF or Word, up to 10 MB',
          remove: 'Remove file',
          missing: 'Please attach your CV.',
          tooLarge: 'That file is larger than 10 MB. Please attach a smaller one.'
        }
      },

      footer: {
        copy: '© {{year}} Codentrix. All rights reserved.',
        eyebrow: 'Get in touch',
        pitch: 'Tell us what you want to automate. We will tell you what it takes.',
        siteNav: 'Site'
      }
    }
  },

  fr: {
    translation: {
      nav: {
        home: 'Accueil', about: 'À propos', services: 'Services', products: 'Produits', careers: 'Carrières', contact: 'Contact',
        primary: 'Principal', skipToContent: 'Aller au contenu', toggleMenu: 'Menu', switchLanguage: 'Switch to English'
      },
      home: {
        title: 'Codentrix — Expertise santé, IA appliquée',
        subtitle: 'Études cliniques et post-commercialisation, conseil et formation à l\'IA pour les entreprises pharmaceutiques et les institutions de santé publique, et automatisation des workflows par l\'IA pour toute organisation.',
        telehealth: {
          title: 'Produits de santé',
          lead: 'SehatyNet pour la télésanté, MedForm Pro pour les études cliniques et MedForm Marketing pour les enquêtes post-commercialisation.'
        },
        primary: 'Parler à un expert',
        secondary: 'Explorer les services',
        teamTitle: 'Direction & stratégie',
        teamLead: 'Leadership expert délivrant une automatisation IA de pointe et une transformation stratégique.',
        strengths: {
          title: 'Ce que nous faisons'
        },
        cases: {
          eyebrow: 'Études de cas',
          title: 'Réussites Récentes',
          more: 'En savoir plus'
        }
      },

      about: {
        title: 'À propos de Codentrix',
        description: 'Codentrix est une entreprise tunisienne qui aide les entreprises pharmaceutiques, les institutions de santé publique et d\'autres organisations à mener des études, développer leurs compétences et appliquer l\'IA. Nous développons nos propres logiciels, SehatyNet, MedForm Pro et MedForm Marketing, et appliquons la même pratique aux missions clients.',
        expansion: {
          title: 'Nos produits',
          description: 'Codentrix conçoit des logiciels pour la santé réglementée : SehatyNet pour la télésanté, MedForm Pro pour les études cliniques et MedForm Marketing pour les enquêtes post-commercialisation. Nous nous attachons à résoudre des problèmes concrets avec précision et rigueur.'
        },
        leadershipTitle: 'Direction',
        leadershipLead: 'Notre équipe dirigeante combine une expertise technique approfondie en IA avec une vision stratégique pour la transformation de la santé.',
        leaders: {
          nader: { lead: 'PDG & Visionnaire Tech - 20+ ans menant l\'innovation technologique en MENA.', back: 'Expert en passage à l\'échelle des opérations tech et direction d\'équipes haute performance chez des géants mondiaux comme Ericsson et Huawei.' },
          ahmed: { lead: 'CSO - Stratégie & Croissance. Docteur en Management Stratégique.', back: 'Pilotage des partenariats et du product-market fit pour les solutions de santé IA dans les secteurs télécom et entreprise.' },
          more: 'Profil complet',
          less: 'Réduire'
        }
      },

      services: {
        title: 'Services',
        intro: 'Codentrix accompagne les entreprises pharmaceutiques et les institutions de santé publique en Tunisie : études cliniques et post-commercialisation, conseil et formation à l\'IA.',
        includesTitle: 'Ce que cela comprend',
        studies: {
          title: 'Études cliniques et post-commercialisation',
          lead: 'Nous concevons et menons des études cliniques, observationnelles et post-commercialisation sur notre plateforme MedForm, du questionnaire au rapport final.',
          points: [
            'Conception de l\'étude et construction du questionnaire, y compris à partir d\'un protocole.',
            'Collecte des données auprès des investigateurs et des médecins.',
            'Analyse statistique et rapports.',
            'Études de consensus d\'experts (Delphi).'
          ]
        },
        advisory: {
          title: 'Conseil en santé publique et pharma',
          lead: 'Des évaluations indépendantes et des recommandations structurées pour les institutions et entreprises des secteurs de santé réglementés.',
          points: [
            'Évaluations de l\'existant (as-is) et cartographie du paysage.',
            'Analyse réglementaire et des parties prenantes.',
            'Conseil par livrables, avec cycles de révision et de validation.',
            'Ateliers et consultations avec les parties prenantes.'
          ]
        },
        training: {
          title: 'Formation à l\'IA pour les équipes',
          lead: 'Une formation pratique pour que les équipes utilisent les outils d\'IA au quotidien.',
          points: [
            'Un programme construit autour de votre secteur et de vos métiers.',
            'Ateliers pratiques sur les assistants IA et les outils de workflow.',
            'Supports de formation et évaluations.',
            'Animation sur site.'
          ]
        },
        automation: {
          title: 'Automatisation des workflows et IA appliquée',
          lead: 'Nous automatisons les processus répétitifs et documentaires avec l\'IA et des outils de workflow, et nous les connectons aux systèmes que vous utilisez déjà.',
          points: [
            'Cartographie des processus et conception de l\'automatisation.',
            'Traitement de documents et de données avec des modèles de langage.',
            'Intégration avec vos outils existants.',
            'Transfert et formation des équipes.'
          ]
        },
        band: { title: 'Vous préférez un logiciel prêt à l\'emploi ?', lead: 'Découvrez SehatyNet, MedForm Pro et MedForm Marketing.', button: 'Voir les produits' }
      },

      products: {
        badge: 'SEHATYNET',
        overview: {
          title: 'Produits',
          lead: 'Des logiciels pour la recherche clinique, la surveillance post-commercialisation et les soins connectés.',
          more: 'En savoir plus',
          cards: {
            sehatynet: { name: 'SehatyNet', kind: 'Plateforme de télésanté', desc: 'Consultations vidéo, e-prescriptions, rendez-vous et dossiers médicaux au même endroit.' },
            medformPro: { name: 'MedForm Pro', kind: 'Collecte de données pour études cliniques', desc: 'Cahiers d\'observation électroniques avec randomisation, piste d\'audit et analyse statistique.' },
            medformMarketing: { name: 'MedForm Marketing', kind: 'Enquêtes post-commercialisation et recherche auprès des médecins', desc: 'Concevez et menez des enquêtes post-commercialisation et des études de marché auprès des médecins, avec des analyses assistées par l\'IA.' }
          }
        },
        detail: {
          featuresTitle: 'Fonctionnalités clés',
          ctaPrimary: 'Demander une Démo',
          ctaSecondary: 'Explorer les Fonctionnalités',
          finalTitle: 'Voyez-le en action',
          finalDescription: 'Contactez-nous pour planifier une démonstration.',
          finalButton: 'Nous contacter'
        },
        medformPro: {
          title: 'MedForm Pro',
          subtitle: 'La saisie électronique de données pour les études cliniques en Tunisie.',
          features: [
            { title: 'De la note de protocole à l\'eCRF', description: 'Téléversez un protocole d\'étude (.docx ou .pdf) : l\'IA rédige le questionnaire, que vous relisez et modifiez.' },
            { title: 'Plans d\'étude', description: 'Études observationnelles, interventionnelles et transversales, avec des sections répétées pour les calendriers multi-visites (J0, J15, M1, etc.).' },
            { title: 'Randomisation et insu', description: 'Randomisation simple, par blocs et stratifiée ; simple et double insu, avec levée d\'insu en urgence.' },
            { title: 'Intégrité des données', description: 'États brouillon, soumis et verrouillé, et piste d\'audit au niveau du champ qui enregistre chaque modification avec son motif, l\'heure et l\'adresse IP.' },
            { title: 'Analyse et rapports', description: 'Statistiques descriptives, analyse de survie et tableaux croisés, avec export CSV, Excel, PDF et DOCX.' },
            { title: 'Conçu pour la Tunisie', description: 'Anglais et français partout, espaces de travail séparés par promoteur, et conçu en tenant compte de la loi tunisienne n° 2004-63 et du RGPD.' },
            { title: 'Études de consensus d\'experts (Delphi)', description: 'Menez des études Delphi en plusieurs tours dans la même plateforme. Les experts restent anonymes, le consensus est mesuré par question (médiane, écart interquartile et pourcentage d\'accord), l\'IA résume les réponses ouvertes entre les tours, et un rapport DOCX en un clic présente les conclusions.' }
          ]
        },
        medformMarketing: {
          title: 'MedForm Marketing',
          subtitle: 'Enquêtes post-commercialisation et recherche auprès des médecins, conçues et analysées avec l\'IA.',
          features: [
            { title: 'Du brief à l\'enquête', description: 'Décrivez une question de surveillance post-commercialisation : l\'IA génère l\'étude.' },
            { title: 'Workflows de recherche', description: 'NPS, analyse concurrentielle et études de marché.' },
            { title: 'Analyse assistée par l\'IA', description: 'Score de sentiment, extraction de thèmes et synthèses exécutives.' },
            { title: 'Tableaux de bord en direct', description: 'Inclusions, spécialités et vues régionales, plus tableaux croisés.' },
            { title: 'Export', description: 'CSV et Excel.' },
            { title: 'Bilingue et multi-locataire', description: 'Anglais et français, avec des espaces de travail séparés par entreprise.' }
          ]
        },
        telehealth: {
          title: 'Télésanté Propulsée par IA',
          subtitle: 'Le futur des soins connectés dans la région MENA',
          tagline: 'Des soins de santé intelligents, sécurisés et accessibles propulsés par un support diagnostique IA avancé.',
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
              icon: '🧠',
              title: 'Triage Intelligent IA',
              description: 'Vérificateur de symptômes intelligent qui oriente les patients vers le bon parcours de soins instantanément grâce au NLP.'
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
            description: 'Notre plateforme intègre des modèles IA de pointe pour l\'aide à la décision, garantissant que la technologie améliore la touche humaine dans les soins de santé.',
            modern: 'Stack Moderne',
            secure: 'Sécurité & Conformité'
          },
          connection: {
            title: 'La Différence Codentrix',
            description: 'Nous ne faisons pas que numériser la santé ; nous la rendons intelligente. Nos modèles IA sont entraînés pour assister, pas remplacer, garantissant de meilleurs résultats.',
            point1: 'Aide à la Décision Enrichie par IA',
            point2: 'Flux Administratifs Automatisés',
            point3: 'Architecture Cloud-Native Sécurisée'
          },
          finalCta: {
            title: 'Prêt à Transformer la Prestation de Soins?',
            description: 'Contactez-nous pour planifier une démo et découvrir comment notre plateforme de télésanté peut élargir votre portée et améliorer les soins aux patients.',
            button: 'Contactez-nous'
          }
        }
      },

      cases: {
        0: { title: 'La collecte de données cliniques, de bout en bout', summary: 'Un promoteur pharmaceutique tunisien conduit une étude clinique en cours sur MedForm Pro, notre plateforme eCRF. Les investigateurs saisissent les données en ligne, chaque modification est tracée, et l\'analyse statistique est intégrée.' },
        1: { title: 'Le retour des médecins après la mise sur le marché', summary: 'Une entreprise pharmaceutique recueille des retours structurés de médecins après la mise sur le marché avec MedForm Marketing, avec des analyses assistées par l\'IA.' }
      },

      careers: {
        title: 'Carrières',
        lead: 'Codentrix est une petite équipe qui travaille à distance depuis la Tunisie. Nous accueillons des stagiaires et des collaborateurs sur projet en IA, données et recherche en santé, et nous lisons chaque candidature spontanée.',
        whyTitle: 'Pourquoi travailler avec nous',
        why: ['Des projets concrets : études, livrables de conseil et logiciels pour des clients pharmaceutiques et de santé publique.', 'Un accès direct au fondateur, avec de vraies responsabilités dès la première semaine.', 'Télétravail par défaut : nous travaillons depuis chez nous, donc ce que vous livrez compte plus que l\'endroit où vous êtes.', 'Un apprentissage concret de l\'IA, des données et de la recherche clinique.'],
        ctaLead: 'Intéressé(e) ? Envoyez votre CV avec un court mot expliquant sur quoi vous aimeriez travailler.',
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

      forms: {
        required: 'Ce champ est obligatoire.',
        invalidEmail: 'Saisissez une adresse email valide.',
        sending: 'Envoi…',
        contactSent: 'Merci — votre message est parti.',
        contactError: 'Nous n\'avons pas pu envoyer votre message. Réessayez, ou écrivez directement à contact@codentrix.io.'
      },

      apply: {
        title: 'Envoyer votre CV',
        lead: 'Remplissez le formulaire et joignez votre CV. Nous examinons chaque candidature et revenons vers vous pour la suite.',
        submit: 'Envoyer la candidature',
        sent: 'Candidature reçue — merci. Nous vous recontacterons.',
        error: 'Nous n\'avons pas pu envoyer votre candidature. Réessayez, ou écrivez directement à career@codentrix.io.',
        fields: {
          phone: 'Téléphone',
          education: 'Formation',
          experience: 'Résumé de l\'expérience'
        },
        file: {
          label: 'Joindre votre CV',
          prompt: 'Déposez votre CV ici, ou cliquez pour parcourir',
          hint: 'PDF ou Word, jusqu\'à 10 Mo',
          remove: 'Retirer le fichier',
          missing: 'Veuillez joindre votre CV.',
          tooLarge: 'Ce fichier dépasse 10 Mo. Merci d\'en joindre un plus léger.'
        }
      },

      footer: {
        copy: '© {{year}} Codentrix. Tous droits réservés.',
        eyebrow: 'Nous contacter',
        pitch: 'Dites-nous ce que vous voulez automatiser. Nous vous dirons ce que cela demande.',
        siteNav: 'Site'
      }
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
