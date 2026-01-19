# Quick Deployment Instructions

## The Fastest Way to Deploy

### What Hosting Are You Using?

---

## 🟢 If Using Netlify (Most Common)

### Option 1: Drag & Drop (5 minutes)

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Go to Netlify:**
   - Visit: https://app.netlify.com
   - Log in
   - Go to your site dashboard

3. **Drag and drop:**
   - Click "Deploys" tab
   - Drag the entire `build` folder onto the page
   - Wait 30 seconds
   - Done!

### Option 2: Git Auto-Deploy (10 minutes setup, auto after)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "SEO optimization complete"
   git push origin main
   ```

2. **Connect Netlify to GitHub:**
   - Go to Netlify dashboard
   - Site settings → Build & deploy → Configure builds
   - Link to your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Save

3. **Every future change:**
   - Just push to GitHub
   - Auto-deploys in 2 minutes

---

## 🔵 If Using Vercel

### Deploy with one command:

```bash
# Install Vercel CLI (first time only)
npm install -g vercel

# Deploy
vercel --prod
```

Or push to GitHub if already connected - auto-deploys.

---

## 🟠 If Using Other Hosting (GoDaddy, Bluehost, etc.)

### Manual Upload Method:

1. **Build:**
   ```bash
   npm run build
   ```

2. **Upload via FTP/cPanel:**
   - Open your hosting file manager or FTP client
   - Navigate to `public_html` or `www` folder
   - Delete old files
   - Upload everything from the `build` folder

3. **Add .htaccess file:**
   Create a file named `.htaccess` in the root with:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## ✅ After Deployment - Test This

Visit these URLs directly (replace with your domain):

1. https://yourdomain.com/murfreesboro
2. https://yourdomain.com/refrigerator-repair
3. https://yourdomain.com/smyrna

**Expected:** All should load (not 404)

---

## 🚨 Troubleshooting

### "404 Not Found" on page URLs

**Netlify:**
- Check that `_redirects` file is in your build output
- It should auto-copy from `public/_redirects`
- Rebuild and deploy again

**Vercel:**
- Make sure `vercel.json` exists in root
- Redeploy

**Traditional Hosting:**
- Check `.htaccess` file exists
- Make sure mod_rewrite is enabled (ask host support)

### "Blank page" on some URLs

**Check browser console (F12):**
- Look for JavaScript errors
- Usually means a component import failed
- Share the error message

### Site works locally but not live

**Most common causes:**
1. Environment variables missing (check .env files)
2. API endpoints using localhost instead of production URLs
3. Incorrect build configuration

---

## 📝 Quick Checklist

After deployment:
- [ ] Homepage loads: https://yourdomain.com
- [ ] Murfreesboro page loads: https://yourdomain.com/murfreesboro
- [ ] Service pages load: https://yourdomain.com/refrigerator-repair
- [ ] Navigation works (click around)
- [ ] Mobile responsive (test on phone)
- [ ] No console errors (press F12)

---

## 🎯 What's Your Hosting?

**Tell me and I'll give you exact commands:**

1. Netlify? → Drag & drop the build folder
2. Vercel? → Run `vercel --prod`
3. GitHub Pages? → I'll set it up
4. Other (GoDaddy, Bluehost)? → I'll give you FTP instructions
5. Don't know? → We'll figure it out

**Just tell me what you're using and I'll make it dead simple.**
