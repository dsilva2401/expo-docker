# Variables
IMAGE_NAME=expo-docker
ACCOUNT_NAME=dsilva2401
CURRENT_VERSION=v1.0.0 # Update with the current server version

# Commands
build:
	@docker build -t ${IMAGE_NAME} .

test:
	@docker run -e COMMAND=test --tty ${IMAGE_NAME}

publish-image:
	@docker tag ${IMAGE_NAME} ${strip $(ACCOUNT_NAME)}/${strip $(IMAGE_NAME)}:${CURRENT_VERSION}
	@docker push ${strip $(ACCOUNT_NAME)}/${strip $(IMAGE_NAME)}:${CURRENT_VERSION}