# GoDaddy Domain to Railway DNS Configuration Guide

## Overview
This guide explains how to configure your GoDaddy domain to properly point to your Railway deployment using DNS records instead of domain forwarding. This ensures your custom domain (e.g., `yourdomain.com`) is what appears in the browser address bar, not the Railway subdomain (e.g., `your-project.railway.app`).

### Domain Forwarding vs. DNS Records

**Domain Forwarding (Current Setup)**:
- User types `yourdomain.com` → Browser redirects to `your-project.railway.app`
- Address bar shows Railway URL
- Not ideal for branding and user experience

**DNS Records (Target Setup)**:
- User types `yourdomain.com` → Browser stays on `yourdomain.com`
- Address bar shows your custom domain
- Railway serves the content behind the scenes
- Professional appearance and better SEO

## Prerequisites
- A Railway account with a deployed project
- A GoDaddy domain purchased and ready to use
- Access to GoDaddy DNS management
- Currently using domain forwarding (which needs to be removed)

## Step-by-Step Configuration

### Step 0: Remove Domain Forwarding (IMPORTANT)

Before setting up DNS records, you must remove the existing domain forwarding in GoDaddy:

1. Log in to your GoDaddy account
2. Go to "My Products" → "Domains"
3. Click on your domain
4. Look for "Forwarding" or "Domain Forwarding" section
5. Delete any existing forwarding rules
6. Save changes

**Why this is necessary**: Domain forwarding causes the browser to redirect from your custom domain to the Railway URL, which is why you see the Railway subdomain in the address bar. DNS records will make your custom domain the actual host.

### Step 1: Get Your Railway Domain

1. Log in to your Railway dashboard
2. Navigate to your project
3. Click on the "Settings" tab
4. Scroll down to "Domains"
5. Click "Add Domain"
6. Enter your custom domain (e.g., `yourdomain.com` or `www.yourdomain.com`)
7. Railway will generate DNS records for you

**Note**: Railway provides two options:
- **Root domain** (e.g., `yourdomain.com`)
- **WWW subdomain** (e.g., `www.yourdomain.com`)

It's recommended to configure both for better user experience.

### Step 2: Configure GoDaddy DNS Records

1. Log in to your GoDaddy account
2. Go to "My Products" → "Domains"
3. Click on your domain
4. Click "DNS Management" or "DNS"
5. **Important**: Remove any existing A records or CNAME records for `@` (root domain) that might conflict
6. You'll now add new DNS records to point to Railway

#### For Root Domain (yourdomain.com)

**Option A: Using CNAME (Recommended for Railway)**

1. Click "Add" → "CNAME"
2. Fill in:
   - **Type**: CNAME
   - **Host**: `@` (this represents the root domain)
   - **Points to**: Your Railway-generated CNAME target (check Railway dashboard)
   - **TTL**: 1 hour (3600 seconds)
3. Click "Save"

**Option B: Using A Record (Alternative)**

1. Click "Add" → "A"
2. Fill in:
   - **Type**: A
   - **Host**: `@`
   - **Points to**: Your Railway IP address (check Railway dashboard)
   - **TTL**: 1 hour (3600 seconds)
3. Click "Save"

#### For WWW Subdomain (www.yourdomain.com)

1. Click "Add" → "CNAME"
2. Fill in:
   - **Type**: CNAME
   - **Host**: `www`
   - **Points to**: Your Railway-generated CNAME target (or `yourdomain.com` for redirect)
   - **TTL**: 1 hour (3600 seconds)
3. Click "Save"

### Step 3: Verify in Railway

1. Go back to Railway dashboard
2. Navigate to your project → Settings → Domains
3. Railway will automatically verify your DNS configuration
4. This may take a few minutes to propagate

**If verification fails**:
- Wait 10-15 minutes for DNS propagation
- Double-check your DNS records in GoDaddy
- Ensure you're using the correct CNAME target from Railway

### Step 4: Configure HTTPS (SSL)

Railway automatically provisions SSL certificates for custom domains. Once your DNS is verified:
1. Railway will automatically generate an SSL certificate
2. This may take 5-10 minutes
3. Your site will be accessible via HTTPS

## Common Issues and Solutions

### Issue 1: Browser Still Shows Railway URL

**Symptoms**: After setting up DNS records, browser still shows Railway URL (e.g., `your-project.railway.app`)

**Solutions**:
1. **Clear browser cache** - This is the most common issue
2. **Wait for DNS propagation** - Can take 5-30 minutes, sometimes up to 48 hours
3. **Check domain forwarding is disabled** - Go back to GoDaddy and ensure forwarding is completely removed
4. **Try incognito/private browsing** - This bypasses cache
5. **Check from different device/network** - Helps isolate caching issues
6. **Verify DNS records are correct** - Use nslookup or dig to check what your domain resolves to

### Issue 2: DNS Not Propagating

