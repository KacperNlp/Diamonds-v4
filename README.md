# Diamonds
This is a simple game with 5 levels, where player has to pass required score of current level to unlock next level. Also each level has highest score and I use local storage to set and save it for each level.<br/>
To increse score, player has to match diamonds with the same kind. </br>
kinds of diamonds: 
* yellow, 
* red, 
* purple, 
* white, 
* green,
* blue (but only in 4 and 5 level)

## About project
Game has 3 main layers (Main menu, board with levels and game map) and 2 side layers (settings and message after game with result).
* Levels layer - board with levels is generates every time when player will come in
* Game layer - each level doesn't have an assigned board/map with diamonds, this board is generates automatically when player opens the level.<br/><br/>
kinds of diamonds in levels:
* 1,2 and 3 - 5 kinds (yellow, red, purple, white and green)
* 4 and 5 - 6 kinds (one more 'blue')

## Media Queries
This project was created for desktop only. 

## Why I made this game 
I made this game for OPP learning as a task from course on Udemy

## Sources
* Link for course which was my inspiration to create this game: https://www.udemy.com/course/programowanie-obiektowe-w-javascript/
* Music: youtube audio library 
* Game sound(Diamonds sound): https://mixkit.co/free-sound-effects/

## Technologies
I used JavaScript, HTML and Sass in this project.<br/>

LIVE: https://naughty-shockley-1703d3.netlify.app/

status of project: finished 
