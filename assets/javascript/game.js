document.addEventListener('DOMContentLoaded', function () {

    let chosenPlayer;
    let chosenEnemy;


    //Define an array of PLAYER objects
    const characters = [
        {
            name: "Finn",
            health: 100,
            attack: 8,
            image: './assets/images/characters/player/Finn_with_bionic_arm-0.png',
            enemy: false,
            attackModifier: 1
        },
        {
            name: "Jake",
            health: 100,
            attack: 8,
            image: './assets/images/characters/player/JaketheDog.png',
            enemy: false,
            attackModifier: 1
        },
        {
            name: "BMO",
            health: 100,
            attack: 8,
            image: './assets/images/characters/player/bmo.png',
            enemy: false,
            attackModifier: 1
        },
        {
            name: "Marceline",
            health: 100,
            attack: 8,
            image: './assets/images/characters/player/marceline.png',
            enemy: false,
            attackModifier: 1
        },
    ]

    //Define an array of ENEMY objects
    let enemies = [
        {
            name: "Ice King",
            health: 100,
            attack: 5,
            image: './assets/images/characters/enemy/220px-Ice_King.png',
            enemy: true
        },
        {
            name: "Bucket Knight",
            health: 120,
            attack: 8,
            image: './assets/images/characters/enemy/Bucket_knight.png',
            enemy: true
        },
        {
            name: "Lich King",
            health: 150,
            attack: 25,
            image: './assets/images/characters/enemy/The_Lich_King.png',
            enemy: true
        }
    ]


    const buildCharacter = function (arr) {
        if (arr.length >= 1) {
            arr.forEach(function (character) {
                $('.characters').append(buildCharcterCard(character))
            })
        } else {
            $('#instruction').text('Winner Winner!')
            $('.characters').html('<button id="reload" onClick="history.go(0)">Play Again</button>')
        }
    }
    //Method 1
    //Written HTML to be used inside append.
    //This Function takes an object, and uses its values to return dynamic info/html template
    const buildCharcterCard = function (character) {
        return (`
        <div class="character">
            <div class="portrait">
                <img class="charSelectImage" data-name="${character.name}" data-enemy="${character.enemy}"
                src="${character.image}" alt="${character.name}">
            </div>
            <div class="info">
                <p>Name: <span>${character.name}</span></p>
                <p>Health: <span>${character.health}</span></p>
                <p>Attack: <span>${character.attack}</span></p>
            </div>
        </div>`)
    }

    //Method 2
    //HTML built using jquery created elements, it creates the same div for player and enemy,
    //This function takes in two objects. It contains an inner function named builder.
    //This fn is used to append info based on chosen player/enemy sent to this fn as player, enemy
    //builder is used to return pre-built structure of elements.
    const buildBattleScreen = function (player, enemy) {
        //Element builder
        const builder = function (character) {
            let img = $('<img>').addClass('battleImage').attr({
                'data-name': character.name,
                'data-enemy': character.enemy,
                'src': character.image,
                'alt': character.name
            })
            let infoName = $('<p>').text(`Name: ${character.name}`)
            let infoHP = $('<p>').attr('data-enemy', character.enemy).text(`Health: ${character.health}`)
            let infoAttack = $('<p>').text(`Attack: ${character.attack}`)

            let charDiv = $('<div>').addClass('character')
            let portraitDiv = $('<div>').addClass('portrait').append(img)
            let infoDiv = $('<div>').addClass('info').append(infoName, infoHP, infoAttack)

            return charDiv.append(portraitDiv.append(infoDiv));
        }

        //OUR CHARACTERS NOW DRAWN ON THE DOM, also, append some battleground html.
        $('.characters').append(builder(player))
            .append(`<div id="centerAtkDiv">
                        <div style="height: 100%">
                            <button id="attack">Attack!</button>
                            <h1>FIGHT</h1>
                        </div>
                        <div id="battleLog">
                            <h3 id="battleHeader">BattleLog:</h3>
                        </div>
                    </div>
                        `)
            .append(builder(enemy))
    }


    //This function beginBattle is called after enemy is chosen,
    //it appends info returned from buildBattleScreen after recieving both player and enemy objs.
    const beginBattle = function (player, enemy) {
        $('#instruction').text('BATTLE TIME!');
        $('.characters').append(buildBattleScreen(player, enemy))
    }

    const attackEnemy = function (attackValue, attackModifier) {
        chosenEnemy.health -= (attackValue * attackModifier)
        $('#battleHeader').after(`<p class="battleEntry"> ${chosenPlayer.name} hit for ${attackValue * attackModifier} against ${chosenEnemy.name}</p>`)
        if (chosenEnemy.health <= 0) {
            //ENEMY IS DEAD. SHOW ENEMY CHARCTER SELECT SCREEN,
            //  or Winner screen, via buildCharacter call, increase the attackModifier++ of player.
            $('#instruction').text('Choose Your Opponent!')
            $('.characters').html('')
            buildCharacter(enemies)
            console.log('enemy dead')
        } else {
            //this is a cool conditional jQuery selector. select (if) data-enemy = true
            $(`[data-enemy = ${chosenEnemy.enemy}]`).text(chosenEnemy.health)
        }
        chosenPlayer.attackModifier++;
    }

    //Player attack function, recieves an attackVal, reduces val from player health, 
    //checks if health < 0, dead screen, replay button.
    const attackPlayer = function (attackValue) {
        chosenPlayer.health -= chosenEnemy.attack;
        $('#battleHeader').after(`<p class="battleEntry"> ${chosenEnemy.name} hit for ${attackValue} against ${chosenPlayer.name}</p>`)
        if (chosenPlayer.health <= 0) {
            $('#instruction').text('DEAD.. Play again?')
            $('.characters').html('<button id="reload" onClick="history.go(0)">Play Again</button>')
            console.log('player dead')
        } else {
            $(`[data-enemy = ${chosenPlayer.enemy}]`).text(chosenPlayer.health)
        }
    }
    //END FUNCTIONS AND GLOBAL VARIABLE DECLARATIONS




    //INIT GAME

    //Init game. Build character elements based on array using a function buildCharacter
    buildCharacter(characters);
    //Char select screen is now created, and displayed.


    // on click handler, looks at enemy data-type=T/F (string)
    //the class of .charSelectImage is one time(during selection phases) and changed during battle,
    //thus, when in battle this onclick is not used.
    //This uses .characters as the parent for reference, used when recreating elements
    $('.characters').on('click', '.charSelectImage', function () {
        //uses dataset info to decide which array to iterate, and to assign that character obj,
        //to its defined, -> chosenPlayer or chosenEnemy
        let isEnemy = this.dataset.enemy;
        let name = this.dataset.name;

        //An enemy was clicked at char select screen, we go to battle now!
        //CLEAR THE SCREEN, STORE THE ENEMY, COMMENCE THE BATTLE.
        if (isEnemy === "true") {
            //CLEAR THE SCREEN
            $('.characters').html('');

            //STORE ENEMY, if chosen named enemy is inside array, make it our new chosenEnemy (enemy)
            enemies.forEach(function (enemy) {
                if (name === enemy.name) {
                    chosenEnemy = enemy;

                    //Alter the enemy array using filter to remove our chosen enemy from play.
                    //Filter runs through each object, assigning (filterEnemy), and returning when true,
                    //if our chosen enemy name is found in the array.
                    enemies = enemies.filter(function (filterEnemy) {
                        return filterEnemy.name != enemy.name
                    })
                }
            })

            //Commence battle with both enemy and player selected character.
            //beginBattle(player, enemy)
            beginBattle(chosenPlayer, chosenEnemy)

            //PLAYER CHARACTER WAS CHOSEN(Clicked)
            //ELSE, CLEAR THE SCREEN, STORE SELECTED CHARACTER, SHOW ENEMY CHARCTER SELECT SCREEN.
        } else {
            //CLEAR THE SCREEN
            $('.characters').html('')
            //STORE THE PLAYER SELECTED CHARACTER
            characters.forEach(function (character) {
                if (name === character.name) {
                    chosenPlayer = character;
                }
            })
            //SHOW ENEMY SELECT SCREEN
            buildCharacter(enemies);
            $('#instruction').text('CHOOSE YOUR OPPONENT!');
        }
    })

    //Click handler used for attack button. Decrement chosen enemies stats(HP) in obj, 
    //Call a function to do work on obj manipulation.
    //also need to keep track of ammount of attacks, to be used as multiplier?
    $('.characters').on('click', '#attack', function () {
        //The user has clicked the attack button, 
        attackEnemy(chosenPlayer.attack, chosenPlayer.attackModifier);
        attackPlayer(chosenEnemy.attack)
    })

});