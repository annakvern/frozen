# Tag or Die - a 2-player tag game in TypeScript and p5.js
![Screenshot 2025-01-30 at 20 16 01](https://github.com/user-attachments/assets/578eca9c-5f84-4a17-abb9-2c5972312cd9)

## [Demo](https://frozen-flax.vercel.app/)

## Players:
2 players - the yellow and the green blob

## Game board:
Background with platforms on different heights, a trampoline to make the player jump higher, a teleport to move the player to the other teleport, pointy icicles that you don’t want to get stuck in, and icy spots that make you slip off the platform.

The two players start with some distance from each other and the it-player is randomised at start. There are 2 different maps to play; Winter and Summer.

## Game progress:

The game is multiplayer and allows for two players on the same game board, the yellow player and the green player. Each player starts with a timer of 60 seconds that counts down as long as you are “it” - the one to tag the other player. Hence, you want to be “it” as little time as possible, because that’s how you win.

As the game starts, it’s randomised which player starts. The player that is randomised to start as “it” gets a little “tag indicator” above it. When the it-player tags the other player, the other player becomes “it” and its timer starts to count down. The timer of the player who started as it stops as long as they’re being hunted.

The game is over when one of the players’ time is out.

### Details of the game:
- There will be a 0.5 sec delay when the it-player has tagged the other player.
- It’s not possible to jump through the platforms.
- It’s not possible to run through the “walls” of the board, you bounce.
- It’s not possible to run through the other player, you tag and bounce off of each other.
- As a player is moving, it will take approx 0.5 sec for it to stop as the player release the key.
- Getting stuck on icicles, the player will be released after 0.5 sec.
- Ending up on the icy patch of the platform will make the player slide off it.


## Player keys:

The keys give the player the ability to jump, move left and move right.

Player 1 uses the arrow keys
	Up-arrow = Jump
	Left-arrow = Move left
	Right-arrow = Move right
 
Player 2 uses WAD
  W = Jump
	A = Move left
	D = Move right
 
 ![Screenshot 2025-01-30 at 20 13 20](https://github.com/user-attachments/assets/8433c022-bc9e-46aa-aaf6-450a5a8b11a5)

		
![Screenshot 2025-01-30 at 20 14 00](https://github.com/user-attachments/assets/51c00b8f-c67a-42be-ab47-8837dc21836c)

Inspiration: https://www.crazygames.com/game/2-player-tag
