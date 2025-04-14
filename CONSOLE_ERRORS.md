# Fixing Console Errors

This guide explains how to fix common console errors you might encounter when running the Rashmi Metaliks website.

## Database-Related Errors

### "relation 'public.job_listings' does not exist"

**Error Message:**
```
GET https://kpoiglmmrwohcudsgufg.supabase.co/rest/v1/job_listings?select=*&is_active=eq.true&order=posted_date.desc 404 (Not Found)
Error fetching job listings: {code: '42P01', details: null, hint: null, message: 'relation "public.job_listings" does not exist'}
```

**Solution:**

The application is trying to fetch job listings from a Supabase table that doesn't exist yet. To fix:

1. Go to your Supabase dashboard for project: `kpoiglmmrwohcudsgufg`
2. Navigate to the SQL Editor
3. Create a new SQL query
4. Copy and paste the contents of `supabase/migrations/20240727_job_listings.sql`
5. Execute the query
6. Refresh your application

Alternatively, **for development purposes only**, the application will automatically use fallback data if the table doesn't exist (you might still see the error, but the app will display sample job listings).

## CSS-Related Warnings

### "@import rules are not allowed here"

**Warning Message:**
```
@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418.
```

**Solution:**

This is a browser warning related to how constructed stylesheets are implemented and not an actual error in your application. It won't affect functionality and can be safely ignored. The warning occurs because of how some CSS frameworks process style rules at runtime.

If you need to eliminate this warning:

1. Ensure you're using the latest versions of all dependencies
2. Consider moving any CSS imports to your main CSS file
3. If using CSS-in-JS libraries, check their documentation for best practices

## Iframe-Related Warnings

### "An iframe which has both allow-scripts and allow-same-origin for its sandbox attribute can escape its sandboxing"

**Warning Message:**
```
An iframe which has both allow-scripts and allow-same-origin for its sandbox attribute can escape its sandboxing.
```

**Solution:**

This is a security warning from the browser. To fix:

1. Review any iframe elements in your application
2. If you're using sandboxed iframes, consider removing either the `allow-scripts` or `allow-same-origin` attribute, but not both
3. If you need both permissions, ensure the iframe content is from a trusted source

## Connection-Related Errors

### "Failed to load resource: net::ERR_CONNECTION_REFUSED"

**Error Message:**
```
:1337/api/news-and-updates-panel?populate=*:1 Failed to load resource: net::ERR_CONNECTION_REFUSED
```

**Solution:**

This error indicates that the application is trying to connect to a local CMS that's not running. To fix:

1. Check that you've set the correct CMS URL in your `.env` file
2. If you're not using a local CMS, set `REACT_APP_CMS_API_URL=""` in your `.env` file
3. The application will automatically use fallback data when the CMS is unavailable 