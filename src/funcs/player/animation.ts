import { EAnimation } from "../../config/key/animation";
import { EPlayerKey } from "../../config/key/player";

export function AnimationPlayer(this: any) {
  //  Idle
  this.anims.create({
    key: EAnimation.ANI_IDLE,
    frames: this.anims.generateFrameNumbers(EPlayerKey.S1_IDLE, {
      start: 0,
      end: 10,
    }),
    frameRate: 5,
    repeat: -1,
  });
  //  Walk
  this.anims.create({
    key: EAnimation.ANI_WALK,
    frames: this.anims.generateFrameNumbers(EPlayerKey.S1_WALK, {
      start: 0,
      end: 9,
    }),
    repeat: -1,
    frameRate: 24,
  });
  //  Run
  this.anims.create({
    key: EAnimation.ANI_RUN,
    frames: this.anims.generateFrameNumbers(EPlayerKey.S1_RUN, {
      start: 0,
      end: 9,
    }),
    repeat: -1,
    frameRate: 30,
  });
  //  Attack
  this.anims.create({
    key: EAnimation.ANI_ATTACK,
    frames: this.anims.generateFrameNumbers(EPlayerKey.S1_ATTACK, {
      start: 0,
      end: 2,
    }),
    repeat: -1,
    frameRate: 15,
  });
  //  Jump
  this.anims.create({
    key: EAnimation.ANI_JUMP,
    frames: this.anims.generateFrameNumbers(EPlayerKey.S1_JUMP, {
      start: 0,
      end: 9,
    }),
    frameRate: 12,
  });
}
