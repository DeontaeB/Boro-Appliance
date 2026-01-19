# Deployment Checklist - SEO Updates
## Verify Everything Works Before Going Live

---

## Pre-Deployment Testing (Do This Locally First)

### 1. Test URL Routing
Run your development server and test all these URLs:

```bash
npm start
```

Then visit these URLs in your browser:

**Main Pages:**
- [ ] http://localhost:3000/
- [ ] http://localhost:3000/booking
- [ ] http://localhost:3000/pricing
- [ ] http://localhost:3000/how-it-works

**Location Pages:**
- [ ] http://localhost:3000/murfreesboro
- [ ] http://localhost:3000/smyrna
- [ ] http://localhost:3000/la-vergne
- [ ] http://localhost:3000/eagleville
- [ ] http://localhost:3000/christiana

**Service Pages:**
- [ ] http://localhost:3000/refrigerator-repair
- [ ] http://localhost:3000/dishwasher-repair
- [ ] http://localhost:3000/washer-repair
- [ ] http://localhost:3000/dryer-repair
- [ ] http://localhost:3000/oven-repair

**Expected:** All pages should load (not 404). Navigation should work.

### 2. Test Navigation
- [ ] Click "Book Now" buttons - should go to /booking
- [ ] Click back buttons - should go to /
- [ ] Click internal links - should navigate properly
- [ ] Browser back/forward buttons should work

### 3. Build Test
```bash
npm run build
```

**Expected:** Should build without errors

---

## Deployment Steps

### Step 1: Commit Changes to Git
```bash
git add .
git commit -m "SEO optimization: real URLs, enhanced schema markup, improved local SEO"
git push origin main
```

### Step 2: Deploy to Your Hosting

**If using Netlify:**
1. Changes auto-deploy from GitHub
2. Wait 2-3 minutes for build
3. Check build logs for errors

**If using Vercel:**
1. Changes auto-deploy from GitHub
2. Wait 2-3 minutes for build
3. Check deployment logs

**If using other hosting:**
```bash
npm run build
# Upload 'build' folder to your server
# Make sure _redirects file is in root
```

### Step 3: Verify `_redirects` File Deployed
The `_redirects` file MUST be in your build output for SPA routing to work.

**Check:**
- Look in your deployed site's root directory
- File should exist: `/_redirects`
- Content should be: `/* /index.html 200`

**For Netlify:** Should work automatically
**For Vercel:** You may need `vercel.json` instead (see below)
**For Apache:** Need `.htaccess` (see below)

---

## Post-Deployment Testing

### Test 1: Direct URL Access
Visit these URLs directly (not clicking from homepage):

- [ ] https://boroappliancepros.com/murfreesboro
- [ ] https://boroappliancepros.com/refrigerator-repair

**Expected:** Pages load (not 404 error)
**If 404:** Your `_redirects` file isn't working (see troubleshooting)

### Test 2: Schema Validation
Use Google's Rich Results Test:
https://search.google.com/test/rich-results

Test these URLs:
- [ ] https://boroappliancepros.com/
- [ ] https://boroappliancepros.com/murfreesboro

**Expected:**
- LocalBusiness schema detected
- FAQPage schema detected (homepage)
- No errors

### Test 3: Sitemap Accessible
- [ ] Visit: https://boroappliancepros.com/sitemap.xml
- [ ] Should display XML sitemap
- [ ] Should show all URLs with lastmod dates

### Test 4: Mobile Responsiveness
- [ ] Test on phone
- [ ] All pages should be mobile-friendly
- [ ] Navigation should work on mobile

### Test 5: robots.txt
- [ ] Visit: https://boroappliancepros.com/robots.txt
- [ ] Should show robots.txt content
- [ ] Should have sitemap URL

---

## Troubleshooting

### Problem: 404 on Direct URL Access

**Symptom:** Clicking from homepage works, but going to URL directly shows 404

**Solution depends on your host:**

#### For Netlify (Recommended):
1. Ensure `public/_redirects` exists with content: `/* /index.html 200`
2. Rebuild and redeploy
3. Check build logs - file should be copied to output

#### For Vercel:
Create `vercel.json` in project root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

#### For Apache (.htaccess):
Create `.htaccess` in public folder:
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

#### For Nginx:
Add to nginx config:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Problem: Schema Not Detected

**Check:**
1. View page source (right-click → View Page Source)
2. Search for `application/ld+json`
3. Should see multiple schema blocks

**If missing:** React Helmet may not be working. Check console for errors.

