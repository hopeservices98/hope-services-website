# Manuel d'Utilisation et de Déploiement - HOPE-SERVICES

## Partie 1 : Manuel d'Utilisation

### 1.1. Objectif du Site

Ce site est une application web moderne de type "Single-Page Application" (SPA). Son but principal est de servir de vitrine professionnelle pour l'offre "Data-as-a-Service" de HOPE-SERVICES. Il a été conçu pour :
- **Informer** : Présenter clairement le problème que vous résolvez, votre solution, et votre expertise technique.
- **Convertir** : Transformer un visiteur intéressé en un prospect qualifié grâce à un système de prise de rendez-vous fluide et professionnel.

### 1.2. Configuration Essentielle : Le Système de Prise de Rendez-vous

L'élément le plus important à configurer pour que le site soit fonctionnel est le module de planification. Actuellement, il utilise un lien de démonstration vers **Calendly**. Pour que les prospects prennent rendez-vous directement avec vous, vous devez le remplacer par votre propre lien.

**Pourquoi Calendly ?**
- **Professionnalisme** : Affiche vos disponibilités réelles en se synchronisant avec votre agenda (Google, Outlook, etc.).
- **Sécurité** : Gère de manière sécurisée les informations des prospects.
- **Automatisation** : Crée automatiquement l'événement dans les agendas, envoie les invitations et les rappels.

**Comment configurer votre lien Calendly (en 5 minutes) :**

1.  **Créez un compte** : Allez sur [Calendly.com](https://calendly.com) et inscrivez-vous (le compte gratuit est suffisant pour commencer).
2.  **Connectez votre agenda** : Dans les paramètres de Calendly, connectez votre agenda principal (Google Calendar, Office 365, etc.). C'est ce qui permettra à Calendly de connaître vos disponibilités.
3.  **Créez un type d'événement** : Créez un nouvel événement. Par exemple :
    *   **Nom** : "Démo Technique - HOPE-SERVICES"
    *   **Durée** : 45 minutes
4.  **Copiez le lien** : Une fois l'événement créé, Calendly vous donnera un lien public. Il ressemblera à `https://calendly.com/votre-nom/demo-technique`.
5.  **Mettez à jour le code** :
    *   Ouvrez le fichier : `components/CTA.tsx`.
    *   Trouvez la ligne (vers la ligne 107) :
        ```javascript
        const calendlyUrl = `https://calendly.com/VOTRE_LIEN/demo?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
        ```
    *   **Remplacez `https://calendly.com/VOTRE_LIEN/demo` par le lien que vous venez de copier de Calendly.**

Le site est maintenant prêt à prendre des rendez-vous pour vous !

### 1.3. Personnalisation du Contenu

Tout le contenu textuel (titres, descriptions, fonctionnalités) se trouve directement dans les fichiers des composants (`.tsx`). Si vous souhaitez modifier un texte, il vous suffit d'ouvrir le fichier correspondant et de changer le texte.

- **Titre principal** : `components/Hero.tsx`
- **Plans et tarifs** : `components/Services.tsx`
- **Problèmes et solutions** : `components/Problem.tsx` et `components/Solution.tsx`
- **Et ainsi de suite pour chaque section.**

---

## Partie 2 : Guide de Déploiement

### 2.1. Prérequis

- **Code source** : L'ensemble des fichiers et dossiers du projet.
- **Compte GitHub** (ou GitLab/Bitbucket) : La méthode recommandée est de stocker votre code sur une plateforme Git.
- **Compte sur une plateforme d'hébergement** : Nous recommandons **Vercel** ou **Netlify** pour leur simplicité et leur généreux plan gratuit, parfaitement adaptés à ce type de projet.

### 2.2. Méthode Recommandée : Déploiement Continu via Git

Cette méthode déploiera automatiquement votre site à chaque fois que vous mettrez à jour votre code sur GitHub.

**Étape 1 : Pousser le code sur GitHub**

1.  Créez un nouveau dépôt (repository) sur votre compte GitHub.
2.  Suivez les instructions de GitHub pour "push an existing repository from the command line" afin d'envoyer le code du site dans ce nouveau dépôt.

**Étape 2 : Déployer avec Vercel (Exemple)**

1.  **Inscrivez-vous sur Vercel** : Allez sur [Vercel.com](https://vercel.com) et créez un compte en utilisant votre compte GitHub.
2.  **Créez un nouveau projet** : Sur votre tableau de bord Vercel, cliquez sur "Add New..." -> "Project".
3.  **Importez votre dépôt** : Vercel affichera vos dépôts GitHub. Sélectionnez celui que vous venez de créer pour le site HOPE-SERVICES et cliquez sur "Import".
4.  **Configurez le projet** :
    *   Vercel est très intelligent. Comme il ne détectera pas un framework standard avec un `package.json` à la racine, il pourrait vous demander de configurer le projet.
    *   **Framework Preset** : Sélectionnez `Other`.
    *   **Build Command** : Laissez ce champ **vide**. Ce projet n'a pas besoin d'étape de "build" (compilation).
    *   **Output Directory** : Laissez la configuration par défaut. Le `index.html` est à la racine.
5.  **Déployez** : Cliquez sur le bouton "Deploy".
6.  **C'est terminé !** Vercel va construire et déployer votre site. En moins d'une minute, vous obtiendrez une URL publique (ex: `hope-services.vercel.app`) où votre site sera en ligne.

Le processus est quasiment identique sur **Netlify**.

### 2.3. Méthode Alternative : Déploiement Manuel (Drag & Drop)

Si vous souhaitez simplement mettre le site en ligne une seule fois sans le lier à Git.

1.  **Allez sur Netlify Drop** : [https://app.netlify.com/drop](https://app.netlify.com/drop)
2.  **Glissez-déposez le dossier** : Prenez le dossier contenant tous les fichiers de votre projet (`index.html`, `App.tsx`, le dossier `components`, etc.) et glissez-le directement dans la zone indiquée sur la page Netlify.
3.  **Attendez** : Netlify va télécharger et déployer vos fichiers. En quelques secondes, vous aurez une URL publique pour votre site.

### 2.4. Après le Déploiement : Nom de Domaine Personnalisé

Une fois votre site en ligne, la dernière étape est de le lier à votre nom de domaine professionnel (ex: `www.hope-services.com`).

- Sur Vercel ou Netlify, allez dans les paramètres de votre projet (`Settings` -> `Domains`).
- Suivez les instructions pour ajouter votre nom de domaine. Cela implique généralement d'aller chez votre fournisseur de nom de domaine (OVH, GoDaddy, Gandi, etc.) et d'ajouter ou de modifier des enregistrements DNS (généralement un enregistrement `A` ou `CNAME`).

Votre site est maintenant finalisé, configuré et en ligne, prêt à attirer vos premiers clients.
