# #sportdevs community

Strapline.

## About the community

### Motivation

### Location

Join us on Discord.

## Contribute

Monorepo containing Sportdevs sites, apps, packages & scripts.

### Installation

#### Prerequisites

Ensure you have [NPM](https://github.com/nvm-sh/nvm) and [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) installed.

#### Dependencies

This project is a Yarn Workspace controlled monorepo. To install dependencies across all workspaces, simply run the following from the root folder:

```bash
yarn
```

### Workspaces

There are multiple workspaces in the monorepo:

#### [`brand`](brand)

Single package for housing Sportdevs logos, icons & designs for use across workspaces.

#### [`site`](site)

A Next.js site for the main Sportdevs web app.

The site will be, by default, accessible at [http://localhost:3000](http://localhost:3000) and concurrently run a dev server for building the [shared](shared) package.

```bash
yarn workspace site run dev
```

#### [`shared`](shared)

Shared scripts for use between workspaces.

To build the package:

```bash
yarn workspace shared run build
```