### Problem: Old Site Still Showing

**Clear cache:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Test in incognito/private window

---

## Post-Deployment SEO Setup

### Immediate (Within 24 hours):

#### 1. Google Search Console
1. Go to: https://search.google.com/search-console
2. Add property: boroappliancepros.com
3. Verify ownership (choose method)
4. Submit sitemap: https://boroappliancepros.com/sitemap.xml

#### 2. Request Indexing for Key Pages
In Google Search Console:
1. Use URL Inspection tool
2. Check these pages:
   - /murfreesboro
   - /smyrna
   - /la-vergne
   - /refrigerator-repair
3. Click "Request Indexing" for each

#### 3. Google Analytics (if not set up)
1. Go to: https://analytics.google.com
2. Create property for boroappliancepros.com
3. Add tracking code to site (in public/index.html)

### Week 1:

#### 1. Google Business Profile
Follow complete guide: `GOOGLE_BUSINESS_SETUP.md`
- Set up profile
- Request verification
- Add all business info
- Upload 10+ photos

#### 2. Get First Reviews
- Ask 5-10 recent customers for reviews
- Send them direct review link
- Respond to all reviews within 24 hours

#### 3. Build Basic Citations
Add business to:
- Yelp
- Facebook Business Page
- Bing Places
- Yellow Pages

---

## Monitoring

### Daily (Week 1):
- [ ] Check Google Search Console for indexing errors
- [ ] Respond to any new reviews
- [ ] Monitor site uptime (should be automatic with host)

### Weekly:
- [ ] Check how many pages are indexed (Google: site:boroappliancepros.com)
- [ ] Post update on Google Business Profile
- [ ] Add 2-3 photos to GMB
- [ ] Track rankings manually (incognito search)

### Monthly:
- [ ] Review Google Analytics traffic
- [ ] Check Search Console performance report
- [ ] Update content if needed
- [ ] Add new reviews

---

## Success Metrics

### Week 1-2:
- [ ] All pages indexed in Google
- [ ] GMB verification submitted
- [ ] 5-10 Google reviews
- [ ] Listed on 5+ directories

### Month 1:
- [ ] 20+ pages indexed
- [ ] GMB verified and complete
- [ ] 15-25 Google reviews
- [ ] Appearing in some local searches (position 20-50)

### Month 2:
- [ ] Consistent organic traffic
- [ ] Ranking page 2-3 for main keywords
- [ ] 30-40 Google reviews
- [ ] 5+ calls/leads per week from organic search

### Month 3-4:
- [ ] Page 1 rankings for "appliance repair [city]"
- [ ] Map Pack appearances for "near me" searches
- [ ] 50+ Google reviews
- [ ] 10+ calls/leads per week from organic

---

## Emergency Contacts

### If Something Breaks:

**Site down?**
- Check hosting dashboard (Netlify/Vercel)
- Check recent deployments
- Rollback to previous version if needed

**Schema errors?**
- Use Google's Structured Data Testing Tool
- Check browser console for JavaScript errors
- Verify React Helmet is installed: `npm list react-helmet`

**Routing not working?**
- Check `_redirects` file is deployed
- Verify hosting platform supports SPA routing
- Check browser console for errors

---

## Final Checklist

Before marking deployment as "complete":

**Technical:**
- [ ] All URLs work (no 404s)
- [ ] Schema validates (Rich Results Test)
- [ ] Sitemap accessible
- [ ] robots.txt accessible
- [ ] Site loads fast (< 3 seconds)
- [ ] Mobile responsive
- [ ] No console errors

**SEO Setup:**
- [ ] Google Search Console set up
- [ ] Sitemap submitted
- [ ] Key pages indexed
- [ ] Google Business Profile created (in progress)
- [ ] Analytics tracking installed

**Content:**
- [ ] All pages have unique titles
- [ ] All pages have unique meta descriptions
- [ ] All pages have H1 tags with keywords
- [ ] Schema markup on all pages

**Off-Page:**
- [ ] GMB verification requested
- [ ] First 5 reviews obtained
- [ ] Listed on top 5 directories
- [ ] NAP consistent everywhere

---

## You're Done! 🎉

If all checkboxes are ticked, your SEO foundation is solid.

**Next 90 days:** Focus on:
1. Getting reviews (2-3 per week)
2. Posting on GMB (weekly)
3. Building citations (10+ total)
4. Monitoring rankings

**Be patient.** Local SEO takes 2-4 months to show real results. But with this foundation, you WILL rank.

---

*Last updated: 2026-01-19*
