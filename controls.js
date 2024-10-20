export function checkControls({player, keys}) {

    const isPlayerTouchingFloor = player.body.touching.down;
  
    const isLeftKeyDown = keys.left.isDown;
    const isRightKeyDown = keys.right.isDown;
    const isUpKeyDown = keys.up.isDown;
  
    if (player.isDead) return;
  
    if (isLeftKeyDown) {
      isPlayerTouchingFloor && player.anims.play("player_walk", true);
      player.x -= 1;
      player.flipX = true;
    } else if (isRightKeyDown) {
      isPlayerTouchingFloor && player.anims.play("player_walk", true);
      player.x += 1;
      player.flipX = false;
    } else if (isPlayerTouchingFloor) {
      player.anims.play("player_idle", true);
    }
  
    if (isUpKeyDown && isPlayerTouchingFloor) {
      player.setVelocityY(-300);
      player.anims.play("player_jump", true);
    }

}