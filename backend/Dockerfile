FROM node:16-alpine
# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN yarn
# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
RUN yarn build
# Start
EXPOSE 5004
CMD [ "node", "dist/index.js" ]
