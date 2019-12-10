#/bin/bash

# Get current shorthand commit hash
GIT_HASH=$(git rev-parse --short HEAD)
echo "Using commit $GIT_HASH"

# Repo Path
REPO_PATH=$1

# go to each folder and build docker image and push

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
                    kubectl set image deployment $current_tutorial $current_tutorial=hasura/$current_tutorial:$GIT_HASH
    			fi
       		done;
  	done;



