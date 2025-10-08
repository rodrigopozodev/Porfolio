import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const assetsDir = path.resolve("src/assets/svg");

const sources = {
  handLeft: "Claro_Mano.png",
  pointerLeft: "Claro_Puntero.png",
};

const outputs = {
  handRight: "Claro_Mano_Diestro.png",
  pointerRight: "Claro_Puntero_Diestro.png",
};

async function mirror(input, output) {
  const inPath = path.join(assetsDir, input);
  const outPath = path.join(assetsDir, output);
  try {
    await sharp(inPath).flip(false).flop(true).png({ compressionLevel: 9 }).toFile(outPath);
    console.log(`Generado ${output} por espejo de ${input}`);
  } catch (e) {
    console.error("Error generando", output, e?.message);
  }
}

async function main() {
  await mirror(sources.handLeft, outputs.handRight);
  await mirror(sources.pointerLeft, outputs.pointerRight);
}

main().catch((e) => {
  console.error("Fallo general:", e);
  process.exit(1);
});