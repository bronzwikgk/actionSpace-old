// KeyDown, KeyUp and KeyPress events
// If you want to respond to a key press then there are three events that you need to be aware of:

// KeyDown
// This event is triggered when a key is pressed.It is triggered for all keys, so it will be trigged when the user presses the shift key.
//     KeyUp
// This event is triggered when a key is depressed.
//     KeyPress
// This event is triggered when a key is sent to the browser.The shift, control and alt keys on their own do not generate a KeyPress event.
// Lets say that the user types a letter into a text box on a web page, then the order in which events are triggered would be: KeyDown, KeyPress, KeyUp.