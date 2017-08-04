let dialogue = 'Hello World';
let willSay = true;

api.playSound('assets/music.mp3');
api.text({ text: dialogue });

if (willSay) {
    api.text({ text: 'I am saying something.' });
}