**Symptoms**: Domain doesn't resolve to Railway after configuration

**Solutions**:
1. Wait 24-48 hours for full DNS propagation (though usually takes 5-30 minutes)
2. Check DNS propagation using tools like:
   - https://dnschecker.org/
   - https://whatsmydns.net/
3. Clear your browser cache
4. Try accessing from a different network or device

### Issue 2: Verification Fails in Railway

**Symptoms**: Railway shows "Verification failed" for your domain

**Solutions**:
1. Ensure you're using the correct CNAME target from Railway
2. Check that you didn't accidentally create an A record instead of CNAME
3. Make sure there are no conflicting DNS records in GoDaddy
4. Delete any existing A records for `@` that point elsewhere
5. Wait 10-15 minutes and try verification again

### Issue 3: WWW Redirect Not Working

**Symptoms**: `www.yourdomain.com` doesn't work or redirects incorrectly

**Solutions**:
1. Ensure you have a CNAME record for `www` pointing to your Railway CNAME target
2. Alternatively, point `www` to `yourdomain.com` (if Railway handles the redirect)
3. Check Railway settings to ensure both domains are added

### Issue 4: SSL Certificate Not Issuing

**Symptoms**: Site loads but shows "Not Secure" or certificate errors

**Solutions**:
1. Wait 10-15 minutes for SSL provisioning
2. Ensure DNS is properly verified in Railway
3. Check that your domain's WHOIS information is public (required for SSL)
4. If using a new domain, it may need to be older than 24 hours

### Issue 5: GoDaddy DNS Management Interface Issues

**Symptoms**: Can't find DNS settings or records won't save

**Solutions**:
1. Ensure you're the domain owner/administrator
2. Try using GoDaddy's "DNS Hosting" instead of "DNS Management"
3. Contact GoDaddy support if interface issues persist
4. Consider using alternative DNS providers like Cloudflare (see below)

## Alternative: Using Cloudflare DNS

If you're having issues with GoDaddy DNS, consider using Cloudflare:

1. Create a free Cloudflare account
2. Add your site to Cloudflare
3. Cloudflare will provide two nameservers
4. Update nameservers in GoDaddy:
   - Go to GoDaddy → DNS → Nameservers
   - Change from "GoDaddy" to "Custom"
   - Enter Cloudflare nameservers
5. Configure DNS records in Cloudflare instead of GoDaddy
6. Point to Railway using CNAME records

**Benefits of Cloudflare**:
- Faster DNS propagation
- Free CDN and DDoS protection
- Better SSL/TLS options
- More reliable DNS management

## Testing Your Configuration

### 1. Check DNS Resolution
```bash
# On Windows
nslookup yourdomain.com
nslookup www.yourdomain.com

# On Mac/Linux
dig yourdomain.com
dig www.yourdomain.com
```

### 2. Check HTTP Response
```bash
curl -I https://yourdomain.com
curl -I https://www.yourdomain.com
```

### 3. Check SSL Certificate
Visit your domain in a browser and check:
- Lock icon in address bar
- Certificate details (click the lock icon)
- Certificate issuer should be "Let's Encrypt" (Railway's SSL provider)

## Railway-Specific Notes

### Railway DNS Records
Railway typically provides:
- **CNAME target**: Something like `your-project.railway.app` or a custom Railway domain
- **A record**: Sometimes an IP address (less common)

Always use the records shown in your Railway dashboard under Settings → Domains.

### Railway Domain Limits
- Free tier: 1 custom domain per project
- Paid tiers: Multiple custom domains per project

### Railway SSL
- Automatic SSL provisioning via Let's Encrypt
- No manual configuration needed
- Auto-renewal handled by Railway

## Security Best Practices

1. **Enable HTTPS only**: Configure Railway to redirect HTTP to HTTPS
2. **Use HSTS**: Add HTTP Strict Transport Security headers
3. **Keep DNS updated**: Regularly review your DNS records
4. **Monitor expiration**: Watch for domain expiration (GoDaddy sends reminders)

## Troubleshooting Checklist

- [ ] Domain added in Railway dashboard
- [ ] Correct CNAME target obtained from Railway
- [ ] DNS records created in GoDaddy
- [ ] Conflicting DNS records removed
- [ ] DNS propagation completed (wait 15-30 minutes)
- [ ] Domain verified in Railway dashboard
- [ ] SSL certificate issued
- [ ] Site accessible via HTTPS
- [ ] Both root domain and www subdomain working

## Additional Resources

- Railway Documentation: https://docs.railway.app/guides/domains
- GoDaddy DNS Help: https://www.godaddy.com/help/dns-manager-6800
- Cloudflare DNS: https://developers.cloudflare.com/dns/
- DNS Propagation Checker: https://dnschecker.org/

## Contact Support

If you're still having issues:
- Railway Support: support@railway.app
- GoDaddy Support: 480-505-8877
- Check Railway status page: https://status.railway.app/
