import { createAnimations } from "./animations.js";
import { initAudio } from "./audio.js";
import { checkControls } from "./controls.js";

const config = {
  type: Phaser.AUTO,
  width: 700,
  height: 400,
  backgroundColor: "#15004f",
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  //Imagenes, personajes y escenarios
  this.load.spritesheet("player", "assets/characters.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.image("floor", "assets/blocks/scenery/underground/floorbricks.png");
  this.load.spritesheet("enemy", "assets/entities/underground/goomba.png", {
    frameWidth: 16,
    frameHeight: 16,
  });

  //Audio, efectos, musica
  initAudio(this);
}

function create() {
  this.floor = this.physics.add.staticGroup();

  this.floor
    .create(0, config.height - 16, "floor")
    .setOrigin(0, 0.5)
    .refreshBody();

  this.floor
    .create(180, config.height - 16, "floor")
    .setOrigin(0, 0.5)
    .refreshBody();

  this.player = this.physics.add
    .sprite(50, 210, "player")
    .setOrigin(0, 1)
    .setGravityY(300)
    .setCollideWorldBounds(true);

  this.enemy = this.physics.add
    .sprite(250, config.height - 60, "enemy")
    .setOrigin(0, 1)
    .setGravityY(300)
    .setVelocityX(-50)
    .setCollideWorldBounds(true);

  this.physics.world.setBounds(0, 0, 2000, config.height);

  this.physics.add.collider(this.player, this.floor);

  this.physics.add.collider(this.enemy, this.floor);

  this.physics.add.collider(this.player, this.enemy, onHitEnemy, null, this);

  this.cameras.main.setBounds(0, 0, 2000, config.height);

  this.cameras.main.startFollow(this.player);

  createAnimations(this);

  this.keys = this.input.keyboard.createCursorKeys();
  this.enemy.anims.play("enemy_walk", true);

  function onHitEnemy(player, enemy) {
    if (player.body.touching.down && enemy.body.touching.up) {
      enemy.anims.play("enemy_dead", true);
      enemy.setVelocityX(0);
      player.setVelocityY(-200);
      this.sound.play('enemy-stomp');
      setTimeout(() => {
        enemy.destroy();
      }, 500);
      player.setVelocityY(-200);
    }
  }
}

function update() {
  checkControls(this);

  const { player, scene } = this;

  // If the player falls off the screen, they die
  if (player.y >= config.height) {
    player.isDead = true;
    player.anims.play("player_fall", true);
    player.setCollideWorldBounds(false);
    this.sound.play('game-over');
    setTimeout(() => {
      player.setVelocityY(-300);
    }, 100);

    setTimeout(() => {
      player.destroy();
      scene.restart();
    }, 1000);
  }
}
