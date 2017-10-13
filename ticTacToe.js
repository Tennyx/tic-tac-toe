var xoState = 'X';

var xo = [
          '0','1','2',
          '3','4','5',
          '6','7','8'
          ];

var xoSwitch = {
                'X':'O',
                'O':'X'
                };

var drawCount = 0;

var playerCount = 0;

var winningCombos = [
                      [0,1,2],
                      [3,4,5],
                      [6,7,8],
                      [0,3,6],
                      [1,4,7],
                      [2,5,8],
                      [0,4,8],
                      [2,4,6]
                      ];

function buildTable(p){
  $('#tab').append(
  '<tr>\
    <td class="sq" id="box0"></td>\
    <td class="sq" id="box1"></td>\
    <td class="sq" id="box2"></td>\
  </tr>\
  <tr>\
    <td class="sq" id="box3"></td>\
    <td class="sq" id="box4"></td>\
    <td class="sq" id="box5"></td>\
  </tr>\
  <tr>\
    <td class="sq" id="box6"></td>\
    <td class="sq" id="box7"></td>\
    <td class="sq" id="box8"></td>\
  </tr>');
  
  $('#open').remove();
  $('#player').html("X starts.");

  if(p == 'oneX'){
    var rand = Math.floor((Math.random() * 8) + 1);
    $('#box' + rand.toString()).html('X');
    xo[rand] = xoState;
    xoState = xoSwitch[xoState];
    $('#player').html(xoState + "'s turn.");
    drawCount += 1;
  }
}

function gameOver(board){
  for(i=0;i<winningCombos.length;i++){
    var combo = winningCombos[i];
    if( (board[combo[0]] == board[combo[1]]) && (board[combo[0]] == board[combo[2]]) ){
      gameOverAlert('win');
      return;
    }
  }
  drawCount += 1;
  
  if(drawCount == 9){
    gameOverAlert('draw');
  }
}

function compMove(){
  var letterPlaced = false;

  for(i=0;i<winningCombos.length;i++){
    var comboSet = winningCombos[i];
    if(xo[comboSet[0]] == xo[comboSet[1]]){
      if(!isNaN(xo[comboSet[2]])){
        $('#box' + xo[comboSet[2]]).html(xoState);
        xo[comboSet[2]] = xoState;
        letterPlaced = true;
        break;  
      }  
    }
    else if(xo[comboSet[0]] == xo[comboSet[2]]){
      if(!isNaN(xo[comboSet[1]])){
        $('#box' + xo[comboSet[1]]).html(xoState);
        xo[comboSet[1]] = xoState;
        letterPlaced = true;
        break;  
      } 
    }
    else if(xo[comboSet[1]] == xo[comboSet[2]]){
      if(!isNaN(xo[comboSet[0]])){
        $('#box' + xo[comboSet[0]]).html(xoState); 
        xo[comboSet[0]] = xoState;
        letterPlaced = true;
        break; 
      }   
    }
  }

  if(!letterPlaced){
    for(i=0;i<xo.length;i++){
      if(!isNaN(xo[i])){
        $('#box' + xo[i]).html(xoState);
        xo[i] = xoState;
        break;
      }  
    }
  }
  gameOver(xo);
  xoState = xoSwitch[xoState];
  $('#player').html(xoState + "'s turn.");
}

function gameOverAlert(results){
  if(results == 'draw'){
    var result = 'Draw!'
  }
  if(results == 'win'){
    var result = xoState + ' Wins!'
  }
  $('#overholder').append(
    '<div class="overlay text-center">\
      <div id="winner">' + result + '</div>\
       Care to play again?\
      <br>\
      <button id="menu" class="btn btn-info">Menu</button>\
    </div>'
    )
  $('#player').remove();
  playerCount = 0;
  menu();
}

function menu(){
  $('#menu').on('click', function() {
      history.go(0);
  });
}

function actions(players){
  buildTable(players);
  $('.sq').on('click', function() {
    if(!isNaN($(this).html())){
      $(this).html(xoState);
      xo[this.id[3]] = xoState;
      gameOver(xo);
      xoState = xoSwitch[xoState];
      $('#player').html(xoState + "'s turn.");
      
        if(playerCount == 1){
          compMove();
        }
    }
  });
}

$(document).ready(function(){

  $('#oneplayer').on('click', function(){
    playerCount = 1;
    $("#question").html("Would you prefer X or O?");
    $("#oneplayer").remove();
    $("#twoplayer").remove();
    $('#open').append('<button id="xbutton" class="btn btn-info">X</button>');
    $('#open').append('<button id="obutton" class="btn btn-info">O</button>');

    
    $("#xbutton").on("click",function(){
      actions();
    });

    $("#obutton").on("click",function(){
      actions('oneX');
    });
  });
    

  $('#twoplayer').on('click', function(){
    actions();
  });
});