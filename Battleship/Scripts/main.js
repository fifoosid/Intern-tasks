'use strict';
(function($, undefined) {
    $(function() {

        class Ship{
            constructor(size, type){
                this.vertical = false;
                this.size = size;
                this.type = type;
                this.positions = [];
            }
            rotateShip() {
                this.vertical = !this.vertical;
            }
        }

        class Carrier extends Ship{
            constructor(size){
                super(size);        
                this.size = 5;
                this.type = 1;
            }
        }
        class Battleship extends Ship{
            constructor(size){
                super(size);        
                this.size = 4;
                this.type = 2;
            }
        }
        class Cruiser extends Ship{
            constructor(size){
                super(size);
                this.size = 3;
                this.type = 3;
            }
        }
        class Submarine extends Ship{
            constructor(size){
                super(size);        
                this.size = 3;
                this.type = 4;
            }
        }
        class Destroyer extends Ship{
            constructor(size){
                super(size);        
                this.size = 2;
                this.type = 5;
            }
        }

        class Player {
            constructor(name, order){ 
                this.name = name;
                this.order = order;
                this.carrier = new Carrier();
                this.battleship = new Battleship();
                this.cruiser = new Cruiser;
                this.submarine = new Submarine;
                this.destroyer = new Destroyer();
                this.ships = [this.carrier, this.battleship, this.cruiser, this.submarine,
                    this.destroyer];
                this.takenPositions = [];
                this.hit = [];
            }
            
            enterShips() {
                var wrapper = $('<div class="entering"></div>'),
                    that = this;

                wrapper.append($('.board').clone());
                wrapper.append($('.player-ready').clone());
                wrapper.append($('.show-ships').clone());
                wrapper.appendTo('.enter-ships');

                $('.enter-ships > .board').fadeIn();

                $('.rotate').on('click', function() {
                    var toRotate = $(this).parent();
                    toRotate.toggleClass('column');

                    switch(toRotate.children().length - 1) {
                        case 5:
                            that.carrier.rotateShip();
                            break;
                        case 4: 
                            that.battleship.rotateShip();
                            break;
                        case 3:
                            if(toRotate.attr('ship-type') == 3) {
                                that.cruiser.rotateShip();
                            }
                            else if(toRotate.attr('ship-type') == 4) {
                                that.submarine.rotateShip();
                            }
                            break;
                        case 2: 
                            that.destroyer.rotateShip();
                            break;
                    }

                })

                $('.player-ready').on('click', function() {
                    if(that.order == 1) {
                        $('.entering').remove();                
                        player2.enterShips();
                    }
                    else {
                        $('.entering').remove();
                        $('.turn-announcment').fadeIn();

                        //creating board:
                        board = new GameBoard(player1, player2);
                        board.startGame();
                    }
                })

                $('.ship').on('click', function() {
                    let selection = $(this),
                        currShip;

                    $('.ship').removeClass('selected');
                    selection.addClass('selected');

                    //mooving ships to the board
                    $('.board:first div').bind('click', function() {
                        let size = selection.children().length - 1;
                        
                        let index = $(this).index();
                        
                        let currPosition = selection.attr('ship-type');
                        //position ship on th board
                        if(!that.ships[currPosition - 1].vertical){
                            let flag = false;
                            if((index % 10)  <= 10 - size) {
                                for(var i = 0; i < size; i++) {
                                    if($(this).parent().children().eq(index + i).attr('taken') != undefined) {
                                        flag = true;
                                    }
                                }
                                if(flag) {
                                    alert('Sorry, you can\'t place it right there ');
                                    return;index / i
                                }
                                else {
                                    for(var i = 0; i < size; i++) {
                                    $(this).parent().children().eq(index + i)
                                        .addClass('on-board')
                                        .attr('taken', 'taken');

                                        that.ships[currPosition - 1].positions.push(index + i);
                                    }
                                }
                                
                            }
                            else {
                                for(var i = 0; i < size; i++) {
                                    if($(this).parent().children().eq(parseInt((index / 10).toString().split(".")[0], 10) * 10 + 9 - i).attr('taken') != undefined) {
                                        flag = true;
                                    }
                                }
                                if(flag) {
                                    alert('Sorry, you can\'t place it right there ');                         
                                    return;
                                }
                                else {
                                    for(var i = 0; i < size; i++) {
                                    $(this).parent().children().eq(parseInt((index / 10).toString().split(".")[0], 10) * 10 + 9 - i)
                                        .addClass('on-board')
                                        .attr('taken', 'taken');

                                        that.ships[currPosition - 1].positions.unshift(parseInt((index / 10).toString().split(".")[0], 10) * 10 + 9 - i);
                                        
                                    }
                                }
                                
                            }
                        }
                        else {
                            let flag = false;
                            if(parseInt((index / 10).toString().split(".")[0], 10) <= 10 - size) {
                                for(var i = 0; i < size; i++) {
                                    if($(this).parent().children().eq(index + i * 10).attr('taken') != undefined) {
                                        flag = true;
                                    }
                                }
                                if(flag) {
                                    alert('Sorry, you can\'t place it right there');
                                    return; 
                                }
                                else {
                                    for(var i = 0; i < size; i++) {
                                        $(this).parent().children().eq(index + i*10)
                                        .addClass('on-board')
                                        .attr('taken', 'taken');

                                        that.ships[currPosition - 1].positions.push(index + i*10);
                                        
                                    }
                                }
                            }
                            else {
                                for(var i = 0; i < size; i++) {
                                    if($(this).parent().children().eq(index + i * 10).attr('taken') != undefined) {
                                        flag = true;
                                    }
                                }
                                if(flag) {
                                    alert('Sorry, you can\'t place it right there');
                                    return; 
                                }
                                else {
                                    for(var i = 0; i < size; i++) {
                                        $(this).parent().children().eq((90 + index % 10) - i*10)
                                            .addClass('on-board')
                                            .attr('taken', 'taken');

                                        that.ships[currPosition - 1].positions.unshift((90 + index % 10) - i*10);                                    
                                    }
                                }

                                
                            }


                        }

                        //hide ship and add to taken positions from current ship to all taken positions
                        for(var i = 0; i < that.ships.length; i++) {
                            if(currPosition == that.ships[i].type) {
                                selection.hide();
                                for( var j = 0; j < that.ships[i].positions.length; j++) {
                                    that.takenPositions.push(that.ships[i].positions[j]);
                                }
                            }
                        }
                    $('.board:first div').unbind('click');
                    })
                })
            }
            
        }

        class GameBoard {
            constructor(pl1, pl2) {
                this.player_1 = pl1;
                this.player_2 = pl2;
                this.turn = true;//true- player1 turn, false- player2 turn
            }

            startGame(){
                $('.board').clone()
                .appendTo('.game')
                .addClass('player-1');
                $('.board').eq(1).clone()
                .appendTo('.game')
                .addClass('player-2');

                this.game();
            }

            playing(playerToPlay, opponent) {
                let isAnimating = false;
                let that = this;
                let playerTiles = playerToPlay.order == 1 ? '.player-2 div' : '.player-1 div';
                let animationSelector = playerToPlay.order == 1 ? '.right' : '.left';
                let animationClass = playerToPlay.order == 1 ? 'right-animated' : 'left-animated';

                $('.turn-announcment').text(playerToPlay.name + '\'s turn');

                $(playerTiles).on('click', function() {
                    if(isAnimating) {
                        return;
                    }

                    isAnimating = true;

                    let current = $(this),
                        index = current.index(),
                        isOccupied = false;

                    for(var i = 0; i < opponent.takenPositions.length; i++) {
                        if(opponent.takenPositions[i] == index) {
                            isOccupied = true;
                        }
                    }

                    $(animationSelector).addClass(animationClass);
                    
                    setTimeout(function() {
                        $(animationSelector).removeClass(animationClass);

                        if(isOccupied) {
                            current.addClass('hit');
                            isOccupied = false;
                            opponent.hit.push(index);

                            if(opponent.hit.length == opponent.takenPositions.length) {
                                setTimeout(function() {
                                    alert(playerToPlay.name + ' wins!');
                                }, 500);
                            }

                            isAnimating = false;
                        }
                        else {
                            current.addClass('miss');
                            that.turn = !that.turn;
                            isAnimating = false;
                            that.game();
                        }
                    }, 1000);
                });
            }

            game() {
                $('.player-2 div, .player-1 div').off('click');

                if(this.turn) {
                    this.playing(this.player_1, this.player_2);
                }
                else {
                    this.playing(this.player_2, this.player_1);
                }
            }
        }

        var board;
        var player1 = new Player('Filip', 1);
        var player2 = new Player('Deni', 2);

        $('.new-game').on('click', function() {
            $(this).hide();
            //enter ships:
            player1.enterShips();
        })
    });
})(jQuery);