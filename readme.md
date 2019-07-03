# AdventureTime Game!

## What is this?

My Unit-4-Game, using jQuery to create, and manipulate DOM elements.

## How to play

Choose between 4 characters **Finn, Jake, BMO, or Marceline**, to battle against:

- Ice King
- Lich King
- Bucket Knight.

Each player takes turns, when player attacks, each subsequent attack is 2x the last attack rating. Enemy attack remains constant.

# Functions

| Function                           | Use                                                                                                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buildCharacter(array)`            | Checks if given array is > 1(all enemies dead) and creates a character card via returned result from buildCharacterCard function                           |
| `buildCharacterCard(character)`    | buildCharacter passes this function an object of the array of **character** or **enemies** arrays inside of forEach Loop.                                  |
| `buildBattleScreen(player, enemy)` | Receives two params, player and enemy, builds a player vs enemy screen with this object set.                                                               |
| `beginBattle(player, enemy)`       | Called at enemy select screen, upon choosing enemy, appends return of **buildBattleScreen(x,y)** to page.                                                  |
| `attackEnemy(value, modifier)`     | called during battle, reducing enemy health based on attack modifier of player, checks for 0 enemy health, and calls to build enemy select screen if true. |
| attackPlayer(attackValue)          | called during battle, reducing player health based on current enemy attack rating                                                                          |
