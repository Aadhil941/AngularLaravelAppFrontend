pipeline {
    agent any

    environment {
        NVM_DIR = "$HOME/.nvm"
        PATH = "$NVM_DIR/versions/node/v22.2.0/bin:$PATH"
    }

    tools {nodejs "node"}

    stages {
        stage('Build') {
            steps {
                sh 'ls'
                sh 'npm -v'
                sh 'node -v'
                sh 'npm install'
                sh '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
                    nvm use 22.2.0 # Use the correct Node.js version
                    ng build # Run your ng command'
                // sh 'echo N | ng analytics off'
                // sh 'ng build'
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
