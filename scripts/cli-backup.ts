import { createSafeBackup } from "../lib/backup";

async function runCliBackup() {
  try {
    console.log("Membuat backup SQLite aman...");
    const record = await createSafeBackup("manual");
    console.log(`Backup berhasil dibuat!`);
    console.log(`- File     : ${record.filename}`);
    console.log(`- Path     : ${record.filePath}`);
    console.log(`- Ukuran   : ${(record.fileSizeBytes / 1024).toFixed(2)} KB`);
    console.log(`- Checksum : ${record.checksum}`);
  } catch (err: any) {
    console.error("Gagal membuat backup:", err.message);
    process.exit(1);
  }
}

runCliBackup();
