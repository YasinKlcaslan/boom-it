import JSZip from 'jszip';

export async function ZipFiles(files, zipName = 'archive') {
  const zip = new JSZip();

  files.forEach(file => {
    const path = file.webkitRelativePath || file.name;
    zip.file(path, file);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  const safeName = zipName.replace(/\.[^/.]+$/, '') + '.zip';
  return new File([blob], safeName, { type: 'application/zip' });
}
