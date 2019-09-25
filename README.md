# Expo Docker

Compile expo projects with docker

## Commands

### Initialize expo project

Replace the environment variables with your configuration

`docker run -e COMMAND=init -e TEMPLATE=blank -e PROJECT_NAME=demo -e PACKAGE_NAME=com.test.app -v $(pwd):/workspace/files -i -t dsilva2401/expo-docker`

### Serve project for development

Start serving project

`docker run -e COMMAND=serve -v $(pwd):/workspace/files -i -t dsilva2401/expo-docker`

### Deploy app

First you need to generate the keystore (for android)

`docker run -v $(pwd):/workspace/files -e COMMAND=gen-keys -e KEYSTORE_PATH=keys/android/key.jks -e KEYSTORE_ALIAS=appalias -e KEYSTORE_PASSWORD=password -i -t dsilva2401/expo-docker`

Compile and upload app for android

`docker run -v $(pwd):/workspace/files -e COMMAND=build:android -e KEYSTORE_PATH=keys/android/key.jks -e KEYSTORE_ALIAS=appalias -e KEYSTORE_PASSWORD=password -e USERNAME=user -e PASSWORD=password -i -t dsilva2401/expo-docker`