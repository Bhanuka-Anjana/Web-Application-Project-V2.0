pipeline {
    agent any
    environment {
        GIT_REPO = 'https://github.com/Bhanuka-Anjana/Web-Application-Project-V2.0.git' 
      }

    stages {
		
		stage('Clean workspace') {
            steps {
                cleanWs()
            }
        }
		
        stage('Clone Repository with poll enabled') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }
		
		stage('Remove existing Docker Images') {
            steps {
				sh 'sudo docker rmi mongo:4.4.25 traveltrails_frontend traveltrails_backend --force'
				sh 'sudo docker system prune -f'
            }
        }
		
        stage('Build Docker Images') {
            steps {
                sh 'docker-compose up --build'
            }
        }

    
    }

  
}