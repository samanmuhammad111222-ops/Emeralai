GREEN AI — VERCEL

PENTING:
1. API key yang pernah dikirim di chat sebaiknya di-rotate/revoke. Jangan gunakan key yang sudah terekspos.
2. Jangan menaruh API key di file HTML atau JavaScript.
3. Lampiran diunggah langsung ke Vercel Blob. File besar tidak dikirim melalui Vercel Function.
4. File gambar disimpan dan ditampilkan sebagai lampiran, tetapi model notrack-uncensored belum tentu mendukung vision. URL lampiran tidak otomatis berarti model bisa membaca gambar.
5. File teks kecil (.txt, .md, .csv, .json, .log) dicoba dibaca oleh browser dan dikirim ke AI. PDF/DOCX/ZIP hanya disimpan sebagai lampiran pada versi ini.

DEPLOY:
A. Upload folder project ini ke repository GitHub.
B. Login ke vercel.com, pilih Add New > Project, lalu import repository.
C. Framework Preset: Other. Root Directory: ./ . Build Command kosong; Output Directory: public.
D. Sebelum deploy, buka Storage di project Vercel, buat Blob Store, dan hubungkan ke project.
E. Buka Settings > Environment Variables, tambahkan:
   NOTRACK_KEY = API key NoTrack BARU yang belum pernah dibagikan.
   BLOB_READ_WRITE_TOKEN = token dari Blob Store (biasanya otomatis terhubung saat store dihubungkan).
F. Deploy / Redeploy.

Setelah deploy, Vercel memberi alamat *.vercel.app.

Catatan keamanan:
Vercel Blob pada konfigurasi ini memakai akses public agar link lampiran dapat dibuka. Jangan unggah dokumen pribadi, rahasia, atau data sensitif.
