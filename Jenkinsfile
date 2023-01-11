pipeline {
    agent any

    stages {
        stage('Run build.') {
            steps {
                echo 'Running make run-build.'
                sh 'make run-build'
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