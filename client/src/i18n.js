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
        title: 'Codentrix — Intelligent AI Automation for Healthcare & Beyond',
        subtitle: 'AI-driven automation, strategic advisory, and digital health solutions for modern enterprises.',
        announcement: {
          title: 'NEW:',
          text: 'Introducing our AI-Enhanced Telehealth Platform — smart, secure, and compliant healthcare solutions.',
          link: 'Learn More →'
        },
        telehealth: {
          title: 'Telehealth Platform',
          lead: 'Next-gen telehealth with AI diagnostic support and smart triage.'
        },
        primary: 'Speak with an expert',
        secondary: 'Explore services',
        teamTitle: 'Leadership & Strategy',
        teamLead: 'Expert leadership delivering cutting-edge AI automation and strategic transformation.',
        strengths: {
          title: 'Core Capabilities',
          banking: {
            title: 'AI Process Automation',
            desc: 'Intelligent workflows and RPA solutions to streamline operations, reduce manual effort, and optimize resource allocation.'
          },
          modernization: {
            title: 'Digital Transformation',
            desc: 'End-to-end digital modernization powered by cloud-native architectures and seamless AI integration.'
          },
          compliance: {
            title: 'AI Governance',
            desc: 'Specialized frameworks for ethical AI, HIPAA/GDPR compliance, and secure data handling in regulated sectors.'
          },
          strategy: {
            title: 'AI Advisory',
            desc: 'Strategic consulting for AI adoption, technology roadmaps, and organizational readiness for the age of automation.'
          }
        },
        cases: {
          eyebrow: 'Case studies',
          title: 'Recent Success Stories',
          more: 'Learn more'
        }
      },

      about: {
        title: 'About Codentrix',
        description: 'Codentrix enables organizations to harness the power of Artificial Intelligence and Automation. We specialize in transforming healthcare and enterprise operations through intelligent systems, ensuring compliance, security, and scalability.',
        expansion: {
          title: 'Portfolio Expansion',
          description: 'Codentrix has evolved to lead the AI revolution in healthcare, launching a smart telehealth platform for the MENA region. We are committed to building intelligent solutions that solve real-world problems with precision and care.'
        },
        leadershipTitle: 'Leadership',
        leadershipLead: 'Our leadership team combines deep technical expertise in AI with strategic vision for healthcare transformation.',
        leaders: {
          nader: { lead: 'CEO & Tech Visionary - 20+ years driving technology innovation in MENA.', back: 'Expert in scaling tech operations and leading high-performance teams at global giants like Ericsson and Huawei.' },
          fethi: { lead: 'CTO - AI & Architecture Specialist with 30+ years experience.', back: 'Architect of resilient systems, now focused on implementing secure AI/ML pipelines and cloud infrastructure.' },
          ahmed: { lead: 'CSO - Strategy & Growth. PhD in Strategic Management.', back: 'Driving partnerships and product-market fit for AI healthcare solutions across telecom and enterprise sectors.' },
          more: 'Full profile',
          less: 'Less'
        }
      },

      services: {
        title: 'Services',
        intro: 'Comprehensive AI automation and strategic consulting services designed for healthcare and forward-thinking enterprises.',
        bank: {
          title: 'AI & Automation',
          lead: 'Leveraging Artificial Intelligence to automate complex processes, reduce error rates, and unlock actionable insights.',
          detailedTitle: 'Key Implementations',
          techTitle: 'Technology Stack',
          points: [
            'Intelligent Process Automation (IPA): Combining RPA with Machine Learning to automate end-to-end workflows.',
            'Predictive Analytics: Utilizing data models to forecast trends, patient needs, and operational bottlenecks.',
            'Natural Language Processing (NLP): Chatbots and automated document analysis for healthcare records.',
            'Computer Vision: AI-assisted diagnostics and medical imaging analysis.',
            'Smart Scheduling: Optimization algorithms for resource management and appointment booking.',
            'Data Modernization: Migrating legacy data to AI-ready cloud warehouses with strict security protocols.',
            'Regulatory AI: Automated compliance checking against HIPAA and GDPR standards.',
            'Operational Consulting: Change management for teams adopting AI-driven workflows.'
          ],
          techProfile: 'Tech Stack: Python (TensorFlow, PyTorch), Node.js, React, Cloud (AWS/Azure), Docker/Kubernetes, Secure FHIR APIs.',
          capabilities: {
            core: {
              title: 'Process Automation',
              desc: 'Streamline operations with smart agents that handle repetitive tasks with near-zero error rates.'
            },
            payments: {
              title: 'Predictive Insights',
              desc: 'Turn data into decisions with advanced analytics that predict and prevent operational issues.'
            },
            reporting: {
              title: 'NLP & Chatbots',
              desc: 'Enhance patient and customer interaction with 24/7 intelligent conversational agents.'
            },
            migration: {
              title: 'Cloud AI Integration',
              desc: 'Seamlessly deploy scalable AI models on secure cloud infrastructure.'
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
        lead: 'Join Codentrix — we hire AI engineers, data scientists, and healthcare innovators who want to build the future of intelligent automation.',
        whyTitle: 'Why work with us',
        why: ['Work on cutting-edge AI and Machine Learning projects.', 'Impact real lives through better healthcare technology.', 'Remote-friendly culture with top-tier talent.', 'Continuous learning budget for AI/Tech certifications.'],
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
        mapTitle: 'Codentrix location',
        viewLargerMap: 'Open in Google Maps',
        form: { send: 'Send Message', name: 'Name', email: 'Email', message: 'Message' }
      },

      forms: {
        required: 'This field is required.',
        invalidEmail: 'Enter a valid email address.',
        sending: 'Sending…',
        contactSent: 'Thanks — your message is on its way. We usually reply within one working day.',
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
        title: 'Codentrix — Automatisation IA Intelligente pour la Santé et au-delà',
        subtitle: 'Automatisation pilotée par l\'IA, conseil stratégique et solutions de santé numérique pour les entreprises modernes',
        announcement: {
          title: 'NOUVEAU:',
          text: 'Découvrez notre plateforme de télésanté enrichie par l\'IA — des solutions de soins intelligentes, sécurisées et conformes.',
          link: 'En savoir plus →'
        },
        telehealth: {
          title: 'Plateforme de Télésanté',
          lead: 'Télésanté de nouvelle génération avec support diagnostique IA et triage intelligent.'
        },
        primary: 'Parler à un expert',
        secondary: 'Explorer les services',
        teamTitle: 'Direction & stratégie',
        teamLead: 'Leadership expert délivrant une automatisation IA de pointe et une transformation stratégique.',
        strengths: {
          title: 'Capacités Centrales',
          banking: {
            title: 'Automatisation des Processus IA',
            desc: 'Flux de travail intelligents et solutions RPA pour rationaliser les opérations, réduire l\'effort manuel et optimiser l\'allocation des ressources.'
          },
          modernization: {
            title: 'Transformation Digitale',
            desc: 'Modernisation numérique de bout en bout propulsée par des architectures cloud-native et une intégration IA transparente.'
          },
          compliance: {
            title: 'Gouvernance IA',
            desc: 'Cadres spécialisés pour l\'IA éthique, la conformité HIPAA/GDPR et la gestion sécurisée des données dans les secteurs réglementés.'
          },
          strategy: {
            title: 'Conseil IA',
            desc: 'Conseil stratégique pour l\'adoption de l\'IA, feuilles de route technologiques et préparation organisationnelle à l\'ère de l\'automatisation.'
          }
        },
        cases: {
          eyebrow: 'Études de cas',
          title: 'Réussites Récentes',
          more: 'En savoir plus'
        }
      },

      about: {
        title: 'À propos de Codentrix',
        description: 'Codentrix permet aux organisations d\'exploiter la puissance de l\'Intelligence Artificielle et de l\'Automatisation. Nous nous spécialisons dans la transformation des opérations de santé et d\'entreprise grâce à des systèmes intelligents, garantissant conformité, sécurité et évolutivité.',
        expansion: {
          title: 'Expansion du Portefeuille',
          description: 'Codentrix a évolué pour mener la révolution de l\'IA dans la santé, lançant une plateforme de télésanté intelligente pour la région MENA. Nous nous engageons à construire des solutions intelligentes qui résolvent des problèmes concrets avec précision et soin.'
        },
        leadershipTitle: 'Direction',
        leadershipLead: 'Notre équipe dirigeante combine une expertise technique approfondie en IA avec une vision stratégique pour la transformation de la santé.',
        leaders: {
          nader: { lead: 'PDG & Visionnaire Tech - 20+ ans menant l\'innovation technologique en MENA.', back: 'Expert en passage à l\'échelle des opérations tech et direction d\'équipes haute performance chez des géants mondiaux comme Ericsson et Huawei.' },
          fethi: { lead: 'CTO - Spécialiste IA & Architecture avec 30+ ans d\'expérience.', back: 'Architecte de systèmes résilients, désormais concentré sur l\'implémentation de pipelines IA/ML sécurisés et l\'infrastructure cloud.' },
          ahmed: { lead: 'CSO - Stratégie & Croissance. Docteur en Management Stratégique.', back: 'Pilotage des partenariats et du product-market fit pour les solutions de santé IA dans les secteurs télécom et entreprise.' },
          more: 'Profil complet',
          less: 'Réduire'
        }
      },

      services: {
        title: 'Services',
        intro: 'Services complets d\'automatisation IA et de conseil stratégique conçus pour la santé et les entreprises tournées vers l\'avenir.',
        bank: {
          title: 'IA & Automatisation',
          lead: 'Exploiter l\'Intelligence Artificielle pour automatiser des processus complexes, réduire les taux d\'erreur et débloquer des informations exploitables.',
          detailedTitle: 'Implémentations Clés',
          techTitle: 'Stack Technologique',
          points: [
            'Automatisation Intelligente des Processus (IPA) : Combinaison de RPA et de Machine Learning pour automatiser les flux de travail de bout en bout.',
            'Analytique Prédictive : Utilisation de modèles de données pour prévoir les tendances, les besoins des patients et les goulots d\'étranglement opérationnels.',
            'Traitement du Langage Naturel (NLP) : Chatbots et analyse documentaire automatisée pour les dossiers de santé.',
            'Vision par Ordinateur : Diagnostics assistés par IA et analyse d\'imagerie médicale.',
            'Planification Intelligente : Algorithmes d\'optimisation pour la gestion des ressources et la prise de rendez-vous.',
            'Modernisation des Données : Migration des données legacy vers des entrepôts cloud prêts pour l\'IA avec des protocoles de sécurité stricts.',
            'IA Réglementaire : Vérification automatisée de la conformité aux normes HIPAA et GDPR.',
            'Conseil Opérationnel : Gestion du changement pour les équipes adoptant des flux de travail pilotés par l\'IA.'
          ],
          techProfile: 'Stack Tech : Python (TensorFlow, PyTorch), Node.js, React, Cloud (AWS/Azure), Docker/Kubernetes, APIs FHIR sécurisées.',
          capabilities: {
            core: {
              title: 'Automatisation des Processus',
              desc: 'Rationalisez les opérations avec des agents intelligents qui gèrent les tâches répétitives avec des taux d\'erreur quasi nuls.'
            },
            payments: {
              title: 'Insights Prédictifs',
              desc: 'Transformez les données en décisions avec des analyses avancées qui prédisent et préviennent les problèmes opérationnels.'
            },
            reporting: {
              title: 'NLP & Chatbots',
              desc: 'Améliorez l\'interaction patient et client avec des agents conversationnels intelligents disponibles 24/7.'
            },
            migration: {
              title: 'Intégration Cloud IA',
              desc: 'Déployez de manière transparente des modèles IA évolutifs sur une infrastructure cloud sécurisée.'
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
        lead: 'Rejoignez Codentrix — nous recrutons des ingénieurs IA, data scientists et innovateurs en santé qui veulent construire le futur de l\'automatisation intelligente.',
        whyTitle: 'Pourquoi travailler avec nous',
        why: ['Travailler sur des projets IA et Machine Learning de pointe.', 'Impacter des vies réelles grâce à une meilleure technologie de santé.', 'Culture remote-friendly avec des talents de haut niveau.', 'Budget de formation continue pour les certifications IA/Tech.'],
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
        mapTitle: 'Localisation de Codentrix',
        viewLargerMap: 'Ouvrir dans Google Maps',
        form: { send: 'Envoyer', name: 'Nom', email: 'Email', message: 'Message' }
      },

      forms: {
        required: 'Ce champ est obligatoire.',
        invalidEmail: 'Saisissez une adresse email valide.',
        sending: 'Envoi…',
        contactSent: 'Merci — votre message est parti. Nous répondons généralement sous un jour ouvré.',
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
