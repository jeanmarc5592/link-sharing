# Frontend Mentor - Link-sharing app solution

This is a solution to the [Link-sharing app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Extra features](#extra-features)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Create, read, update, delete links and see previews in the mobile mockup
- Drag and drop links to reorder them
- Add profile details like profile picture, first name, last name, and email
- Preview their devlinks profile and copy the link to their clipboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account and log in (add user authentication to the full-stack app)

### Links

- [Solution URL](https://www.frontendmentor.io/solutions/link-sharing-app-nextjs-typescript-tailwind-postgres-prisma-QXy1D0u7Lb)
- [Live Site URL](https://link-sharing-jm.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- Tailwind CSS
- Prisma
- Typescript
- Postgres
- Vercel
- Mobile-first workflow
- [Next.js](https://nextjs.org/) - React framework

### What I learned

- How to implement an authentication workflow using `Next-Auth`
- How to upload images using `cloudinary`
- `Tailwind CSS` is not as bad as I thought
- How to implement a drag and drop functionality in the frontend and the backend (especially in combination with a database)
- How to use `Prisma` as an ORM and how to integrate it into a CI/CD pipeline on Vercel
- How to spin up a database on vercel and use it inside the project
- How to query and mutate data from the backend using `react-query`
- Seperating the logic from frontend and the backend
- How to use `Next.js 14` after it's major update

### Useful resources

- [Drag and Drop in React](https://www.robinwieruch.de/react-drag-and-drop/) - This helped me a lot for integrating the drag and drop functionality in the frontend.
- [Next Cloudinary](https://next.cloudinary.dev/) - This is an amazing package that makes the process of integrating and using `cloudinary` in your `Next.js` project much easier.
- [Chat GPT](https://chat.openai.com/) - Besides `Google` it offers a great help as your coding buddy.

## Extra features

I've added a few extra features that weren't in the challenge description. For me, this is an essential part of my process to bring in my own ideas and further hone my skills. It helps to think about, plan and finally implement a feature.

These are the extra features:

**Click Analysis**
- when a link is clicked, this statistic is recorded in the database
- the user then receives a graphic in the application for each link showing how often it has been clicked in the last 7 days
- it was a bit of a challenge to model the database in such a way that the click made is also saved correctly under the current day
- in addition, it was sometimes not easy to prepare the data correctly for display in the frontend, but it was a lot of fun

**Authentication via social media**
- in addition to the conventional authentication via email and password, the user can also authenticate himself with his Google and Github account
- the big challenge was that if he is already saved via another provider with the same email, the account is linked in the database so that he can authenticate himself with both providers in the future and both paths point to the same account, because emails should always be unique

## Author

- [Website](https://www.jean-marc.io)
- [Frontend Mentor](https://www.frontendmentor.io/profile/jeanmarc5592)
- [Instagram](https://www.instagram.com/jeanmarcmoeckel/)
