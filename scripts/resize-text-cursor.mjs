import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const assetsDir = path.resolve("src/assets/svg");

const files = {
  pointerHand: "Claro_Mano.png", // referencia de tamaño
  text: "Claro_Texto.png",
};

async function getSizeOfPointerHand() {
  const handPath = path.join(assetsDir, files.pointerHand);
  try {
    const meta = await sharp(handPath).metadata();
    const width = meta.width || 32;
    const height = meta.height || 32;
    return { width, height };
  } catch (err) {
    console.error("No se pudo leer tamaño de", handPath, err?.message);
    return { width: 32, height: 32 };
  }
}

async function resizeTo(targetPath, width, height) {
  const tmpOut = targetPath + ".tmp";
  try {
    await sharp(targetPath)
      .resize(width, height, { fit: "contain", withoutEnlargement: false })
      .png({ compressionLevel: 9 })
      .toFile(tmpOut);
    await fs.promises.rename(tmpOut, targetPath);
    console.log("Redimensionado:", path.basename(targetPath), `=> ${width}x${height}`);
  } catch (err) {
    console.error("Error redimensionando", path.basename(targetPath), err?.message);
    try { await fs.promises.unlink(tmpOut); } catch {}
  }
}

async function main() {
  const { width, height } = await getSizeOfPointerHand();
  // Reduce el cursor de texto al 85% del tamaño del puntero mano
  const w = Math.round(width * 0.85);
  const h = Math.round(height * 0.85);
  const p = path.join(assetsDir, files.text);
  await resizeTo(p, w, h);
}

main().catch((e) => {
  console.error("Fallo general en redimensionado de texto:", e);
  process.exit(1);
});