# Build image
FROM node:12-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production

ARG NEXT_PUBLIC_GTM_ID
ENV NEXT_PUBLIC_GTM_ID $NEXT_PUBLIC_GTM_ID

RUN apk add --update tzdata

ENV TZ="Etc/GMT"

# Copy project root
COPY package.json .
COPY yarn.lock .

# Copy site
COPY ./site ./site

# Copy shared packages
COPY ./brand ./brand
COPY ./shared ./shared

# Install dependencies
RUN yarn install --pure-lockfile --non-interactive --production=false

# Build shared package
WORKDIR /usr/src/app/shared
RUN yarn build

# Build site
WORKDIR /usr/src/app/site
RUN yarn build

CMD ["yarn", "start"]
