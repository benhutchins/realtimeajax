#!/usr/bin/python

import sys, time, random

###
## Example function to check for an event
###
def is_there_an_event():

	## for our randomness we'll see if we can get the number 3
	n = random.randrange(0,3)
	if n is 0:

		## just return some random 6 digit string
		return '%06x' % random.randrange(16776960)

	return 0

###
## Here we run a loop for 30 seconds, and every
## second we see if there is any updates.
###
if __name__ == '__main__':
	print "Content-Type: text/html\n"

	ts = time.time() + 30
	while --ts > 0:
		## Check for an event
		event = is_there_an_event()
		if event:
			print "\"" + event + "\""
			sys.exit()

		## Sleep a moment to get an update
		time.sleep(1)

	###
	## If we are here we have no updates,
	## so we exit to clear the CPU
	###
	print '"nothing"'
	sys.exit()
