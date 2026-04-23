---
name: auth-battle
description: Requirement dan rules untuk game edukatif "Auth Battle" — game perang (attacker vs defender) yang mengajarkan konsep Authentication & Authorization (JWT, OAuth, API Key, Session Cookie). Gunakan dokumen ini sebagai acuan ketika mulai coding komponen AuthBattle di Next.js. Trigger ketika user menyebut "auth battle", "mulai coding auth", atau "lanjut ke auth battle".
---

# auth-battle.md — Requirement & Rules

> Dokumen ini menggunakan template `GAME_SKILL.md`.
> Siap dijadikan acuan coding komponen `AuthBattle/index.tsx`.

---

## 1. Identity

| Field | Isi |
|---|---|
| Nama game | `Auth Battle` |
| Topik ilmu | Authentication & Authorization (JWT, OAuth, API Key, Session) |
| Jenis game | Perang (attacker vs defender) |
| Tingkat kesulitan | Beginner → Intermediate (auto naik tiap 5 gelombang) |
| Estimasi durasi sesi | 2–5 menit per sesi |

---

## 2. Learning Objectives

Setelah main game ini, pemain paham:

- [ ] Perbedaan Authentication (siapa kamu?) vs Authorization (boleh ngapain?)
- [ ] Kapan pakai JWT vs Session vs API Key vs OAuth
- [ ] Jenis-jenis serangan auth: brute force, token replay, missing scope, expired token
- [ ] Kenapa satu mekanisme auth tidak cocok untuk semua skenario
- [ ] Konsep token expiry, scope, dan permission level

---

## 3. Requirement Aplikasi

### 3.1 Tech stack
- Framework: Next.js (App Router)
- Bahasa: TypeScript + TSX
- Rendering: HTML Canvas via `useRef<HTMLCanvasElement>`
- State: `useState` / `useRef` (no external state library)
- Styling: Inline style (no Tailwind, no CSS modules)

### 3.2 Struktur file
```
components/
  games/
    AuthBattle/
      index.tsx         ← entry point, export default
      engine.ts         ← spawn attacker, cek senjata, hitung damage
      types.ts          ← Attacker, Weapon, GameState, Round interface
      constants.ts      ← WEAPONS, ATTACKERS, SPEED, TIMING
      useGameLoop.ts    ← custom hook requestAnimationFrame
```

### 3.3 Props komponen utama
```ts
interface AuthBattleProps {
  width?: number           // default: 680
  height?: number          // default: 420
  onScoreChange?: (score: number) => void
  onGameOver?: (finalScore: number) => void
}
```

### 3.4 Fitur wajib
- [x] Layar idle dengan cerita singkat skenario
- [x] Layar game over + skor + ringkasan kesalahan per kategori
- [x] Tombol restart tanpa reload
- [x] Best score di `localStorage` (key: `auth-battle-best`)
- [x] Canvas scale ke lebar container (devicePixelRatio aware)
- [x] Keyboard: `1` `2` `3` `4` pilih senjata, `Space` pause
- [x] Klik kartu senjata untuk mobile

### 3.5 Fitur opsional
- [ ] Sound: blip saat benar, buzz saat salah (Web Audio API)
- [ ] Hint muncul di layar game over per kesalahan
- [ ] Slider: jumlah HP server (untuk mode latihan)

---

## 4. Gameplay & Rules

### 4.1 Skenario utama
```
Kamu adalah Security Engineer yang menjaga sebuah API server.
Gelombang attacker terus datang, masing-masing menggunakan
teknik berbeda untuk menembus sistem. Kamu harus memilih
mekanisme auth yang tepat untuk menghentikan setiap serangan.
Pilih salah → server kena damage. HP habis → game over.
```

### 4.2 Entitas: Attacker (yang datang)

| Nama Attacker | Teknik Serangan | Senjata yang Tepat |
|---|---|---|
| `Brute Forcer` | Coba password berulang kali | Rate Limit + API Key |
| `Token Replayer` | Pakai JWT lama yang dicuri | JWT dengan expiry pendek |
| `Scope Skipper` | Akses endpoint tanpa izin | OAuth dengan scope check |
| `Session Hijacker` | Curi session cookie | Session + HttpOnly + Secure flag |
| `No-Auth Crawler` | Hit endpoint tanpa auth sama sekali | API Key / Bearer Token |
| `OAuth Abuser` | Pakai access token orang lain | OAuth + token introspection |
| `Credential Stuffer` | Pakai data breach dari tempat lain | MFA + login anomaly detection |

### 4.3 Senjata Pemain (4 slot, bisa dikombinasi nanti)

| ID | Nama Senjata | Cocok Untuk | Tidak Cocok Untuk |
|---|---|---|---|
| `1` | JWT (short expiry) | Stateless API, microservice | Session-based app, long-lived auth |
| `2` | OAuth 2.0 + Scope | Third-party access, delegasi | Internal service-to-service |
| `3` | API Key | Server-to-server, bot tertentu | User-facing login |
| `4` | Session + Cookie | Web app tradisional, server-side | Mobile app, stateless API |

### 4.4 Aksi Pemain

| Aksi | Input | Efek |
|---|---|---|
| Pilih senjata | Klik kartu / tekan `1`–`4` | Highlight senjata aktif |
| Tembak attacker | `Enter` / klik attacker | Cek kecocokan senjata vs serangan |
| Pause | `Space` | Freeze game, tampil tips |

