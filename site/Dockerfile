# Build image
FROM node:12-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production

ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID $NEXT_PUBLIC_GA_MEASUREMENT_ID

ARG REVUE_API_KEY
ENV REVUE_API_KEY $REVUE_API_KEY

RUN apk add --update tzdata

ENV TZ="Etc/GMT"

# Copy project root
COPY package.json .
COPY yarn.lock .

# Copy site
COPY ./site ./site

# Copy shared packages
COPY ./packages/brand ./packages/brand
COPY ./packages/shared ./packages/shared

# Install dependencies
RUN yarn install --pure-lockfile --non-interactive --production=false

# Build shared package
WORKDIR /usr/src/app/packages/shared
RUN yarn build

# Build site
WORKDIR /usr/src/app/site
RUN yarn build

CMD ["yarn", "start"]
