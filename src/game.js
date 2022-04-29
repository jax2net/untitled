var Phaser = require('phaser');
var cfg = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        "default": 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    }
};
var game = new Phaser.Game(cfg);
function preload() {
}
function create() {
}
function update() {
}
