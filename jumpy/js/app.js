$( '.cell' ).on( 'click', function() {
    
    var 

    $this = $( this );

    if ( $this.hasClass( 'target' ) ) {
        hitTarget( $this );

        return;
    }

    if ( $this.hasClass( 'black' ) ) {
        $( '.cell' ).removeClass( 'active' )
                    .removeClass( 'target' );

        $this.toggleClass( 'active' );
        
        if ( ! $this.hasClass( 'active' ) ) {
            return;
        }

        showTargets();

        return;
    }

} );



$( '.cell' ).each( function() {

    var 

    $this = $( this ),
    col   = $this.data( 'col' ),
    row   = $this.data( 'row' );

    //$this.html( col + ',' + row );

    $this.addClass( 'col' + col );
    $this.addClass( 'row' + row );

} );



updateScore();


$( '.target' ).on( 'click', function() {

} );



$( '.win' ).click( function() {
    window.location.href = window.location.href;
} );

$( '.red' ).click( function() {
    window.location.href = window.location.href;
} );



function showTargets() {

    var 

    $active = $( '.active' ),
    col     = $active.data( 'col' )
    row     = $active.data( 'row' ),

    $up     = $( '.col' + col + '.row' + ( row - 2 ) ),
    $up2    = $( '.col' + col + '.row' + ( row - 1 ) ),
    $right  = $( '.col' + ( col + 2 ) + '.row' + row ),
    $right2 = $( '.col' + ( col + 1 ) + '.row' + row ),
    $down   = $( '.col' + col + '.row' + ( row + 2 ) ),
    $down2  = $( '.col' + col + '.row' + ( row + 1 ) ),
    $left   = $( '.col' + ( col - 2 ) + '.row' + row ),
    $left2  = $( '.col' + ( col - 1 ) + '.row' + row );

    if ( $up2.hasClass( 'black' )
         &&
         $up.hasClass( 'white' )
    ) {
        $up.addClass( 'target' );
    }

    if ( $right2.hasClass( 'black' )
         &&
         $right.hasClass( 'white' )
    ) {
        $right.addClass( 'target' );
    }

    if ( $left2.hasClass( 'black' )
         &&
         $left.hasClass( 'white' )
    ) {
        $left.addClass( 'target' );
    }

    if ( $down2.hasClass( 'black' )
         &&
         $down.hasClass( 'white' )
    ) {
        $down.addClass( 'target' );
    }

}



function updateScore() {

    var score = $( '.black' ).length;

    $( '#score' ).html( score );

    if ( score == 1 ) {
        $( '.cell' ).addClass( 'win' );
    } else {
        if ( ! checkForRemainingMoves() ) {
            $( '.cell' ).addClass( 'red' );
        }
    }
}



function hitTarget( $target ) {

    var 

    $active   = $( '.active' ),

    colActive = $active.data( 'col' ),
    colTarget = $target.data( 'col' ),

    rowActive = $active.data( 'row' ),
    rowTarget = $target.data( 'row' ),

    diffCol = colTarget - colActive,
    diffRow = rowTarget - rowActive,

    col = colTarget,
    row = rowTarget;

    if ( diffCol == 0 ) {
        if ( diffRow == -2 ) {
            row = rowActive - 1;
        }

        if ( diffRow == 2 ) {
            row = rowActive + 1;
        }
    }

    if ( diffRow == 0 ) {
        if ( diffCol == -2 ) {
            col = colActive - 1;
        }

        if ( diffCol == 2 ) {
            col = colActive + 1;
        }
    }

    $( '.col' + col + '.row' + row ).addClass( 'white' )
                                    .removeClass( 'black' );

    $active.addClass( 'white' )
           .removeClass( 'black' );

    $target.addClass( 'black' )
           .removeClass( 'white' );

    $( '.cell' ).removeClass( 'active' )
                .removeClass( 'target' );

    updateScore();

}



function checkForRemainingMoves() {

    var

    hasRemainingMoves = false;

    $( '.cell' ).each( function() {
        
        var

        $this = $( this );

        var 

        col     = $this.data( 'col' )
        row     = $this.data( 'row' ),

        $up     = $( '.col' + col + '.row' + ( row - 2 ) ),
        $up2    = $( '.col' + col + '.row' + ( row - 1 ) ),
        $right  = $( '.col' + ( col + 2 ) + '.row' + row ),
        $right2 = $( '.col' + ( col + 1 ) + '.row' + row ),
        $down   = $( '.col' + col + '.row' + ( row + 2 ) ),
        $down2  = $( '.col' + col + '.row' + ( row + 1 ) ),
        $left   = $( '.col' + ( col - 2 ) + '.row' + row ),
        $left2  = $( '.col' + ( col - 1 ) + '.row' + row );

        if ( $up2.hasClass( 'black' )
            &&
            $up.hasClass( 'white' )
        ) {
            hasRemainingMoves = true;
        }

        if ( $right2.hasClass( 'black' )
            &&
            $right.hasClass( 'white' )
        ) {
            hasRemainingMoves = true;
        }

        if ( $left2.hasClass( 'black' )
            &&
            $left.hasClass( 'white' )
        ) {
            hasRemainingMoves = true;
        }

        if ( $down2.hasClass( 'black' )
            &&
            $down.hasClass( 'white' )
        ) {
            hasRemainingMoves = true;
        }


    } );

    return hasRemainingMoves;
}


