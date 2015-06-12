#!/usr/bin/perl

###
## Here we run a loop for 30 seconds, and every
## second we see if there is any updates.
###

print( "Content-Type: text/html\n\n" );

$time = time() + 30;
do {
	## Check for an event
	$event = is_there_an_event();
	if ( $event ) {
		print "\"$event\"";
		exit();
	}

	## Sleep a moment to get an update
	sleep(1);
}
while( --$time > 0 );

###
## If we are here we have no updates,
## so we exit to clear the CPU
###
print '"nothing"';
exit();

###
## Example function to check for an event
###
sub is_there_an_event() {

	## for our randomness we'll see if we can get the number 3
	if ( int(rand(3)) == 0 ) {

		## just return some random 6 digit string
		return sprintf('%06x', rand(16776960));

	}

	return 0;

}
