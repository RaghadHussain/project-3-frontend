# BEELIE Frontend

## Overview

Beelie is a social blogging platform built for girls to share posts, follow each other, and interact through likes and comments. Girls sign up, create a profile, publish posts, and explore what others are posting — with follows, saves, and notifications to keep up with activity.

## Live Application
- Frontend: [Deployed Frontend URL](https://beelie.netlify.app/)
- Backend API: [Deployed Backend URL](https://project-3-backend-fl7z.onrender.com)
- Backend Repository: [Backend Repository URL](https://github.com/RaghadHussain/project-3-backend)


## Screenshots



## Technologies Used

1. React
2. Vite
3. React Router
4. Axios
5. CSS
6. React Icons
7. React Context API (auth state management)
8. ESLint

## Features

- User registration and sign-in
- Protected routes for authenticated-only pages
- Create, edit, and delete posts, including image uploads
- Explore page to browse posts from all users
- Like and comment on posts
- Follow / unfollow other users, with followers and following lists
- User profiles with editable info and profile picture
- Save posts for later
- Notifications page
- Search for users

## Project Structure

```
src/
├── assets/
├── components/
├── context/
├── pages/
│   ├── notification/
│   ├── post/
│   ├── profile/
│   └── save/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js
- The backend API has to be running. See the [Backend Repository](https://github.com/RaghadHussain/project-3-backend).

### Installation

**1. Clone the repository**

```
git clone https://github.com/RaghadHussain/project-3-frontend
cd project-3-frontend
```

**2. Install dependencies**

```
npm i
```

**3. Create the environment file**

Create a `.env` file in the root directory:

```
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

**4. Start the development server**

```
npm run dev
```

Go to: http://localhost:5173

## Application Routes

| Route | Page | Access |
| --- | --- | --- |
| `/` | Home page | Public |
| `/sign-up` | Sign up page | Public |
| `/sign-in` | Sign in page | Public |
| `/explore` | Explore posts | Public |
| `/dashboard` | Dashboard | Authenticated |
| `/post/new` | Create post | Authenticated |
| `/post/save` | Saved posts | Authenticated |
| `/post/:id` | Post details | Authenticated |
| `/post/:id/edit` | Edit post | Authenticated |
| `/notification` | Notifications | Authenticated |
| `/:id` | User profile | Authenticated |
| `/:id/edit` | Edit profile | Authenticated |
| `/:id/followers` | Followers list | Authenticated |
| `/:id/following` | Following list | Authenticated |



## User Stories
1.	As a girl user, I want to have a website blog only for us.
2.	As a girl user, I want to have an account with unique username and password.
3.	As a girl user, I want to have profile page.
4.	As a girl user, I want to follow other girls in website. 
5.	As a girl user, I want to view other girls’ profiles.
6.	As a girl user, I want to post in page for all girls to view.
7.	As a girl user, I want to comment in other girls’ posts.
8.	As a girl user, I want to interact with other girls’ comments.
9.	As a girl user, I want to like other girls’ posts.
10.	As a girl user, I want to have user-friendly website.
11.	As a girl user, I want to delete, edit my posts.
12.	As a girl user, I want to delete, edit my comments.
13.	As a girl user, I want to have a notifications page.
14.	As a girl user, I want to be able to save girls’ other posts.
15.	As a girl user, I want to be able to see my followers and followings other girls.



## Future Enhancements

- Direct messaging (DM) between users
- Real-time notifications (e.g. via Sockets) 
- Dark mode
- Post categories or tags with filtering
- Reporting/blocking users for moderation


## Team Members

| Name | GitHub |
| --- | --- |
| Raghad Husain | [Raghad Github Profile](https://github.com/RaghadHussain)
| Zainab Ali Ammar | [Zainab Github Profile](https://github.com/zainabaliammarali-cloud)

## Credits

Special thanks to Mr. Omer, our Lead Instructor, and Mr. Zaid, our Assistant Instructor without their support and efforts this project wouldn't have come together.
