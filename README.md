# Project Name

This project is based on company-capstone for Bangkit Program Batch 2 2023

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Run in your local](#run-locally)

## Introduction

This repository houses the frontend of web-based platform dedicated to fostering collaboration and communication among BCF and its numerous partners working towards expediting the TB elimination process.

## Features

- Authentication (Login and Register)
- Activity Progress
- News
- Report
- Chat (Discussion Forum)
- Institution
- Profile

## Directory Structure

```
├── public
├── src
│   ├── assets: for image and any static file
│   ├── core: reusable components like input form, dropdown, etc.
│   ├── feature
│       ├── components: reusable components, but only related to particular feature
│       ├── model: model that being used in particular feature
│       ├── repository: unify access to API
│   ├── helper: any general function, such as generate array
│   ├── layout: components that being used across pages, like navigation bar
│   ├── page: represent any pages in the web-pages
```

## Run locally

Follow this guide to run the project on your local machine.

1. Clone this repository

```bash
git clone https://github.com/groupbmpi/sms-fe.git
```

2. Install the dependencies

```bash
npm install
```

3. Run the project using vite development server

```bash
npm run dev
```

## Acess the Deployed Project

[https://sms-project-405815.et.r.appspot.com/activity](https://sms-project-405815.et.r.appspot.com/activity)
