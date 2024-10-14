import { EUserEvent } from "../../config/defines/userEvent";
import { BasicMovement } from "./basicMovement";
import { comboKey } from "./comboPlayer";
import { Player } from "./player";

export function EventListener(this: any, player: Player) {
  const _this = this;
  const basicMovement = new BasicMovement(player);
  const { run } = comboKey.call(this);

  // Combo Run = Direction + CTRL
  _this.input.keyboard.on("keycombomatch", function () {
    if (run.some((e) => e.matched)) {
      basicMovement.run();
    }
  });

  // Walking
  _this.input.keyboard.on(EUserEvent.KEYDOWN_A, () => {
    player.direction = "left";
    player.flipX = true;
    basicMovement.walk({});
  });
  _this.input.keyboard.on(EUserEvent.KEYUP_A, () => {
    basicMovement.walk({ stop: true });
  });

  _this.input.keyboard.on(EUserEvent.KEYDOWN_D, () => {
    player.direction = "right";
    player.flipX = false;
    basicMovement.walk({});
  });
  _this.input.keyboard.on(EUserEvent.KEYUP_D, () => {
    basicMovement.walk({ stop: true });
  });

  // Attack
  _this.input.keyboard.on(EUserEvent.KEYDOWN_Q, () => {
    basicMovement.attack({});
  });
  _this.input.keyboard.on(EUserEvent.KEYUP_Q, () => {
    basicMovement.attack({ stop: true });
  });
}
