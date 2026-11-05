# TP10 - DevSecOps "Shift Left"

Ce dépôt contient le rendu du TP10 portant sur l'implémentation de contrôles de sécurité "Shift Left" sur une application volontairement vulnérable (`vuln-app`).

## 📸 Captures d'écran et Livrables

Voici les preuves de la mise en place des différents contrôles de sécurité, étape par étape :

### Partie 1 : Gestion des Secrets (Gitleaks)
Détection des secrets en dur dans le code source et l'historique Git. La capture montre la détection du `jwt_secret` avant la correction et la mise en place des variables d'environnement.
![Détection Gitleaks](captures/gitleaks-before.png)
*Après nettoyage de l'historique et passage en variables d'environnement, Gitleaks ne détecte plus aucune fuite.*
![Gitleaks Clean](captures/gitleaks-after.png)

### Partie 2 : Hook Pre-commit
Installation du hook `pre-commit` avec Gitleaks. La capture prouve que le commit est bloqué localement (avant même de pousser sur GitHub) si un secret est détecté dans le code.
![Hook Pre-commit bloqué](captures/pre-commit-blocked.png)

### Partie 3 : SAST avec Semgrep
Analyse statique du code (SAST) avec Semgrep pour détecter les failles (Injection SQL, XSS, Injection de commande).
*Capture avant correction : Semgrep détecte plusieurs failles bloquantes.*
![Semgrep Avant](captures/semgrep-before.png)
*Capture après correction : Le code a été sécurisé (requêtes paramétrées, execFile, res.json).*
![Semgrep Après](captures/semgrep-after.png)

### Partie 4 : Dépendances et Images (Trivy)
Audit des dépendances et de l'image Docker.
*Analyse de l'image Docker initiale (`node:14` basée sur Debian) : **566 CVE** détectées.*
![Trivy Avant](captures/trivy-before.png)
*Après passage à une image multi-stage `node:24-alpine` et correction des dépendances : **0 CVE** (ou très peu).*
![Trivy Après](captures/trivy-after.png)

### Partie 5 : Sécurité GitHub (Dependabot, CodeQL)
Activation des fonctionnalités de sécurité avancées sur GitHub.
*Activation de Dependabot, Secret Scanning et Push Protection.*
![GitHub Security](captures/github-security.png)
*Pull Requests automatiques ouvertes par Dependabot pour corriger les dépendances vulnérables.*
![PR Dependabot](captures/dependabot-pr.png)
*Analyse CodeQL activée sur le dépôt.*
![CodeQL Alerts](captures/codeql-alerts.png)
*Mise en place d'un Ruleset protégeant la branche `main` (Pull Request obligatoire + checks de sécurité).*
![Ruleset Main](captures/ruleset-main.png)
*Test de blocage : Une Pull Request réintroduisant une faille SQL est bloquée par les checks de sécurité requis (checks en rouge, bouton Merge désactivé).*
![PR Bloquée](captures/pr-blocked.png)

### Partie 6 : Quality Gates dans Jenkins
Intégration des scans de sécurité dans un pipeline Jenkins.
*Pipeline en échec (ROUGE) suite à la réintroduction de la faille SQL.*
![Jenkins Rouge](captures/jenkins-red.png)
*Pipeline réussi (VERT) après correction de la faille et validation de tous les stages.*
![Jenkins Vert](captures/jenkins-green.png)

---
## 🛠️ Résumé des actions (Shift Left)

| Étape | Outil | Action |
| :--- | :--- | :--- |
| **Secrets** | Gitleaks, pre-commit | Détection et blocage des secrets locaux et dans l'historique. |
| **SAST** | Semgrep, CodeQL | Analyse du code pour les failles (SQLi, XSS, Cmdi). |
| **SCA** | NPM Audit, OWASP | Analyse des dépendances vulnérables. |
| **Images** | Trivy | Scan des CVE de l'OS et des paquets, et audit du Dockerfile. |
| **Gouvernance** | GitHub | Dependabot, Secret Scanning, Rulesets, Pull Requests. |
| **CI/CD** | Jenkins | Quality Gate bloquant le déploiement si une faille critique est détectée. |
