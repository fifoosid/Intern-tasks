(function() {

    //create player
    class Player {
        constructor(_name, _money, _startMoney) {
            this.name = _name;
            this.money = _money;
            this.startMoney = _startMoney;
            parseInt(this.money);
            parseInt(this.startMoney);
        }
    }
    var player = new Player('', 0, 0);

    function createPlayer() {
        var mon = $('.enter-money').val();
        player = new Player($('.enter-name').val(), parseFloat(mon, 10), parseFloat(mon, 10));
        console.log(typeof($('.enter-money').val()));
        return player;
    }

    function startGame() {
        $('.user-input').hide();
        $('.message').fadeIn();
    }

    function beginShuffling(call) {
        //if called for the first time
        if (call === 1) {
            $('.message').hide();
            $('.ball-input-console').fadeIn();
            printInfoConsole();
        } else {
            $('.ball-input-console').hide();
            $('.message').fadeIn();
            // printInfoConsole();
        }

    }

    function getRandomNumber() {
        console.log(Math.round(Math.random() * 2));
        return Math.round(Math.random() * 2);
    }

    function checkBet(visitor) {
        var bet = $('.bet-input').val();
        if (bet > visitor.money) {
            bet = visitor.money;
        }
        return bet;
    }

    function printInfoConsole() {
        var currBet = checkBet(player); //returning the ready bet
        console.log(player.name + ' is playing with ' + player.money);
        console.log('Current bet: ' + currBet);
        console.log('1    2    3');
        console.log('Choose where you would like to put the ball?')
    }

    function win(won) {
        player.money += parseFloat(won);
        console.log('Now you have: ' + player.money);
    }

    function lose(lost) {
        player.money -= parseFloat(lost);
        console.log('Now you have: ' + player.money);

    }

    //main logic is here
    function gameInConsole(call) {
        if (call) {
            var currBet = checkBet(player); //returning the ready bet
            let userBall = $('.ball-enter-console').val();
            console.log('You chose: ' + userBall + ' cup.');
            // let ball = getRandomNumber();
            let ball = 2;

            //index starts at 0
            var printBall = [' ', ' ', ' '];
            if (userBall == ball + 1) {
                console.log('You win! :)');
                printBall[ball] = 'o';

                win(currBet);
            } else {
                console.log('You lose! :(');
                printBall[ball] = 'o';

                lose(currBet);
            }

            console.log('1   2   3');
            console.log(printBall[0] + '   ' + printBall[1] + '   ' + printBall[2]);

            loopGame();
            return player.money;
        } else {
            console.log(213);
            askForNewGame();
        }
    }

    function checkAnswer() {
        var answer = $('.play-again-input').val();
        if (answer == 'y') {
            $('.play-again').hide();
            beginShuffling();
        } else {
            console.log($('.play-again').val());
            console.log('Thank you for playing!');
        }
    }

    function loopGame() {
        //start new game

        if (player.money <= 0) {
            console.log('The game is over! You lost all your money! Thank you for playing! See you soon!!!');
        } else if (player.money >= player.startMoney * 2) {
            $('.ball-input-console').fadeOut();
            console.log('Congratulations!!! YOU JUST WON!!!');
        } else {
            console.log('Would you like another round?');
            askForNewGame();
            // gameInConsole();
        }


    }

    function askForNewGame() {
        $('.ball-input-console').hide();
        $('.play-again').fadeIn();
    }

    $('.start-button').on('click', function() {
        createPlayer();
        startGame();
    });

    $('.begin').on('click', function() {
        beginShuffling(1);
    });

    $('.enter-ball-position').on('click', function() {
        gameInConsole(1);
    });
    $('.new-game-button').on('click', function() {
        checkAnswer();
    });
})();