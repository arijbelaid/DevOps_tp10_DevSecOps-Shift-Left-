pipeline {
    agent any

    environment {
        // On utilise l'image Docker pour les outils
        TRIVY_IMAGE = 'aquasec/trivy:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Security Scans') {
            parallel {
                stage('Secrets (Gitleaks)') {
                    steps {
                        sh '''
                            docker run --rm -v "$PWD:/repo" ghcr.io/gitleaks/gitleaks:latest \
                              git /repo --verbose --report-path /repo/reports/gitleaks.json || true
                        '''
                    }
                }
                stage('SAST (Semgrep)') {
                    steps {
                        sh '''
                            mkdir -p reports
                            docker run --rm -v "$PWD:/src" semgrep/semgrep \
                              semgrep scan --config p/javascript --config p/owasp-top-ten --error /src || true
                        '''
                    }
                }
                stage('Dependencies (npm audit)') {
                    steps {
                        sh '''
                            npm audit --audit-level=high || true
                        '''
                    }
                }
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t vuln-app:ci .'
            }
        }

        stage('Image Scan (Trivy)') {
            steps {
                // On force l'échec (--exit-code 1) si faille CRITICAL
                sh '''
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                      ${TRIVY_IMAGE} image --severity CRITICAL --exit-code 1 vuln-app:ci
                '''
            }
        }
    }

    post {
        always {
            // Archiver les rapports
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
        }
    }
}
