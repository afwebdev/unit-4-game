document.addEventListener('DOMContentLoaded', function () {

    let gameStarted = false;
    let chosenPlayer;
    let chosenEnemy;


    //Define a charcters array of Objects with character info
    const characters = [
        {
            name: "finn",
            health: 100,
            attack: 9,
            image: '/assets/images/characters/player/Finn_with_bionic_arm-0.png',
            enemy: false
        },
        {
            name: "jake",
            health: 95,
            attack: 10,
            image: '/assets/images/characters/player/JaketheDog.png',
            enemy: false
        },
        {
            name: "bmo",
            health: 50,
            attack: 5,
            image: '/assets/images/characters/player/bmo.png',
            enemy: false
        },
        {
            name: "marceline",
            health: 70,
            attack: 10,
            image: '/assets/images/characters/player/marceline.png',
            enemy: false
        },
    ]

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


    //Init game. Build character elements based on array using a function buildCharacter
    buildCharacter(characters);
    //Char select screen is now created, and displayed.


    // on click handlers here, it should look at enemy type ?? not sure stuck here.
    //the attribute of .charSelectImage is one time(during selection phases) and changed during battle?
    $('.characters').on('click', '.charSelectImage', function (e) {
        // console.log(this)
        // console.log(e)

        let isEnemy = this.dataset.enemy;
        let name = this.dataset.name;

        //if true, its an enemy,
        //CLEAR THE SCREEN, STORE THE ENEMEY, COMMENCE THE BATTLE.
        if (isEnemy === "true") {
            $('.characters').html('')
            enemies.forEach(function (enemy) {
                if (name === enemy.name) {
                    chosenEnemy = enemy;
                }
            })
            //Commence battle with both enemy and player selected character.
            //some function() call to begin battle here


            //ELSE, CLEAR THE SCREEN, SHOW CHARCTER SELECT SCREEN.
        } else {
            $('.characters').html('')
            console.log('is not an enemy')
        }
    })



    // $('.characters').on('click', '.charSelectImage', function (event) {

    //     let playerChosenName = this.dataset.name;
    //     characters.forEach(function (i) {
    //         if (playerChosenName === i.name) {
    //             chosenPlayer = i;
    //         }
    //     })
    //     // make a call to function to set up a game here.
    //     //the function should clear screen, build a new one with enemy array.
    //     gameSetup(chosenPlayer)
    // })





    //NOTHING HERE CURRENTLY IN USE, KEEPING FOR REF.

    const gameSetup = function (player) {
        //Remove (player select screen)
        $('.characters').html('')
        //Change instruction message
        $('#instruction').text('Choose An Enemy!')

        //Store a new Character Element for chosen character
        let characterElement = $(`
            <div class="character">
                <div class="portrait">
                    <img class="player" data-name="${player.name}"
                    src="${player.image}" alt="${player.name}">
                </div>
                <div class="info">
                    <p class="name mt-1">Name: <span>${player.name}</span></p>
                    <p class="health mt-2">Health: <span>${player.health}</span></p>
                    <p class="attack mt-1">Attack: <span>${player.attack}</span></p>
                </div>
            </div>`)





    }//Gamesetup function END




















});