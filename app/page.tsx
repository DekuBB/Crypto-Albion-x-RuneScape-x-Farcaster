'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<any>(null);
  const [reward, setReward] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    let mounted = true;

    const init = async () => {
      const PhaserImport: any = await import('phaser');
      const Phaser = PhaserImport?.default ?? PhaserImport;

      if (!Phaser || !Phaser.Scene) return;

      class MainScene extends Phaser.Scene {
        player: any;
        monster: any;
        cursors: any;

        constructor() {
          super('MainScene');
        }

        preload() {
          this.load.image('player','https://labs.phaser.io/assets/sprites/phaser-dude.png');
          this.load.image('monster','https://labs.phaser.io/assets/sprites/dragon.png');
        }

        create() {
          this.player = this.physics.add.image(400,300,'player').setScale(0.5);
          this.monster = this.physics.add.image(600,300,'monster').setScale(0.4);
          this.player.setCollideWorldBounds(true);

          this.physics.add.overlap(this.player,this.monster,()=>{
            this.monster.destroy();
            setReward(r=>r+10);
          });

          this.cursors = this.input.keyboard.createCursorKeys();
        }

        update() {
          if (!this.player || !this.cursors) return;
          const speed = 200;
          this.player.setVelocity(0);

          if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
          if (this.cursors.right.isDown) this.player.setVelocityX(speed);
          if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
          if (this.cursors.down.isDown) this.player.setVelocityY(speed);
        }
      }

      if (!mounted || !containerRef.current) return;

      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: containerRef.current,
        physics: { default: 'arcade' },
        scene: MainScene
      });
    };

    init();

    return () => {
      mounted = false;
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <main style={{ padding: 40, background: '#111', color: '#fff', minHeight: '100vh' }}>
      <h1>Crypto Albion MMO – Build Ready</h1>
      <div ref={containerRef} />
      <p style={{ marginTop: 20 }}>Reward: {reward} $ALBION (mock)</p>
    </main>
  );
}
