// Shrinks an image in the browser before upload so the website stays fast.
//   photos: max 2000 px wide   logos: max 240 px tall (transparency kept)
export async function prepareImage(file, kind = 'photo') {
  if (!/^image\//.test(file.type)) throw new Error('Please choose an image file (JPG, PNG or WebP).');
  const bitmap = await createImageBitmap(file);
  const scale = kind === 'logo' ? Math.min(1, 240 / bitmap.height) : Math.min(1, 2000 / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (kind === 'photo') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); }
  ctx.drawImage(bitmap, 0, 0, w, h);
  const toBlob = (type, q) => new Promise((r) => canvas.toBlob(r, type, q));
  let blob = await toBlob('image/webp', 0.82);
  if (!blob || blob.type !== 'image/webp') blob = kind === 'logo' ? await toBlob('image/png') : await toBlob('image/jpeg', 0.85);
  return blob;
}
