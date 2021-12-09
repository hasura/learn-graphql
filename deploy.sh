#/bin/bash

# Get current shorthand commit hash
GIT_HASH=$(git rev-parse --short HEAD)
echo "Using commit $GIT_HASH"

# Repo Path
REPO_PATH=$1
DEPLOY=$2

build_image() {
    echo "hasura/$1$2:$GIT_HASH"
    echo "Building docker image"
    docker build -t hasura/$1$2:$GIT_HASH .
    echo "Pushing docker image"
    docker push hasura/$1$2:$GIT_HASH
    echo "Updating kubernetes deployment"
    echo "kubectl set image deployment $1$2 $1$2=hasura/$1$2:$GIT_HASH"
    kubectl set image deployment $1$2 $1$2=hasura/$1$2:$GIT_HASH
}

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
                        if [ $current_tutorial = "nextjs" ]; then
                            current_tutorial="nextjs-fullstack-serverless"
                        fi
                        if [ $current_tutorial = "postgresql" ]; then
                            current_tutorial="database-postgresql"
                        fi
                        if [ $current_tutorial = "mysql" ]; then
                            current_tutorial="database-mysql"
                        fi
                        if [ $current_tutorial = "mssql" ]; then
                            current_tutorial="database-mssql"
                        fi
                        if [[ -d "tutorial-site-zh" ]]; then
                            cd "tutorial-site-zh"
                            build_image $current_tutorial "-zh"
                            cd ".."
                        fi
                        if [[ -d "tutorial-site-ja" ]]; then
                            cd "tutorial-site-ja"
                            build_image $current_tutorial "-ja"
                            cd ".."
                        fi
                        cd "tutorial-site"
                        build_image $current_tutorial ""
                    fi
                done;
        done;
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
