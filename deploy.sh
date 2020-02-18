#/bin/bash

# Get current shorthand commit hash
GIT_HASH=$(git rev-parse --short HEAD)
echo "Using commit $GIT_HASH"

# Repo Path
REPO_PATH=$1
DEPLOY=$2

# go to each folder, build docker image and push
tutorials() {
    for f in $REPO_PATH/tutorials/*;
        do
            [ -d $f ] && cd "$f"
            for tutorial in $f/*;
                do
                    if [[ -d $tutorial ]]; then
                        cd "$tutorial"
                        current_tutorial=${PWD##*/}
                        # temp workaround for hasura backend tutorial
                        if [ $current_tutorial = "hasura" ]; then
                            current_tutorial="hasura-backend"
                        fi
                        cd "tutorial-site"
                        echo "hasura/$current_tutorial:$GIT_HASH"
                        echo "Building docker image"
                        docker build -t hasura/$current_tutorial:$GIT_HASH .
                        echo "Pushing docker image"
                        docker push hasura/$current_tutorial:$GIT_HASH
                        echo "Updating kubernetes deployment"
                        #kubectl set image deployment $current_tutorial $current_tutorial=hasura/$current_tutorial:$GIT_HASH
                    fi
                done;
        done;
}

# build homepage
homepage() {
    if [[ -d "services/homepage" ]]; then
        cd "services/homepage"
        echo "Building docker image for learn homepage"
        #docker build -t hasura/learn-homepage:$GIT_HASH .
        echo "Pushing docker image for learn homepage"
        #docker push hasura/learn-homepage:$GIT_HASH
        echo "Updating kubernetes deployment for learn homepage"
        kubectl set image deployment/homepage homepage=hasura/learn-homepage:$GIT_HASH
    fi
}

# build auth
authserver() {
    if [[ -d "services/backend/auth-server" ]]; then
        cd "services/backend/auth-server"
        echo "Building docker image for auth server"
        docker build -t hasura/learn-auth-jwt-server:$GIT_HASH .
        echo "Pushing docker image for auth server"
        docker push hasura/learn-auth-jwt-server:$GIT_HASH
        echo "Updating kubernetes deployment for auth server"
        #kubectl set image deployment/auth-jwt-server auth-jwt-server=hasura/learn-auth-jwt-server:$GIT_HASH
    fi
}

authwebhook() {
    if [[ -d "services/backend/auth-webhook" ]]; then
        cd "services/backend/auth-webhook"
        echo "Building docker image for auth webhook"
        docker build -t hasura/learn-auth-webhook:$GIT_HASH .
        echo "Pushing docker image for auth webhook"
        docker push hasura/learn-auth-webhook:$GIT_HASH
        echo "Updating kubernetes deployment for auth webhook"
        #kubectl set image deployment/auth-webhook auth-webhook=hasura/learn-auth-server:$GIT_HASH
    fi
}

$2
