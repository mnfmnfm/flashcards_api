# Modularization Exercise

Starting point for Robust Server Architecture: Modularizing Router

## Jan 27 AM Lecture

- Good morning!
  - I just learned that your due dates are off by a week - I'm working to get it fixed ASAP. Please keep flagging things like this!
  - Please make sure you do the weekly survey. I'll read every word (that I can see) & report back when I can.
- Review topics (for breakout rooms)
  - What does CRUD stand for? How do CRUD map to HTTP methods?
    - Create, Read, Update, Delete
    - Post,   Get,  Put,    Delete
  - A truism of web development is that every app is a CRUD app. What resources (and there should be multiple) are we CRUDing on each of these types of websites? For example, on a blog, Michelle's answer is that we CRUD blog posts, maybe comments.
    - Social networks (say, LinkedIn)
      - Ads
      - Posts
      - User accounts / profiles
      - Photos
    - AirBnB
      - Listings/houses
      - Reservations (time, who)
      - Ratings
      - User profiles
      - messages
      - payments
- "Advanced Tips"
  - Passing data between middleware - DRYing up our code even more
  - Method not allowed errors
  - Nested routes

X making a post route
X explain what middleware is again
  - Middleware: callback functions that run within our Express app when a request comes in
X error handler vs. not found handler, how next works
X app.use vs app.get
