getCard = function() {
    var card = Math.round( Math.random() * 10 );

    if ( card < 3 ) {
        return card - 1 + getCard();
    }

    return card;
};

lose = function( $button ) {
    
    var $new = $button.siblings( '.new' );

    $new.html( '' );

    $button.html( 'nooo' );
    $button.addClass( 'lose' );

    var $em = $button.closest( '.player' )
                     .siblings( '.player' )
                     .find( 'em' );

    $em.html( + $em.html() + 1 );

    //$( '#again' ).removeClass( 'hidden' );
};

win = function( $button ) {
    
    var $new = $button.siblings( '.new' );

    $new.html( '' );

    $button.html( 'yesss :D' );
    $button.addClass( 'win' );

    var $em = $button.siblings( 'h2' )
                     .children( 'em' );

    $em.html( + $em.html() + 1 );

    //$( '#again' ).removeClass( 'hidden' );
};

$( '.player button' ).click( function() {


    var $this = $( this );
    var $new  = $this.siblings( '.new' );
    var $sum  = $this.siblings( '.sum' );

    if ( $this.hasClass( 'lose' )
        ||
        $this.hasClass( 'win' )
    ) {
        return;
    }

    var card = getCard();

    var sum = + $sum.html() + card;

    if ( sum > 21 ) {
        lose( $this );
    }

    if ( sum == 21 ) {
        win( $this );
    }

    $sum.html( sum );
    $new.html( + card );

} );

$( '#again' ).click( function() {

    var $this = $( this );

    $( '.player button' ).removeClass( 'win lose' );
    $( '.player button' ).html( 'hit me' );

    //$this.addClass( 'hidden' );

    var player1Score = $( '.player.one .sum' ).html();
    var player2Score = $( '.player.two .sum' ).html();

console.log('player1Score');
console.log(player1Score);

console.log('player2Score');
console.log(player2Score);

    $( '.player span' ).html( '0' );

    if ( player1Score > 21 
         ||
         player2Score > 21 
    ) {
        return;
    }



    if ( player1Score > player2Score ) {

        var $em = $( '.player.one em' );

        $em.html( + $em.html() + 1 );

    }
    if ( player2Score > player1Score ) {

        var $em = $( '.player.two em' );

        $em.html( + $em.html() + 1 );

    }
} );
