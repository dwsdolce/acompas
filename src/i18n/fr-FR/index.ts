// Ceci n'est qu'un exemple,
// vous pouvez donc supprimer en toute sécurité toutes les propriétés par défaut ci-dessous

export default {
  failed: 'Action échouée',
  success: 'Action réussie',
  welcome: 'Bienvenue dans l\'application A Compás',
  notFound: {
    header: 'Désolé, cette page n\'existe pas.',
    btn: 'Retourner aux motifs'
  },
  donate: 'Faire un don',
  help: 'Aide',
  tuning: 'Diapason',
  shortcuts: 'Raccourcis',
  privacy: 'Politique de confidentialité',
  android: 'Obtenir l\'application Android',
  follow: 'Suivez-nous',
  share: 'Partager',
  source: 'Code source',
  issues: 'Problèmes',
  doc: {
    welcome: {
      title: 'Bienvenue dans l\'application A Compás',
      content: `
Cette application est conçue pour vous aider à apprendre et à pratiquer votre instrument de musique.
C'est un travail en cours, alors soyez patient avec nous pendant que nous continuons à l'améliorer.
Si vous avez des questions ou des suggestions, veuillez nous contacter.`
    },
    getStarted: {
      title: 'Commencer',
      content: `
- Sélectionnez un **motif** dans la liste. Un motif (aussi appelé "palo" dans le flamenco) est un style rythmique.
- Ajustez le **tempo** (vitesse) du motif.
- Sélectionnez des **instruments** dans la table de mixage.
- **Démarrez** le métronome.`
    },
    options: {
      title: 'Liste des options',
      content: {
        theme: {
          title: 'Thème',
          content: `
Vous pouvez choisir entre les thèmes clair et sombre.
Le thème sombre est plus adapté aux environnements faiblement éclairés, tandis que le thème clair est plus adapté aux environnements lumineux.`,
        },
        lang: {
          title: 'Langue',
          content: `
Choisissez la langue d'interface de l'application.
Le changement s'applique immédiatement à tous les textes.
Votre sélection est stockée localement (navigateur / appareil) et sera conservée lors de la prochaine ouverture de l'application.`,
        },
        tempo: {
          title: 'Tempo',
          content: `
Il y a 2 façons de définir le tempo : le cercle de bouton rotatif, et vous pouvez décrémenter/incrémenter les bpm avec les boutons + et -.
Vous pouvez aussi taper le tempo directement dans le champ de saisie, utiliser la molette de la souris, ou les touches fléchées haut et bas.
Le tempo est la vitesse du métronome, mesurée en battements par minute.`,
        },
        mixer: {
          title: 'Table de mixage des instruments',
          content: `
Sélectionnez les instruments en cours de lecture (assurez-vous d'avoir au moins un instrument actif),
définissez son propre volume relatif, et s'il joue des noires ou des croches.`,
        },
        improvise: {
          title: 'Improviser',
          content: `
Si c'est activé, alors parfois le métronome cessera de suivre le motif préprogrammé et jouera des battements aléatoires pour un ou plusieurs instrument(s).
Cela produit de la "surprise" dans le motif.`,
        },
        humanize: {
          title: 'Humaniser',
          content: 'Si c\'est activé, alors le métronome jouera les battements avec une petite déviation aléatoire, simulant le toucher humain.',
        },
        swing: {
          title: 'Swing',
          content: 'Si sa valeur est 0, la croche est exactement la moitié d\'une noire. Quand elle approche de 1, un décalage est appliqué, pour une sensation rythmique \'jazz\'.',
        },
        reverb: {
          title: 'Réverbération',
          content: 'Ajustez la réverbération du son. Elle simule l\'effet d\'une pièce ou d\'une salle.',
        },
        startBeat: {
          title: 'Battement de départ',
          content: `
Changez le battement de départ (sur quel battement sélectionné le motif commence).
C'est utile si vous voulez commencer le motif sur un battement différent.
Par exemple, si vous voulez commencer sur le 2e battement du motif, définissez le battement de départ à 2.
Le battement de départ est aussi utile si vous voulez pratiquer une partie particulière du motif.
Les notes entre le battement de départ et le début du motif seront jouées comme un son de clic.`,
        },
        viewMode: {
          title: 'Mode d\'affichage',
          content: 'Choisissez entre les visualisations points, compteur et horloge.',
        },
        reset: {
          title: 'Réinitialiser',
          content: 'Réinitialisez les paramètres du métronome aux valeurs par défaut. Vous pouvez réinitialiser tous les paramètres ou réinitialiser les paramètres pour le motif actuel.',
        }
      }
    },
    appSettings: {
      title: 'Paramètres de l\'application',
      content: {
        theme: {
          title: 'Mode de thème',
          content: `
**Options de thème clair et sombre**

A Compás propose des thèmes clair et sombre pour offrir la meilleure expérience visuelle :

- **Thème clair** : Interface claire et lumineuse idéale pour les environnements bien éclairés. Présente des arrière-plans blancs avec du texte sombre pour une lisibilité maximale en plein jour.
- **Thème sombre** : Facile pour les yeux avec des arrière-plans sombres et du texte clair. Parfait pour les conditions de faible éclairage, réduit la fatigue oculaire pendant les longues sessions de pratique et économise la batterie sur les écrans OLED.

**Comment changer :**
- Utilisez le bouton de basculement de thème dans le menu de navigation de gauche
- Les changements s'appliquent immédiatement à toute l'application
- Votre préférence est automatiquement sauvegardée et restaurée au redémarrage de l'app

**Détection automatique :**
L'application respecte par défaut la préférence de thème système de votre appareil, mais vous pouvez remplacer ce paramètre à tout moment.`
        },
        language: {
          title: 'Sélection de langue',
          content: `
**Support multi-langues**

A Compás est disponible en 9 langues pour servir la communauté flamenco mondiale :

- **Anglais** (en-US) - Langue par défaut
- **Français** (Français) - Traduction complète
- **Espagnol** (Español) - Terminologie flamenco native
- **Allemand** (Deutsch) - Localisation complète
- **Italien** (Italiano) - Traduction complète de l'interface

**Fonctionnalités :**
- Tous les menus, boutons et textes d'aide sont traduits
- Les noms de palos flamenco restent en espagnol pour l'authenticité
- Les changements de langue s'appliquent instantanément sans redémarrage de l'app
- Les paramètres sont sauvegardés localement sur votre appareil

**Comment changer de langue :**
Utilisez le sélecteur de langue dans le menu de navigation de gauche pour passer entre les langues disponibles.`
        },
        visualization: {
          title: 'Modes de visualisation',
          content: `
**Trois options d'affichage pour la visualisation des battements**

Choisissez la visualisation qui convient le mieux à votre style de pratique :

**1. Mode Points**
- Affichage épuré et minimaliste avec des points animés
- Chaque point représente un battement dans le motif
- Les battements actifs sont mis en évidence avec couleur et animation
- Parfait pour les apprenants visuels qui préfèrent des affichages simples et épurés
- Excellent pour se concentrer sur la structure du motif

**2. Mode Compteur**
- Compteur numérique affichant la position actuelle
- Affiche le numéro du battement actuel et le total de battements dans le motif
- Progression numérique claire à travers le compás
- Idéal pour les musiciens qui pensent en chiffres
- Utile pour apprendre les structures de motifs complexes et le timing

**3. Mode Horloge**
- Visualisation circulaire type cadran d'horloge
- Battements disposés autour d'une horloge avec aiguille animée
- Fournit une sensation intuitive du rythme cyclique
- Excellent pour comprendre la nature circulaire du compás flamenco
- Représentation visuelle correspondant aux méthodes de comptage flamenco traditionnelles

**Comment changer :**
Accédez aux options de visualisation via le menu des paramètres. Les changements s'appliquent immédiatement et votre préférence est sauvegardée automatiquement.

**Conseils :**
- Essayez différents modes pendant la pratique pour trouver ce qui vous convient le mieux
- Le mode horloge est particulièrement efficace pour les motifs à 12 temps comme la Soleá
- Le mode compteur aide lors de l'apprentissage des rythmes complexes
- Le mode points minimise les distractions pour les praticiens avancés`
        }
      }
    },
    utils: {
      wikipediaUrl: 'Article Wikipédia :',
      videoExample: 'Exemple vidéo :',
      openLink: 'Ouvrir le lien',
      disabled: 'Cette option est désactivée pour ce motif.'
    },
    searchPattern: {
      title: 'Rechercher un motif',
      content: `
Beaucoup de **palos** flamencos sont en fait dérivés d'autres structures rythmiques.
Par exemple, "farruca" est dérivé de "tientos", "columbiana" ou "garrotín" sont des types de "tangos".
Ici vous pouvez saisir le nom de n'importe quel "palo" que vous avez entendu et A Compás recherchera les motifs dont il dérive.
- Recherchez un motif en tapant son nom ou une partie de celui-ci.
- La recherche ne distingue pas les majuscules des minuscules.
- La recherche est effectuée sur le nom du motif et sur les motifs liés.
- La recherche est effectuée sur toute la chaîne, pas sur les mots.`
    },
    shortcuts: {
      title: 'Les raccourcis suivants sont disponibles pour l\'utilisation avec le clavier :',
      space: 'Jouer/Arrêter le métronome',
      up: 'Incrémenter le tempo (maintenir la touche enfoncée pour incrémenter plus rapidement)',
      down: 'Décrémenter le tempo (maintenir la touche enfoncée pour décrémenter plus rapidement)',
      left: 'Motif précédent',
      right: 'Motif suivant',
      esc: 'Fermer la fenêtre modale',
      tab: 'Changer le bouton de focus'
    },
    reset: {
      title: 'Restaurer les paramètres par défaut',
      warning: 'Attention ! Cela supprimera vos paramètres de métronome.',
      close: 'Fermer',
      proceed: 'Continuer',
      success: 'Succès ! Vos paramètres de métronome ont été réinitialisés.',
    },
    context: {
      title: 'Sélectionner un contexte',
    },
    reverb: {
      title: 'Déclin de réverbération',
      content: 'Définir un déclin pour la réverbération des sons'
    },
    swing: {
      title: 'Swing',
      content: 'Définir une valeur de swing pour le métronome',
      caption: 'Si sa valeur est 0, la croche est exactement la moitié d\'une noire. Quand elle approche de 1, un décalage est appliqué, pour une saveur rythmique \'jazz\'.'
    },
    startBeat: {
      title: 'Battement de départ',
      content: 'Définir le battement où le métronome commencera à jouer'
    },
    mixer: {
      title: 'Table de mixage des instruments',
      content: 'Sélectionnez les instruments que vous voulez jouer',
      active: {
        title: 'Actif',
        content: 'Jouer cet instrument'
      },
      eighth: {
        title: '8e',
        content: 'Basculer les croches'
      },
      volume: {
        title: 'Volume (db)',
        content: 'Augmenter ou diminuer le volume de l\'instrument'
      }
    },
    pattern: {
      title: 'Sélectionner un motif',
      search: 'Rechercher un motif',
      searchSm: 'Rechercher',
    },
    prestart: {
      title: 'Pré-démarrage depuis le battement',
      content: 'Définir optionnellement un battement à partir duquel un clic de pré-comptage commencera avant que la boucle réelle ne commence.'
    },
    privacy: {
      title: 'Politique de confidentialité',
      content: `
Cette application utilise un outil appelé **Matomo** pour collecter des données d'analyse de visites anonymisées.

Si vous activez l'option ci-dessous, Matomo définira un cookie dans le navigateur web (pour le site web acompas.org),
ou dans l'appareil mobile (pour l'application Android),
et observera certaines de vos actions dans l'application
(essentiellement les actions 'Jouer' et 'Arrêter' du métronome pour inférer le temps de jeu),
en anonymisant votre adresse IP.

Cette information fait seulement partie de nos statistiques d'utilisation (pour avoir une idée du nombre d'utilisateurs que nous avons). Nous ne vendons ni ne donnons accès à ces données à qui que ce soit d'autre.
Vous pouvez activer ou désactiver cette fonctionnalité quand vous le souhaitez.`,
      allow: `
Nous ne collectons aucune donnée personnelle nominative.

**Autoriser cette application à nous envoyer des données d'utilisation anonymisées ?**`,
      enable: 'Activer et fermer',
      close: 'Fermer',
    },
    tempo: {
      title: 'Tempo',
      content: 'Définir le tempo du métronome',
      bpm: 'BPM'
    },
    update: {
      title: 'Initialisation de l\'application',
      content: `
Les paramètres de l'application doivent être (ré)initialisés.

Si vous utilisiez une version précédente de cette application, vous perdrez tous vos paramètres et motifs.
Mais c'est le seul moyen d'obtenir les nouvelles fonctionnalités. Si c'est votre première utilisation, cela ne changera rien alors allez-y.`,
      button: 'Recharger l\'application'
    },
    tuning: {
      title: 'Diapason',
      content: 'Jouer un son de diapason',
      caption: 'tout',
      play: 'Jouer',
      stop: 'Arrêter'
    },
    changelog: {
      title: 'Journal des modifications',
      description: 'Derniers changements et mises à jour d\'A Compás',
      entries: [
        {
          version: '3.2.7',
          date: '2024-08-23',
          changes: [
            'Ajout du store de contexte et sélecteur avec vues colorées',
            'Ajout de la fonctionnalité de filtre de recherche de motifs',
            'Ajout de la boîte de dialogue d\'aide pour la recherche de motifs',
            'Ajout de la fonctionnalité de maintien éveillé pour le bureau',
            'Mise à jour des packages Quasar',
            'Correction des avertissements SaSS',
            'Mise à jour vers Node 20',
            'Préparation pour la compatibilité Android 34'
          ]
        },
        {
          version: '3.2.5',
          date: '2023-07-15',
          changes: [
            'Ajout et mise à jour du sitemap.xml',
            'Correction des événements Matomo',
            'Correction de la position de l\'horloge inactive',
            'Mise à jour des packages Quasar',
            'Améliorations de performance et corrections de bugs'
          ]
        },
        {
          version: '3.2.4',
          date: '2023-07-06',
          changes: [
            'Corrections de bugs et améliorations de stabilité',
            'Améliorations mineures de l\'interface utilisateur'
          ]
        },
        {
          version: '3.2.3',
          date: '2023-07-03',
          changes: [
            'Optimisations de performance',
            'Corrections de bugs'
          ]
        },
        {
          version: '3.2.2',
          date: '2023-07-03',
          changes: [
            'Corrections rapides et améliorations'
          ]
        },
        {
          version: '3.2.1',
          date: '2023-06-30',
          changes: [
            'Corrections de bugs et mises à jour de maintenance'
          ]
        },
        {
          version: '2.3.0',
          date: '2021-01-23',
          changes: [
            'Nouvelles fonctionnalités et améliorations',
            'Interface utilisateur améliorée'
          ]
        },
        {
          version: '2.2.0',
          date: '2020-06-25',
          changes: [
            'Mises à jour majeures de fonctionnalités',
            'Performance améliorée'
          ]
        },
        {
          version: '2.1.4',
          date: '2019-09-13',
          changes: [
            'Corrections de bugs et améliorations de stabilité'
          ]
        },
        {
          version: '2.0.0',
          date: '2018-01-04',
          changes: [
            'Réécriture complète de l\'application',
            'Nouvelle conception d\'interface moderne',
            'Moteur de métronome amélioré',
            'Ajout de plus de motifs flamenco'
          ]
        }
      ]
    }
  },
  buttons: {
    context : 'Sélectionner le contexte',
    pattern: 'Motif',
    restore: 'Restaurer les paramètres',
    options: 'Options de rythme',
    settings: 'Paramètres de l\'application'
  },
  sync: {
    title: 'Décalage audio/visuel',
    caption: 'Décale l\'animation pour qu\'elle coïncide avec le son. Augmentez la valeur si le clic est entendu après l\'animation — typiquement avec un casque Bluetooth.'
  }
}
