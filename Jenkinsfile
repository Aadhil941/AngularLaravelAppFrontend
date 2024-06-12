pipeline {
    agent any

    environment {
        // Define environment variables
        NODE_VERSION = '20.14.0'
        S3_BUCKET = 'aadhil-web'
        AWS_REGION = 'us-east-1'
    }

    stages {
        stage('Install Node.js') {
            steps {
                script {
                    // Install Node.js version defined in the environment variable
                    def nodeHome = tool name: 'NodeJS', type: 'NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
            }
        }

        stage('Checkout Code') {
            steps {
                // Checkout code from your version control
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                // Build the Angular project
                sh 'npm run build --prod'
            }
        }

        stage('Upload to S3') {
            steps {
                script {
                    // Define the build directory (this can vary based on your Angular configuration)
                    def buildDir = 'dist/my-first-project/browser'
                    // Upload the build files to S3
                    sh """
                        aws s3 sync ${buildDir} s3://${S3_BUCKET} --region ${AWS_REGION}
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deployment to S3 successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