### 4.5 Win Condition
```
Bertahan 10 gelombang (wave) tanpa HP server habis.
Tiap wave = 5–8 attacker.
Clear semua wave → Victory screen + total skor.
```

### 4.6 Lose Condition
```
HP server = 0.
HP server berkurang setiap attacker yang lolos (pilih senjata salah
atau terlambat memilih sebelum attacker sampai ke server).
```

### 4.7 Sistem Skor

| Event | Poin |
|---|---|
| Hentikan attacker dengan senjata tepat | `+100` |
| Hentikan attacker tapi senjata "lumayan" | `+40` |
| Salah senjata (attacker lolos) | `-0` poin, tapi `-1 HP` server |
| Terlambat (attacker sampai server) | `-0` poin, tapi `-2 HP` server |
| Perfect wave (no damage) | `+200 bonus` |
| Combo 3x benar berturut-turut | `×1.5 multiplier` |

### 4.8 HP Server
```
HP awal: 10
Damage per attacker lolos: -1 HP
Damage attacker sampai server (timeout): -2 HP
Tidak ada HP regenerasi
```

### 4.9 Progression / Difficulty Curve

| Wave | Perubahan |
|---|---|
| 1–2 | Attacker lambat, label jenis serangan visible |
| 3–5 | Speed naik 20%, label mulai hilang |
| 6–8 | Dua attacker bersamaan, waktu lebih singkat |
| 9–10 | Tiga attacker bersamaan, pilihan senjata diacak posisinya |

---

## 5. Visual & UI

### 5.1 Layout Canvas

```
┌──────────────────────────────────────────────┐
│  WAVE: 1/10    SCORE: 0    BEST: 0   HP: ██░ │  ← HUD
├──────────────────────────────────────────────┤
│                                              │
│  [ATTACKER] ────────────────→ [SERVER]       │  ← battle lane
│  [ATTACKER] ─────────→       [SERVER]        │
│                                              │
├──────────────────────────────────────────────┤
│  [1: JWT]  [2: OAuth]  [3: API Key]  [4: Session] │  ← weapon bar
└──────────────────────────────────────────────┘
```

### 5.2 Entitas Visual

| Entitas | Bentuk | Warna | Keterangan |
|---|---|---|---|
| Attacker | Rect 40×30 + label nama | `#E24B4A` (merah) | Bergerak kanan ke kiri |
| Server | Rect 60×80 di kanan | `#378ADD` (biru) | Target yang dijaga |
| Senjata aktif | Card dengan border tebal | `#1D9E75` (hijau) | Yang sedang dipilih |
| Projectile | Lingkaran kecil | `#EF9F27` (amber) | Animasi tembakan |
| HP bar | Rect merah/hijau | Dinamis | Di atas server |

### 5.3 Feedback Visual

- Benar: attacker meledak (animasi expand + fade), teks `+100` muncul hijau
- Salah: server bergetar (shake 3×), teks `WRONG!` merah, penjelasan singkat muncul 2 detik
- Timeout: attacker menyentuh server, kilat merah di server, HP berkurang
- Game over: overlay gelap, teks besar `SERVER DOWN`, summary card muncul

---

## 6. Edu Layer

### 6.1 In-game Labels
Setiap attacker punya label nama serangan yang muncul saat spawn:
```
"Brute Forcer"   → tooltip: "Mencoba ribuan kombinasi password"
"Token Replayer" → tooltip: "Memakai JWT lama yang sudah dicuri"
"Scope Skipper"  → tooltip: "Akses resource tanpa permission yang benar"
```

### 6.2 Tooltip saat Salah
Muncul 2 detik di bawah lane, contoh:
```
"JWT tidak efektif untuk Brute Force — gunakan Rate Limit + API Key"
"Session cookie bisa dibajak tanpa HttpOnly + Secure flag"
```

### 6.3 Summary Screen (Game Over)
Tampilkan tabel:
```
┌──────────────────┬────────┬──────────┐
│ Jenis Serangan   │ Benar  │ Salah    │
├──────────────────┼────────┼──────────┤
│ Brute Force      │  3     │  1       │
│ Token Replay     │  2     │  2       │
│ Scope Skip       │  1     │  0       │
└──────────────────┴────────┴──────────┘
Tips: "Pelajari lebih lanjut → JWT.io | OAuth 2.0 RFC"
```

---

## 7. Checklist Sebelum Coding

- [x] Identity sudah diisi lengkap
- [x] Learning objectives sudah ≤ 5 poin
- [x] Skenario utama bisa dijelaskan dalam 2–3 kalimat
- [x] Layout canvas sudah ada ASCII sketch
- [x] Win & lose condition sudah jelas
- [x] Tabel attacker vs senjata sudah lengkap
- [x] Edu layer minimal 1 sudah didefinisikan
- [x] File structure sudah diputuskan
- [ ] Review sekali lagi sebelum mulai `index.tsx`

---

## 8. Catatan Tambahan

```
- Wave system bisa di-extend: tambah attacker baru = tambah row di tabel section 4.2
- Senjata bisa dikombinasi di versi lanjutan (misal: JWT + Rate Limit = combo attack)
- Untuk versi multiplayer nanti: satu orang jadi attacker, satu jadi defender
- Pertimbangkan tambah "Free Mode" tanpa timer untuk belajar tanpa tekanan
```
