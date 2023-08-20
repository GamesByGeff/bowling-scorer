# bowling-scorer
This is what I was able to come up with for a basic scoring application for a game of bowling. I have it set up only for one player currently, however it should meet all the requirements for this little exercise!


Here is a basic summary of what was done:

Import Dependencies: We imported necessary dependencies such as React components, CSS styles, images, and the BowlingScorer class for scoring calculations.

Header Component: We created a Header functional component to display the app's title and logo at the top of the page.

Frame Component: We created a Frame functional component to display each individual frame's information on the scoreboard, including frame number, boxes for rolls, and the running score.

Controls Component: We created a Controls functional component that allows users to roll the ball and reset the game. It dynamically generates buttons based on the number of pins left standing (pinsUp) and handles user input.

bowlingScorer Component: This BowlingScorer class encapsulates the core logic for calculating bowling scores. It's used in the React app to handle the game's scoring calculations and provide score data to display on the scoreboard component.

ScoreBoard Class Component: We created a ScoreBoard class component to manage the game logic. It initializes a new instance of the BowlingScorer class, tracks the game's score data, and provides methods to handle rolling and resetting the game. The pinsUp method calculates the remaining pins for the current roll.

Render Scoreboard: The ScoreBoard component renders the player's name, the scoreboard frames, and the controls for rolling and resetting the game.

Main App Component: The App functional component is the main component that renders the header, the ScoreBoard component, and a dynamic background using the ParticlesBg component.

By combining these components and classes, we've created a bowling scoring app that allows users to simulate a bowling game, roll the ball, and see their score updated in real-time.
