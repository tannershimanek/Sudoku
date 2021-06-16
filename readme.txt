Explanation on how I used JSON for my project.
----------------------------------------------

My JSON object is a snapshot of the current players game state. What this means, is that 
if a player is playing a game and decides to close the page, when they join the game they 
will be able to pick up where they left off.

I achieve that by saving the current game grid, with the solution to the puzzle in the 
JSON object. On top of that, I save the time the player was at, and the difficulty the player
has selected. The final piece of information that gets saved is the username of the player. 

All of this information is display in my grid.html page. This information can be found in both
the game grid itself and under the 'JSON Data' header. Please note that 'grid' and 'solution'
pairs must be a 9 x 9 grid.

- Tanner Shimanek