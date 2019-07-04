# stage: 1
FROM node:8
WORKDIR /app
COPY . ./
ADD yarn.lock /yarn.lock
ADD package.json /package.json
RUN yarn
RUN yarn build
ADD . /app
EXPOSE 3000
CMD ["yarn","start"]
