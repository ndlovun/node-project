pipeline {
    agent any

    stages {
        stage('Running ansible playbook.') {
            steps {
                echo 'Running ansible playbook.'
                sh 'ansible-playbook update-node-app.yml'
            }
        }
        
    }
    post {
        
        success {
            slackSend iconEmoji: ":+1:", color : "good", message: "Build deployed successfully - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
            }
        failure {
            slackSend iconEmoji: ":red_circle:", color : "danger", message: "Build failed  - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
            }
        
    }
    
}