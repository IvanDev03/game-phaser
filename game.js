import { createAnimations } from "./animations.js";

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
  this.load.spritesheet("player", "assets/characters.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.image("floor", "assets/blocks/scenery/underground/floorbricks.png");
}

function create() {

  this.floor = this.physics.add.staticGroup();

  this.floor.create(0, config.height -16 ,"floor").setOrigin(0, 0.5).refreshBody();

  this.floor.create(180, config.height - 16, "floor").setOrigin(0, 0.5).refreshBody();

  this.player = this.physics.add.sprite(50, 210, "player")
  .setOrigin(0, 1).setGravityY(300)
  .setCollideWorldBounds(true);

  this.physics.world.setBounds(0, 0, 2000, config.height);

  this.physics.add.collider(this.player, this.floor);

  this.cameras.main.setBounds(0, 0, 2000, config.height);

  this.cameras.main.startFollow(this.player);

  createAnimations(this);

  this.keys = this.input.keyboard.createCursorKeys();
}

function update() {

  if(this.player.isDead) return;


  if (this.keys.left.isDown) {
    this.player.anims.play("player_walk", true);
    this.player.x -= 1;
    this.player.flipX = true;
  } else if (this.keys.right.isDown) {
    this.player.anims.play("player_walk", true);
    this.player.x += 1;
    this.player.flipX = false;
  } else {
    this.player.anims.play("player_idle", true);
  }

  if (this.keys.up.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-300);
    this.player.anims.play("player_jump", true);
  }
  if(this.player.y >= config.height){
    this.player.isDead = true;
    this.player.anims.play("player_fall", true);
    this.player.setCollideWorldBounds(false);
    
    setTimeout(() => {
      this.player.setVelocityY(-300);
    }, 100);

    setTimeout(() => {
      this.player.destroy();
      this.scene.restart();
    }, 2000);
  }
}
