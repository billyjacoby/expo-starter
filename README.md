# @gorhom/bottom-sheet bug MRE

- Install on iOS simulator
- Press show details
- Select the text input and MAKE SURE KEYBOARD IS SHOW
- Press the 'Show View One' button
- Sheet closes unexpectedly, when pressing show sheet you'll see the next view is rendered.

If the device keyboard isn't shown the issue doesn't happen
