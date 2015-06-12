Warning: This project was created in 2009 and has not been updated since. It was migrated from code.google.com when Google shutdown code hosting. I recommend using (socket.io)[http://socket.io/] if you want to implement real time data pushing to a browser.

## About
I've had many questions regarding my project [moo-comet](https://github.com/benhutchins/moo-comet), a comet implementation using Mootools and then recently I needed to get real time updates working on a project of my own, however my implementation was thrown together a while ago, when Comet was new and shy to the Internet world. I then decided to recreate my script in a method that would add more stability.

## How this is different
The issue with [Comet](https://en.wikipedia.org/wiki/Comet_(programming)) is getting it implementing it without being resource intensive. Keeping one active connection open (long-polling) like implemented by [moo-comet](https://github.com/benhutchins/moo-comet) result in loss of data when connection closes, memory leaks on both client and server side which result in crasheing and script failures, CPU will steadily increase as the connection stays awake. To fix this I've reimplemented comet with a self-closing connection that will reopen at intervals to reduce all of these concerns.

The client requests the server, the server then pushes updates as they come. Once a single update is found, you output it and then exit. A new connection will be started automatically be the client to await the next message. To prevent data loss, each message should contain a message id which is passed upon the new connection to prevent sending duplicates and to allow all new messages to be sent since the given message id. It is highly recommended you implement a queue system on the server.
