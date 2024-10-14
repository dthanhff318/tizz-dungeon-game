import { EKeyMap } from "../../config/key/map";

export function backgroundUtils(this: any) {
  // Set background
  const bgGround = this.add.sprite(0, 0, EKeyMap.G_FOREST);
  bgGround.setOrigin(0, 0);
  bgGround.displayWidth = this.cameras.main.width;
  bgGround.displayHeight = this.cameras.main.height;
  // Create ground bound
  const backgroundWidth = bgGround.displayWidth;
  const groundY = bgGround.displayHeight - 100; // Ground position
  const ground = this.add
    .rectangle(backgroundWidth / 2, groundY, backgroundWidth, 10, 0xffffff)
    .setAlpha(0);

  return { bgGround, ground };
}
