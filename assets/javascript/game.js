document.addEventListener('DOMContentLoaded', function () {

    let chosenPlayer;
    let chosenEnemy;


    //Define an array of PLAYER objects
    const characters = [
        {
            name: "Finn",
            health: 100,
            attack: 9,
            image: '/assets/images/characters/player/Finn_with_bionic_arm-0.png',
            enemy: false
        },
        {
            name: "Jake",
            health: 95,
            attack: 10,
            image: '/assets/images/characters/player/JaketheDog.png',
            enemy: false
        },
        {
            name: "BMO",
            health: 50,
            attack: 5,
            image: '/assets/images/characters/player/bmo.png',
            enemy: false
        },
        {
            name: "Marceline",
            health: 70,
            attack: 10,
            image: '/assets/images/characters/player/marceline.png',
            enemy: false
        },
    ]

    //Define an array of ENEMY objects
    const enemies = [
        {
            name: "Ice King",
            health: 70,
            attack: 3,
            image: '/assets/images/characters/enemy/220px-Ice_King.png',
            enemy: true
        },
        {
            name: "Bucket Knight",
            health: 80,
            attack: 4,
            image: '/assets/images/characters/enemy/Bucket_knight.png',
            enemy: true
        },
        {
            name: "Lich King",
            health: 100,
            attack: 5,
            image: '/assets/images/characters/enemy/The_Lich_King.png',
            enemy: true
        }
    ]


    const buildCharacter = function (arr) {
        arr.forEach(function (character) {
            $('.characters').append(buildCharcterCard(character))
        })
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
                <p class="name mt-1">Name: <span>${character.name}</span></p>
                <p class="health mt-2">Health: <span>${character.health}</span></p>
                <p class="attack mt-1">Attack: <span>${character.attack}</span></p>
            </div>
        </div>`)
    }

    //Method 2
    //HTML built using jquery created elements, it creates the same div for player and enemy,
    //This function takes in two objects. It contains an inner function named builder.
    //This fn is used to append info based on chosen player/enemy sent to this fn as player, enemy
    //builder is used to return pre-built structure of elements.
    const buildBattleScreen = function (player, enemy) {
        console.log(this)
        //Element builder
        const builder = function (character) {
            let img = $('<img>').addClass('battleImage').attr({
                'data-name': character.name,
                src: character.image,
                alt: character.name
            })
            let infoName = $('<p>').text(`Name: ${character.name}`)
            let infoHP = $('<p>').text(`Health: ${character.health}`)
            let infoAttack = $('<p>').text(`Attack: ${character.attack}`)

            let charDiv = $('<div>').addClass('character')
            let portraitDiv = $('<div>').addClass('portrait').append(img)
            let infoDiv = $('<div>').addClass('info').append(infoName, infoHP, infoAttack)

            return charDiv.append(portraitDiv.append(infoDiv));
        }

        //OUR CHARACTERS NOW DRAWN ON THE DOM.
        $('.characters').append(builder(player))
            .append('<h1>FIGHT</h1>')
            .append(builder(enemy))
    }


    //This function beginBattle is called after enemy is chosen,
    //it appends info returned from buildBattleScreen after recieving both player and enemy objs.
    const beginBattle = function (player, enemy) {
        $('.characters').append(buildBattleScreen(player, enemy))
    }

    //END FUNCTIONS AND VARIABLE DECLARATION.





    //INIT GAME

    //Init game. Build character elements based on array using a function buildCharacter
    buildCharacter(characters);
    //Char select screen is now created, and displayed.


    // on click handler, it should look at enemy data-type=T/F (string)
    //the class of .charSelectImage is one time(during selection phases) and changed during battle,
    //thus, when in battle this onclick is not used.
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

            //STORE ENEMY
            enemies.forEach(function (enemy) {
                if (name === enemy.name) {
                    chosenEnemy = enemy;
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
        }
    })

});