export function comboKey(this: any) {
  const runRight = this.input.keyboard.createCombo(
    [Phaser.Input.Keyboard.KeyCodes.D, Phaser.Input.Keyboard.KeyCodes.V],
    { resetOnMatch: true }
  );
  const runLeft = this.input.keyboard.createCombo(
    [Phaser.Input.Keyboard.KeyCodes.A, Phaser.Input.Keyboard.KeyCodes.V],
    { resetOnMatch: true }
  );

  return {
    run: [runRight, runLeft],
  };
}
