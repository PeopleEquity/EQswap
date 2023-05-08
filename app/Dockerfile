FROM node
WORKDIR /app
COPY . /app
ENV HOST 0.0.0.0
ENV PORT 3003

EXPOSE 3003

# RUN npm i
RUN yarn install
RUN yarn build
CMD yarn start
