pipeline {
    agent any

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
                        sh 'echo "Gitleaks OK (simulé)"'
                    }
                }
                stage('SAST (Semgrep)') {
                    steps {
                        sh 'echo "Semgrep OK (simulé)"'
                    }
                }
                stage('Dependencies (npm audit)') {
                    steps {
                        sh 'echo "NPM Audit OK (simulé)"'
                    }
                }
            }
        }

        stage('Build Image') {
            steps {
                sh 'echo "Docker build OK (simulé)"'
            }
        }

        stage('Image Scan (Trivy)') {
            steps {
                sh 'echo "Trivy OK (simulé)"'
            }
        }
    }
}
