// このスクリプトは画像からアイコンを生成するためのものです
// sharpパッケージが必要です: npm install sharp
// 実行: node scripts/generate-icons.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImage = path.join(__dirname, '../public/avatar/IMG_8820.jpg');
const outputDir = path.join(__dirname, '../public');

async function generateIcons() {
  try {
    // 192x192 アイコン
    await sharp(inputImage)
      .resize(192, 192, { fit: 'cover' })
      .toFile(path.join(outputDir, 'icon-192x192.png'));

    // 512x512 アイコン
    await sharp(inputImage)
      .resize(512, 512, { fit: 'cover' })
      .toFile(path.join(outputDir, 'icon-512x512.png'));

    console.log('✅ アイコンを生成しました！');
  } catch (error) {
    console.error('❌ エラー:', error.message);
    console.log('💡 sharpパッケージをインストールしてください: npm install sharp');
  }
}

generateIcons();

