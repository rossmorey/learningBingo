## Learning Bingo

### Background

Repetitive studying techniques are boring for kids.  This is why so many educators invest hours "gamifying" their curricula.  Learning Bingo is one programmer's attempt to create an engaging context for repetitive learning tasks.

As in "regular" Bingo, the player's goal is to line up 5 tiles in a row.  Learning Bingo modifies the standard Bingo rules slightly by asking the player a question, e.g. "What is 4 + 4?"  The player selects a tile of value 8 or chooses to "Pass."  The game handles incorrect tile selections.

### Functionality & MVP

In this educational take on the game Bingo, users will be able to:

- [ ] Start a new game
- [ ] Select tiles on the board (correctly or incorrectly)
- [ ] Select "Pass" if they don't see the answer-tile
- [ ] Reset the game if they would like to start over.

In addition, the game will:
- [ ] Track board state, alerting the player when they've won the game.

### Wireframes

Learning Bingo will be a single screen application.  It will include buttons for:
  - "Start Game"
  - "Pass"
  - "Tile", there will be 25 of these selectable tiles
  - "Restart Game"
  - "Play Again"
The application will also include a list of nav links to the Github, and my LinkedIn.  

![wireframes](https://github.com/appacademy/job-search-curriculum/blob/master/job-search-projects/images/js_wireframe.jpeg)

### Architecture and Technologies

Learning Bingo game logic and interactivity will be built using Vanilla JS and jQuery.  Game interface will use HTML and CSS.  All scripts will be compiled using webpack.

There will be an `entry.js` file in addition to:
  - `game.js`
  - `board.js`
  - `questions.js`
  - `tiles.js`
  - `index.html`
  - `style.css`

`board.js`: this will create the board, including tiles, and render it into the DOM.

`game.js`: this script will handle back-end game logic including answer checking, play loop, and gameWon? check.

`tiles.js`: tiles.js will build tile objects to be sampled from and inserted into the board.

`questions.js`: this script will hold a list of questions and answer used to construct tiles and provide questions to the user.

### Implementation Timeline

**Day 1**: Install webpack.  Create a skeleton of the basic file structure, including entry file. Goals:
  - Green bundle with webpack
  - "Hello world"
  - Outline all major game functions.
  - Create static question/answer data.

**Day 2**: Render the entire game page including board with data filled in.  Install click handlers on each tile element that create an alert with the tile's id number.
  -
  -
  -

**Day 3**: Create the automata logic backend.  Build out modular functions for handling the different grid types along with their unique neighbor checks and rule sets.  Incorporate the automata logic into the `Board.js` rendering.  Goals for the day:

- Export an `Automata` object with correct type and handling logic
- Have a functional grid on the `Canvas` frontend that correctly handles iterations from one generation of the game to the next


**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional.  Goals for the day:

- Create controls for game speed, stop, start, reset, and shape type
- Have a styled `Canvas`, nice looking controls and title
- If time: include buttons on the side to toggle the color scheme of the cells


### Bonus features

I'd like to theme Learning Bingo around the reading concept of blending, i.e. combining phoneme sounds.  Using images and audio prompts, the game will say, "Do you have a tile that says C - A - T?"  The user would select the picture of a cat.

![wireframes](https://github.com/appacademy/job-search-curriculum/blob/master/job-search-projects/images/js_wireframe.jpeg)

Features I'd like to implement:

- [ ] Game asks audio questions.
- [ ] User can click a button to have the question repeated.
- [ ] Tiles show images instead of text.
- [ ] Tiles are animated as they flip.
