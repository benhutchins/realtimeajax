<?php

/**
 * Here we run a loop for 30 seconds, and every
 * second we see if there is any updates.
 */

$time = ( isset( $_REQUEST['time'] ) ? $_REQUEST['time'] : time() ) + 30;
while( --$time > 0 ) {
	// Check for an event
	if ( $event = is_there_an_event() ) {
		exit( json_encode( $event ) );
	}

	// Sleep a moment to get an update
	sleep(1);
}

/**
 * If we are here we have no updates,
 * so we exit to clear the CPU
 */
exit( json_encode( 'nothing' ) );

/**
 * Example function to check for an event
 */
function is_there_an_event() {

	// for our randomness we'll see if we can get the number 3
	if ( rand( 1, 3 ) == 3 ) {

		// just return some random 6 digit string
		return sprintf('%06x', rand(0, 16776960));

	}

	return false;

}

?>
