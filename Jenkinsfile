pipeline {
    agent any 
    
    environment {
        registry = "mrpapdiamond/testing"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }
    
    stages {
        stage('Clone'){
            steps{
                git 'https://github.com/mrpapdiamond/NodeJS.git'
            }
        }
        stage('SonarTests') {
            steps{
                script{
                    docker.image('newtmitch/sonar-scanner').inside('-v /var/run/docker.sock:/var/run/docker.sock --entrypoint="" ') {
                        sh "/usr/local/bin/sonar-scanner -Dsonar.projectKey=NodeTesting  -Dsonar.projectBaseDir=/var/lib/jenkins/workspace/test -Dsonar.sources=/var/lib/jenkins/workspace/test -Dsonar.host.url=http://192.168.213.130:9000/ -Dsonar.login=73f3ea5d58a441df30b520105d9954ad073920e5"
                    }     
                }
            }
        }
        // stage('SAST') {
        //     steps {
        //         sh "/var/jenkins_home/sonar-scanner-4.7.0.2747-linux/bin/sonar-scanner -Dsonar.projectKey=NodeTesting  -Dsonar.projectBaseDir=/var/lib/jenkins/workspace/test -Dsonar.sources=/var/lib/jenkins/workspace/test -Dsonar.host.url=http://192.168.213.130:9000 -Dsonar.login=73f3ea5d58a441df30b520105d9954ad073920e5"
        //     }
        // }
        stage('SCA'){
         steps{
            // sh 'npm install'
            dependencyCheck additionalArguments: '-s . -o /var/lib/jenkins/report -f ALL --disableNodeAudit --disableYarnAudit --disableBundleAudit', odcInstallation: 'SCA'
            }
        }
        stage('Building Docker Image'){
            steps{
                script{
                    dockerImage = docker.build registry + ":v1.$BUILD_NUMBER"
                }
            }
        }
        stage('Deploying Docker Image to Dockerhub'){
            steps{
                script{
                    docker.withRegistry('',registryCredential){
                    dockerImage.push()
                    }
                }
            }
        }
        stage('Running Docker Image'){
            steps{
                script{
                    dockerImage.run('-p 3000:3000 --name testing')
                }
            }
        }
        stage('DAST'){
            steps{
                sh 'docker run --user root -v /var/lib/jenkins/report:/zap/wrk/ -dt --name owasp owasp/zap2docker-stable /bin/bash'
                sh 'docker exec owasp zap-baseline.py -t http://192.168.213.130:3000/ -r report.html -I'
                sh 'docker cp owasp:/zap/wrk/report.html /var/lib/jenkins/report/report.html'
                sh 'docker rm -f owasp'
            }
        }
        stage('Cleaning up'){
            steps{
                sh "docker rm -f testing"
                sh "docker rmi -f $registry:v1.$BUILD_NUMBER"
            }
        }
    }
}
