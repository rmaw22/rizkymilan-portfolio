---
name: game-edukatif-canvas
description: Template untuk membuat game edukatif berbasis HTML Canvas di Next.js (TSX). Gunakan skill ini setiap kali ingin membuat game baru yang mengajarkan konsep teknis (seperti Auth, DNS, Firewall, Docker, CI/CD, dsb). Trigger skill ini ketika user menyebut kata seperti "game", "canvas game", "bikin game edukatif", "requirement game", "rules game", atau menyebut topik teknis yang ingin dijadikan game. Skill ini menghasilkan: dokumen requirement (.md), rules & aturan main, struktur file TSX, dan edu layer — sebelum mulai coding.
---

# GAME_SKILL.md — Template Game Edukatif (Canvas / TSX)

Template ini dipakai setiap kali mau bikin game edukatif baru berbasis canvas di Next.js.
Isi bagian yang ditandai `[...]` sesuai game yang mau dibuat.

---

## 1. Identity

| Field | Isi |
|---|---|
| Nama game | `[nama singkat, max 3 kata]` |
| Topik ilmu | `[misal: JWT, DNS, Firewall, Docker]` |
| Jenis game | `[score / perang / teka-teki / sebab-akibat / simulasi]` |
| Tingkat kesulitan | `[beginner / intermediate / advanced]` |
| Estimasi durasi sesi | `[misal: 1–3 menit per sesi]` |

---

## 2. Learning Objectives

Setelah main game ini, pemain paham:

- [ ] `[konsep 1 yang dipelajari]`
- [ ] `[konsep 2 yang dipelajari]`
- [ ] `[konsep 3 yang dipelajari]`

> Maksimal 5 poin. Kalau lebih, pecah jadi dua game.

---

## 3. Requirement Aplikasi

### 3.1 Tech stack
- Framework: Next.js (App Router)
- Bahasa: TypeScript + TSX
- Rendering: HTML Canvas via `useRef<HTMLCanvasElement>`
- State: `useState` / `useRef` (no external state library)
- Styling: Inline style atau Tailwind utility class (no CSS modules)

### 3.2 Struktur file
```
components/
  games/
    [NamaGame]/
      index.tsx        ← entry point, export default
      engine.ts        ← logic game (update, collision, spawn)
      types.ts         ← semua TypeScript interface & type
      constants.ts     ← angka-angka: speed, size, timing
      useGameLoop.ts   ← custom hook: requestAnimationFrame
```

### 3.3 Props komponen utama
```ts
interface [NamaGame]Props {
  width?: number        // default: 680
  height?: number       // default: 400
  onScoreChange?: (score: number) => void
  onGameOver?: (finalScore: number) => void
}
```

### 3.4 Fitur wajib
- [ ] Layar idle (sebelum mulai)
- [ ] Layar game over + skor akhir
- [ ] Tombol restart tanpa reload halaman
- [ ] Best score tersimpan di `localStorage`
- [ ] Responsive: canvas scale ke lebar container
- [ ] Keyboard shortcut minimum: `Space` / `Enter` untuk aksi utama
- [ ] Klik/tap support untuk mobile

### 3.5 Fitur opsional
- [ ] Slider kecepatan / difficulty
- [ ] Hint / tooltip ilmu saat game over
- [ ] Sound effect (Web Audio API, no library)
- [ ] Animasi transisi antar state

---

## 4. Gameplay & Rules

### 4.1 Skenario utama
```
[Ceritakan dalam 2–3 kalimat: siapa pemain, apa situasinya, apa yang harus dilakukan]
```

### 4.2 Aksi pemain
| Aksi | Input | Efek |
|---|---|---|
| `[nama aksi 1]` | `[keyboard/klik/drag]` | `[apa yang terjadi]` |
| `[nama aksi 2]` | `[keyboard/klik/drag]` | `[apa yang terjadi]` |

### 4.3 Win condition
```
[Kapan pemain "menang" satu ronde / naik level]
```

### 4.4 Lose condition
```
[Kapan game over terjadi]
```

### 4.5 Sistem skor
| Event | Poin |
|---|---|
| `[event positif 1]` | `+[N]` |
| `[event positif 2]` | `+[N]` |
| `[event negatif 1]` | `-[N]` atau `game over` |

### 4.6 Progression / difficulty curve
```
[Bagaimana game makin susah: speed naik, spawn lebih cepat, pilihan makin mirip, dll]
```

---

## 5. Visual & UI

### 5.1 Layout canvas
```
[Gambar ASCII sederhana area canvas: zona pemain, zona musuh, zona info, dll]

Contoh:
┌─────────────────────────────────┐
│  SCORE: 0          BEST: 0      │  ← HUD bar
├─────────────────────────────────┤
│                                 │
│   [area utama gameplay]         │
│                                 │
├─────────────────────────────────┤
│  [tombol / pilihan pemain]      │  ← action zone
└─────────────────────────────────┘
```

### 5.2 Entitas visual
| Entitas | Bentuk | Warna | Keterangan |
|---|---|---|---|
| `[entitas 1]` | `[rect/circle/text]` | `[hex atau var CSS]` | `[apa ini]` |
| `[entitas 2]` | `[rect/circle/text]` | `[hex atau var CSS]` | `[apa ini]` |

### 5.3 Feedback visual
- Benar: `[misal: entitas berkedip hijau, skor naik animasi]`
- Salah: `[misal: layar shake, entitas merah, HP berkurang]`
- Game over: `[misal: overlay gelap, teks besar, tombol restart]`

---

## 6. Edu Layer (Ilmu yang Muncul di Game)

> Ini yang membedakan game edukatif dari game biasa.

### 6.1 In-game labels
Setiap entitas punya label ilmu yang muncul saat hover atau saat spawn:
```
[contoh: setiap "serangan" punya label: "Brute Force", "Expired Token", "Missing Scope"]
```

### 6.2 Tooltip / popup saat salah
Kalau pemain salah pilih, muncul penjelasan singkat:
```
[contoh: "JWT tidak bisa dipakai di sini karena tidak ada session server-side"]
```

### 6.3 Summary screen
Di layar game over, tampilkan:
- Berapa kali salah per kategori
- Tip singkat untuk konsep yang sering salah
- Link opsional ke dokumentasi / artikel

---

## 7. Checklist Sebelum Coding

- [ ] Identity sudah diisi lengkap
- [ ] Learning objectives sudah ≤ 5 poin
- [ ] Skenario utama bisa dijelaskan dalam 2–3 kalimat
- [ ] Layout canvas sudah ada ASCII sketch
- [ ] Win & lose condition sudah jelas
- [ ] Minimal 1 edu layer sudah didefinisikan
- [ ] File structure sudah diputuskan

---

## 8. Catatan Tambahan

```
[Tulis di sini hal-hal spesifik game ini yang tidak masuk kategori di atas]
```
