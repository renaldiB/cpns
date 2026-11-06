import { restoreFromBackup } from "../lib/backup";

async function runCliRestore() {
  const args = process.argv.slice(2);
  const targetFile = args[0];

  if (!targetFile) {
    console.error("Gunakan: npm run db:restore -- <path-to-backup-file.db>");
    process.exit(1);
  }

  try {
    console.log(`Memulihkan database dari ${targetFile}...`);
    const res = await restoreFromBackup(targetFile);
    console.log(`Database berhasil dipulihkan!`);
    console.log(`Backup otomatis kondisi sebelum restore disimpan dengan ID: ${res.preBackupId}`);
  } catch (err: any) {
    console.error("Gagal melakukan restore:", err.message);
    process.exit(1);
  }
}

runCliRestore();
