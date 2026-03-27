pipeline {
  agent any

  stages {
    stage('Prepare Env') {
      when {
        beforeAgent true
        anyOf {
          changeset "Dockerfile"
          changeset "package.json"
          changeset "pnpm-lock.yaml"
          changeset "tsconfig.json"
          changeset "tsconfig.app.json"
          changeset "tsconfig.node.json"
          changeset "vite.config.ts"
          changeset "index.html"
          changeset "public/**"
          changeset "src/**"
        }
      }
      steps {
        withCredentials([
          file(credentialsId: 'farm-flow-app-env', variable: 'APP_ENV_CREDENTIAL_FILE'),
        ]) {
          sh '''
            APP_ENV_FILE=.env.production
            cp "$APP_ENV_CREDENTIAL_FILE" "$APP_ENV_FILE"
            chmod 600 "$APP_ENV_FILE"
          '''
        }
      }
    }

    stage('Deploy') {
      when {
        beforeAgent true
        anyOf {
          changeset "Dockerfile"
          changeset "package.json"
          changeset "pnpm-lock.yaml"
          changeset "tsconfig.json"
          changeset "tsconfig.app.json"
          changeset "tsconfig.node.json"
          changeset "vite.config.ts"
          changeset "index.html"
          changeset "public/**"
          changeset "src/**"
        }
      }
      steps {
        sh '''
          set -eu

          timestamp=$(date +%s)
          DIST_DIR=/www/app
          
          if [ ! -d "$DIST_DIR" ]; then
            mkdir -p "$DIST_DIR"
          fi
          
          TEMP_DIST_DIR="dist_$timestamp"

          cleanup() {
            rm -rf "$TEMP_DIST_DIR"
          }

          trap cleanup EXIT

          docker buildx build \
            --output "type=local,dest=./$TEMP_DIST_DIR" \
            .

          rsync -av --delete "./$TEMP_DIST_DIR/" "$DIST_DIR"

          find "$DIST_DIR" -type d -exec chmod 755 {} +
          find "$DIST_DIR" -type f -exec chmod 644 {} +
        '''
      }
    }
  }
  
  post {
    always {
      sh '''
        APP_ENV_FILE=.env.production
        rm -f "$APP_ENV_FILE"
      '''
    }
  }
}
