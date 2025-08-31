# Manuel d'Utilisation et de Déploiement - HOPE-SERVICES

## Partie 0 : Comprendre la Structure du Projet (Très Important)

Ce projet est configuré pour fonctionner directement dans le navigateur sans étape de "compilation" (sans outils comme Vite ou Webpack). Cette simplicité a une conséquence majeure sur la manière dont vous devez le modifier.

**Le Principe Clé : Tout le code de l'application se trouve dans `index.tsx`**

-   **Un Seul Fichier Actif** : Le seul fichier que votre navigateur exécute est `index.tsx`. C'est là que tous les composants (Header, Hero, etc.) et la logique de l'application sont définis.
-   **Les Autres Fichiers sont Inactifs** : Les dossiers comme `components/`, `hooks/` et le fichier `App.tsx` sont présents pour vous aider à voir le code de manière organisée, mais **ils ne sont pas utilisés par le site en ligne**. Le navigateur ne peut pas lire les `import` entre ces fichiers dans cette configuration.

**Conclusion : Pour toute modification, vous devez éditer `index.tsx` directement.**

Si vous modifiez un fichier dans `components/`, **vous ne verrez aucun changement sur le site**. Vous devez reporter cette modification sur la définition du composant correspondant à l'intérieur de `index.tsx`.

---

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
2.  **Connectez votre agenda** : Dans les paramètres de Calendly, connectez votre agenda principal (Google Calendar, Office 356, etc.). C'est ce qui permettra à Calendly de connaître vos disponibilités.
3.  **Créez un type d'événement** : Créez un nouvel événement. Par exemple :
    *   **Nom** : "Démo Technique - HOPE-SERVICES"
    *   **Durée** : 45 minutes
4.  **Copiez le lien** : Une fois l'événement créé, Calendly vous donnera un lien public. Il ressemblera à `https://calendly.com/votre-nom/demo-technique`.
5.  **Mettez à jour le code** :
    *   Ouvrez le fichier : `index.tsx` (rappelez-vous, c'est le seul fichier actif).
    *   Trouvez la définition du composant `Scheduling`.
    *   Localisez la ligne :
        ```javascript
        const calendlyUrl = `https://calendly.com/VOTRE_LIEN/demo?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
        ```
    *   **Remplacez `https://calendly.com/VOTRE_LIEN/demo` par le lien que vous venez de copier de Calendly.**

Le site est maintenant prêt à prendre des rendez-vous pour vous !

### 1.3. Personnalisation du Contenu

Tout le contenu textuel (titres, descriptions, fonctionnalités) se trouve directement dans les définitions des composants à l'intérieur du fichier `index.tsx`. Si vous souhaitez modifier un texte, il vous suffit de trouver le composant correspondant dans `index.tsx` et de changer le texte.

- **Titre principal** : Dans le composant `Hero`.
- **Plans et tarifs** : Dans le composant `Services`.
- **Problèmes et solutions** : Dans les composants `Problem` et `Solution`.
- **Et ainsi de suite pour chaque section.**

---

## Partie 2 : Guides de Déploiement

### 2.1. Prérequis Commun

- **Code source** : L'ensemble des fichiers et dossiers du projet sur un dépôt Git (GitHub, GitLab, etc.).
- **Compte sur la plateforme d'hébergement** de votre choix (Vercel, Netlify, Render...).

### 2.2. Déploiement sur Vercel ou Netlify

La méthode recommandée est le déploiement continu via Git.

**Étape 1 : Pousser le code sur GitHub** (si ce n'est pas déjà fait)

**Étape 2 : Déployer**

1.  **Inscrivez-vous** sur Vercel ou Netlify en utilisant votre compte GitHub.
2.  **Créez un nouveau projet** et importez le dépôt Git de HOPE-SERVICES.
3.  **Configurez le projet** :
    *   **Framework Preset** : `Other`.
    *   **Build Command** : Laissez ce champ **vide**.
    *   **Output Directory** : Laissez la configuration par défaut.
4.  **Déployez**. La plateforme vous fournira une URL publique.

Pour un déploiement manuel rapide, vous pouvez utiliser **Netlify Drop** ([https://app.netlify.com/drop](https://app.netlify.com/drop)) et y glisser-déposer le dossier de votre projet.

### 2.3. Déploiement sur Render

Render est également une excellente option pour les sites statiques.

1.  **Créez un service** : Sur votre tableau de bord Render, cliquez sur **"New +"** -> **"Static Site"**.
2.  **Connectez votre dépôt** Git contenant le code du projet.
3.  **Configurez le service** : C'est l'étape la plus importante.
    *   **Name** : `hope-services` (ou le nom de votre choix).
    *   **Root Directory** : Laissez ce champ **vide**.
    *   **Build Command** : Laissez ce champ **vide** (car il n'y a pas d'étape de compilation).
    *   **Publish Directory** : Mettez `.` (un simple point), pour indiquer que le contenu à servir est à la racine.
4.  **Cliquez sur "Create Static Site"**. Le déploiement démarre et votre site sera en ligne en moins d'une minute.

### 2.4. Après le Déploiement : Nom de Domaine Personnalisé

Quelle que soit la plateforme, vous pouvez lier votre nom de domaine personnalisé (ex: `www.hope-services.com`) dans les paramètres de votre projet (`Settings` -> `Domains`). Suivez les instructions pour mettre à jour vos enregistrements DNS chez votre fournisseur de domaine.

Votre site est maintenant finalisé, configuré et en ligne, prêt à attirer vos premiers clients.