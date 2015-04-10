$(document).ready(function () {

var correctTools = 0;
$( init );

function init() {

  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctTools = 0;
  $('#tools').html( '' );
  $('#bin').html( '' );

  // Create the pile of shuffled tools
  var numbers = [ 1, 2, 3, 4, 5 ];
  numbers.sort( function() { return Math.random() - .5 } );

  for ( var i=0; i<5; i++ ) {
    $('<div><img src= "images/tool' + numbers[i] + '.svg"/></div>').data( 'number', numbers[i] ).attr( 'id', 'tool'+numbers[i] ).appendTo( '#tools' ).draggable( {
      containment: '#content',
      stack: '#tools img',
      cursor: 'move',
      revert: true
    } );
  }

  // Create the Tool slots
  var words = [ 'sissors', 'glue stick', 'hammer', 'screwdriver', 'wrench' ];
  for ( var i=1; i<=5; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#bin' ).droppable( {
      accept: '#tools div',
      hoverClass: 'hovered',
      drop: handleToolDrop
    } );
  }

}

function handleToolDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var toolNumber = ui.draggable.data( 'number' );

  // If the tool was dropped to the correct slot,
  // change the tool colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again

  if ( slotNumber == toolNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctTools++;
  } 
  
  // If all the tools have been placed correctly then display a message
  // and reset the tools for another go

  if ( correctTools == 5 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }
}
  //Play Again button
    $('#reset').click(function(){
        window.location.assign("day07.html");
    })

});