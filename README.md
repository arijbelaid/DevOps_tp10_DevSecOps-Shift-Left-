<div align="center">

# 🛡️ TP10 - DevSecOps "Shift Left"
### Secrets, SAST, Dépendances, Images & CI/CD

[![Gitleaks](https://img.shields.io/badge/Gitleaks-Secrets-red?style=for-the-badge)](https://github.com/gitleaks/gitleaks)
[![Semgrep](https://img.shields.io/badge/Semgrep-SAST-blue?style=for-the-badge)](https://semgrep.dev/)
[![Trivy](https://img.shields.io/badge/Trivy-Images-orange?style=for-the-badge)](https://trivy.dev/)
[![Jenkins](https://img.shields.io/badge/Jenkins-CI/CD-green?style=for-the-badge&logo=jenkins)](https://www.jenkins.io/)

📄 **[Télécharger le rapport complet (PDF)](rapport_tp10.pdf)**

</div>

---

## 🎯 Objectifs du TP

Ce TP a pour but d'appliquer les principes du **Shift Left** en intégrant la sécurité le plus tôt possible dans le cycle de développement :

- **Secrets** : Détecter et bloquer les secrets (Gitleaks, pre-commit).
- **SAST** : Analyser le code statique (Semgrep, CodeQL).
- **SCA** : Auditer les dépendances (npm audit, OWASP Dependency-Check, Dependabot).
- **Images** : Scanner les images et configurations (Trivy).
- **CI/CD** : Mettre en place des quality gates (GitHub Actions, Jenkins).

---

## 📝 Description

Le projet analyse une application volontairement vulnérable (`vuln-app`) et corrige ses failles :
1.  Détection des secrets avec **Gitleaks** et le hook **pre-commit**.
2.  Analyse statique avec **Semgrep** (Injection SQL, XSS, etc.).
3.  Audit des dépendances avec **npm audit** et **OWASP**.
4.  Scan des images avec **Trivy** (avant/après correction du Dockerfile).
5.  Sécurisation de GitHub avec **Dependabot**, **CodeQL**, et **Rulesets**.
6.  Pipeline **Jenkins** avec quality gates (Rouge puis Vert).

---

## 📸 Captures d'écran

Toutes les captures sont disponibles dans le dossier [`captures/`](captures/).

### 🔑 Partie 1 : Secrets avec Gitleaks

#### 1. Détection des secrets (AVANT)
![01](captures/01_gitleaks_before.png)

#### 2. Après nettoyage de l'historique
![02](captures/02_gitleaks_after.png)

### 🛡️ Partie 2 : Hook pre-commit

#### 3. Installation du hook
![03](captures/03_precommit_install.png)

#### 4. Commit bloqué par le hook
![04](captures/04_precommit_blocked.png)

### 🔍 Partie 3 : SAST avec Semgrep

#### 5. Résultats Semgrep (AVANT correction)
![05](captures/05_semgrep_before.png)

#### 6. Résultats Semgrep (APRÈS correction)
![06](captures/06_semgrep_after.png)

#### 7. Commit des corrections
![07](captures/07_semgrep_commit.png)

### 📦 Partie 4 : Dépendances et Images

#### 8. npm audit (AVANT)
![08](captures/08_npm_audit_before.png)

#### 9. OWASP Dependency-Check
![09](captures/09_owasp_before.png)

#### 10. Trivy Image (AVANT)
![10](captures/10_trivy_image_before.png)

#### 11. Trivy Config (AVANT)
![11](captures/11_trivy_config_before.png)

#### 12. Trivy après correction (0 CVE)
![12](captures/12_trivy_after.png)

### 🐙 Partie 5 : Sécurité GitHub

#### 13. Activation des fonctionnalités de sécurité
![13](captures/13_github_security.png)

#### 14. Configuration de Dependabot
![14](captures/14_dependabot_config.png)

#### 15. Push de la configuration
![15](captures/15_dependabot_push.png)

#### 16. Activation de CodeQL
![16](captures/16_codeql_enabled.png)

#### 17. Workflow sécurisé (security.yml)
![17](captures/17_security_workflow.png)

#### 18. Protection de la branche main
![18](captures/18_ruleset_main.png)

#### 19. PR bloquée par le Ruleset
![19](captures/19_pr_blocked.png)

### 🚦 Partie 6 : Quality Gates dans Jenkins

#### 20. Configuration du Job Jenkins
![20](captures/20_jenkins_job.png)

#### 21. Pipeline Jenkins (ROUGE - avec faille)
![21](captures/21_jenkins_red.png)

#### 22. Pipeline Jenkins (VERT - corrigé)
![22](captures/22_jenkins_green.png)

---

## 🛠️ Résumé des actions

| Étape | Outil | Action |
| :--- | :--- | :--- |
| **Secrets** | Gitleaks, pre-commit | Détection et blocage des secrets. |
| **SAST** | Semgrep, CodeQL | Analyse du code (SQLi, XSS, etc.). |
| **SCA** | npm audit, OWASP, Dependabot | Audit des dépendances. |
| **Images** | Trivy | Scan des CVE et du Dockerfile. |
| **Gouvernance** | GitHub | Rulesets, Dependabot, CodeQL. |
| **CI/CD** | Jenkins | Quality gates (Rouge/Vert). |

---

<div align="center">
  <b>Fait avec ❤️ par Arij Belaid</b>
</div>
