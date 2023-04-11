# Mars Rover

This is a Mars Rover simulation.
You input the rover' first position, tell it which moves it will do and hit 'Send Moves' button.
After it, the page will print the final position of Mars Rover!

Example:

![mars-rover](https://user-images.githubusercontent.com/28909189/213068146-828c57af-aa25-481f-b4ba-a1c97c80725f.png)

## Requirements

- [XAMPP](https://www.apachefriends.org/pt_br/index.html) (or any another MySQL Server software running)
- [Node](https://nodejs.org/en) (most recent version)

## Setup

Open your terminal on an empty folder and run the following commands:

```js
git clone git@github.com:joaoefornazari/mars-rover.git .
npm install
adonis migration:run // Before running this command, start a MySQL server on port 3306
```

This will install all the project's dependencies and prepare the project environment on your machine.

After this, to run the project, run

```
node server.js
```

and access `http://localhost:3333` on your web browser.
