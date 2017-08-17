/*
TODO:
 - calculate win/lose
   - on end of money: lose
   - on double money: win
 - play again?
*/

"use strict";
(function() {

    //красиви благинки {
    function Animate() {
        $('.shell1').addClass('animated');
        $('.shell2').addClass('animated');
        $('.shell3').addClass('animated');
    }

    function revealShell() {
        var shells = $('.shell');
        
        shells.click(function() {
            var that = $(this);

            that.addClass('reveal');

            shells.off('click');

            setTimeout(function() {
                that.hide();
                
                $('.shells').trigger('useranswer', {
                    userInput: that.attr('data-id')
                });

                 $('.shells').off('useranswer');

                that.removeClass('reveal');
            }, 3000);
        });
    }

    function positionDie(position) {
        $('.die').css('top', '3em');

        switch (position) {
            case 1:
                $('.die').css('left', '-57em');
                console.log(1);
                return 1;
                break;
            case 2:
                $('.die').css('left', '-37em');
                console.log(2);
                return 2;
                break;
            case 3:
                $('.die').css('left', '-17em');
                return 3;
                console.log(3);
                break;
            case 4:
                $('.die').css('left', '10em');
                console.log(3);
                break;
        }
    }
    // } до тук 

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
        return player;
    }

    function startGame() {
        $('.user-input').hide();
        $('.message').fadeIn();
    }

    function getRandomNumber() {
        return Math.round(Math.random() * 2) + 1;
    }

    function Game() {
        let bet = checkBet(player),
            winPosition = getRandomNumber(),
            shell = 0;
        
        $('.show-current-bet').html('CURRENT BET: ' + bet);

        setTimeout(function() {
            shell = positionDie(winPosition);
            console.log('answer: ' + shell);
            $('.shell').removeClass('reveal');
            revealShell();
            $('.shell').removeClass('animated');
        }, 8000);

        $('.shells').on('useranswer', function(event, data){
            console.log('User Input: ' + data.userInput);
            result(winPosition, data.userInput, bet);
        });
    }

    function beginShuffling() {
        $('.message').fadeOut();
        Animate();
    }

    function checkBet(visitor) {
        var bet = $('.bet-input').val();
        if (bet > visitor.money) {
            bet = visitor.money;
        }
        return bet;
    }

    function win(won) {
        player.money += parseFloat(won);
        $('.show-money').html('MONEY: ' + player.money);
    }

    function lose(lost) {
        player.money -= parseFloat(lost);
        $('.show-money').html('MONEY: ' + player.money);
    }

    function populateInfo() {
        let name = player.name,
            money = player.money;

        $('.show-money').html('MONEY: ' + money);
        $('.show-name').html('NAME: ' + name);
    }

    function result(ballPosition, userPosition, currBet) {
        console.log(ballPosition + ' ' + userPosition)

        if(ballPosition == userPosition) {
            win(currBet);
        }
        else {
            lose(currBet);
        }

        $('.play-again').fadeIn();

        if(player.money <= 0){
            $('.play-again').hide();
            $('.result').html('You lost all your money. See you next time. GAME OVER!');
        }
        else if(player.money >= player.startMoney * 2) {
            $('.play-again').hide();
            $('.result').html('YOU WIN. Congratulations, you managed to win vs the computer');            
        }
        else {
            checkAnswer();
        }
    }

    function gameWithInterface() {
        beginShuffling();
        Game();
    }

    function checkAnswer() {
        let yes = $('.yes'),
            no = $('.no');
        $('.yes').on('click', function() {
            console.log(21);
            $('.play-again').hide();
            startGame();
          
            $('.shell').show();
            positionDie(4);
            
            yes.off('click');
            no.off('click');
        });
        no.click(function() {
            $('.play-again').hide();            
            $('.result').html('Thank you for playing! You go home with ' + player.money + '$. Hope to see you soon');
            yes.off('click');
            no.off('click');
        });

        
    }

    function loopGame() {
        //start new game

        if (player.money <= 0) {
            console.log('The game is over! You lost all your money! Thank you for playing! See you soon!!!');
        } else if (player.money >= player.startMoney * 2) {
            console.log('Congratulations!!! YOU JUST WON!!!');
        } else {
            console.log('Would you like another round?');
            askForNewGame();
            // gameInConsole();
        }


    }

    function askForNewGame() {
        $('.play-again').fadeIn();
    }

    $('.start-button').on('click', function() {
        createPlayer();
        populateInfo();
        startGame();
    });

    $('.begin').on('click', function() {
        populateInfo();
        gameWithInterface();
    });
})();