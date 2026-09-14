# 🎵 SPOTIFY API INTEGRATION - SETUP GUIDE

## 🔑 Step 1: Create Spotify App

### Go to Spotify Developer Dashboard
1. Open: https://developer.spotify.com/dashboard
2. Login/Create account (free)
3. Click: "Create an App"
4. Accept terms
5. Fill:
   - **App Name:** Spotify Clone
   - **Accept Terms:** ✅
   - Click: "Create"

### You'll get:
- **Client ID:** (copy this!)
- **Client Secret:** (copy this!)
- **Redirect URI:** http://localhost:3000/api/auth/callback

### Add Redirect URI
1. Go to Settings
2. Under "Redirect URIs"
3. Add: `http://localhost:3000/api/auth/callback`
4. Add: `https://spotify-clone.vercel.app/api/auth/callback` (production)
5. Save

---

## 🔗 Step 2: Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=YOUR_CLIENT_ID_HERE
SPOTIFY_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

For production on Vercel:
```env
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=YOUR_CLIENT_ID_HERE
SPOTIFY_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=https://spotify-clone.vercel.app/api/auth/callback
```

---

## 📦 Step 3: Install Dependencies

```bash
npm install next-auth spotify-api axios
```

---

## ✅ You're Ready!

Next: We'll implement:
- OAuth login
- Real track search
- Playback controls
- User profile

---

**Got your Client ID & Secret?** 🔑

Tell me when you have them!
