const Phaser = require('phaser');
const socket = new WebSocket('ws://localhost:5001');

const obj = {
    action: 'movement',
    x: 50,
    y: 25
};

socket.addEventListener('open', function(event)
{
    socket.send(JSON.stringify(obj));
});

socket.addEventListener('message', function(event)
{
    console.log(`origin: ${event.origin}`);
    console.log(`data: ${event.data}`);
});

const cfg = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    }
};

const game = new Phaser.Game(cfg);
let player: any;
let platforms: any;
let cursors: any;

function preload(this: any)
{
    this.load.image('ground', '../assets/platform.png');
    this.load.spritesheet('dude', '../assets/dude.png', {
        frameWidth: 32,
        frameHeight: 48
    });
}

function create(this: any)
{
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setCollideWorldBounds(true);

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();
}

function update()
{
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}
