pipeline {
    agent any

    tools {nodejs "node"}

    stages {
        stage('Build') {
            steps {
                sh 'ls'
                sh 'npm -v'
                sh 'node -v'
                sh "chown -R jenkins:jenkins /root/.nvm"
                sh "chmod -R 755 /root/.nvm"
                sh "chmod +x -R /root/"
                sh 'npm install'
                // sh 'echo N | ng analytics off'
                sh 'ng build'
                sh 'ls'
                sh 'cd dist && ls'
                sh 'cd dist/my-first-project/browser && ls'
            }
        }
        stage('S3 Upload') {
            steps {
                withAWS(region: 'us-east-1', credentials: '1c5644eb-96aa-4963-a678-82878015799e') {
                    sh 'ls -la'
                    sh 'aws s3 cp dist/my-first-project/browser/. s3://aadhil-web/ --recursive'
                }
            }
        }
    }
}
