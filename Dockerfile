FROM node:12.14.0-alpine3.11
WORKDIR /deployment
RUN apk add python3 make
ENV PORT=3000
ENV REACT_APP_ENDPOINT=TODO
ENV REACT_APP_GOOGLE_KEY=TODO
EXPOSE 3000
COPY . ./
RUN npm install
RUN npm rebuild || true
RUN npm run build
CMD npm run start
