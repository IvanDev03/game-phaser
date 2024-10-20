export const createAnimations = (game) => {
  game.anims.create({
    key: "player_walk",
    frames: game.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
    frameRate: 12,
    repeat: -1,
  });

  game.player.anims.create({
    key: "player_idle",
    frames: [{ key: "player", frame: 0 }],
    frameRate: 12,
    repeat: -1,
  });
  game.player.anims.create({
    key: "player_jump",
    frames: [{ key: "player", frame: 10 }],
    frameRate: 12,
    repeat: -1,
  });

  game.player.anims.create({
    key: "player_fall",
    frames: [{ key: "player", frame: 18 }],
    frameRate: 12,
    repeat: -1,
  });
  
  game.anims.create({
    key: "enemy_walk",
    frames: game.anims.generateFrameNumbers("enemy", { start: 0, end: 1 }),
    frameRate: 12,
    repeat: -1,
  });

  game.anims.create({
    key: "enemy_dead",
    frames: [{ key: "enemy", frame: 2 }],
    frameRate: 12,
    repeat: -1,
  });
};
