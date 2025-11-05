# ⚾ Baseball Draft Simulator

A fun interactive game where you draft legendary baseball players and simulate a 7-game series!

## 🎮 Features

- **400+ Players**: Legends from 1992-2025
- **Big Red Machine**: Johnny Bench, Joe Morgan, Tony Perez
- **Cleveland Stars**: Jim Thome, Sandy Alomar Jr, Shane Bieber, Grady Sizemore
- **All-Time Greats**: Babe Ruth, Willie Mays, Ted Williams, Mike Trout
- **Draft System**: Build two complete teams
- **Series Simulation**: Automatic 7-game playoff series

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free Forever)

1. Create a GitHub repository named `baseball-game`
2. Upload all files
3. Settings → Pages → Source: "GitHub Actions"
4. Wait 2-3 minutes
5. Your URL: `https://YOUR-USERNAME.github.io/baseball-game/`

### Option 2: Netlify (Easiest - 30 seconds)

1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag this folder to the page
3. Done! Instant URL

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import this repository
4. Auto-deploys!

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## 📝 Important Note

If you rename the repository, update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/',  // Change this
})
```

## 🎯 How to Play

1. Click "Start Draft & Simulate Series"
2. Draft 12 players for Team 1 (C, 1B, 2B, 3B, SS, LF, CF, RF, DH, SP, RP1, RP2)
3. Draft 12 players for Team 2
4. Watch the 7-game series simulation!
5. See which team wins!

## 🏆 Player Pool Highlights

### Catchers
Johnny Bench, Yogi Berra, Mike Piazza, Sandy Alomar Jr, Carlos Santana

### Infielders
Tony Perez, Joe Morgan, Jim Thome, Jose Ramirez, Barry Larkin, Albert Pujols

### Outfielders  
Babe Ruth, Willie Mays, Ted Williams, Mike Trout, Ken Griffey Jr, Grady Sizemore

### Pitchers
Sandy Koufax, Clayton Kershaw, Pedro Martinez, Shane Bieber, Mariano Rivera, Emmanuel Clase

---

Made with ⚾ and ❤️

Enjoy your Baseball Draft Simulator!
