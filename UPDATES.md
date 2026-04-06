# 🎮 Codec Web Performance & Design Update

## ✨ What's New

### Enhanced Feature Cards
- **Glow Effect on Hover** - Cards now have a beautiful radial gradient glow that follows your mouse
- **Smooth Animations** - Upgraded to `cubic-bezier` timing for buttery-smooth transitions
- **Icon Animation** - Icons scale and rotate slightly on hover for extra polish
- **Gradient Border** - Subtle accent border appears on hover

### 404 Page
- **Custom Not Found Page** - Beautiful 404 page with the sleeping mascot
- **Animated Elements** - Floating animation for the mascot with glowing background
- **Clear Navigation** - Easy buttons to get back home or explore features

### Performance Improvements
- **Optimized Animations** - Added `will-change` for better GPU acceleration
- **Reduced Motion Support** - Respects user's `prefers-reduced-motion` setting
- **Faster Transitions** - Changed from `ease-out` to optimized `cubic-bezier` curves
- **Font Preloading** - Sansation-Regular is now preloaded for faster initial render
- **Stagger Optimization** - Reduced animation delays from 100ms to 80ms steps

### SEO & Meta
- **Canonical URL** - Added proper canonical link
- **Fixed Language** - Changed from "de" to "en" 
- **Theme Color** - Updated to match actual background color (#1e1e1e)

## 🚀 Try It

```bash
pnpm run dev
```

Then visit:
- **Home**: http://localhost:5173/
- **404 Test**: http://localhost:5173/any-random-path

## 🎨 Design Philosophy

The new card design focuses on **subtle, delightful interactions**:
- Hover effects are smooth and performant (60fps)
- Glow follows your mouse for interactive feedback
- Animations feel natural, not jarring
- Everything respects accessibility preferences

---

**Before**: Basic cards with simple shadow on hover  
**After**: Interactive cards with mouse-tracking glow, gradient borders, and smooth transforms
