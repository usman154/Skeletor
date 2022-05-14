# ################################################################
# Docker file for wrapping nodejs service components
# Copyright 2019-20 AionDigital 
# ################################################################

# Using latest LTS version running on alpine
FROM node:12.13.0-alpine

# Will remain same for all containers.
# Version will be changed during CI/CD process
LABEL maintainer="AionDigital"
LABEL version="0.1.0 (alpha)"
LABEL description="Container for running conduit service component"

ARG PORT=3000

# Setting environemnt variables
# These variables will be different from application to application
ENV ENV_CDT_PORT=${PORT} \
    NODE_ENV=production \
    ENV_CDT_ENTITY=customers \
    ENV_CDT_DB_HOST=alsalam.database.windows.net \
    ENV_CDT_DB_USERNAME=Ad_Conduit \
    ENV_CDT_DB_PASSWORD=Admin123456 \
    ENV_CDT_DB_DIALECT=mssql \
    ENV_CDT_DB_NAME=Ad_Conduit \
    ENV_CDT_DB_PORT=1433

# Expose port 4000 to the host     
EXPOSE ${PORT}

# Working directory on which application binaries will be copied
WORKDIR /conduit/

# Copy all content from this folder (including subfolders)
# to a specific folder on the container
COPY . .

# Provide require authorities and run npm install
RUN chown -R node:node /conduit && \
        chmod 770 -R /conduit && \
        npm install

# Set user node for future commands
USER node

# RUN following command
CMD npm run start:prod
