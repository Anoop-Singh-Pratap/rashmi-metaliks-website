# Supabase Integration Setup Guide

This guide will help you set up the Supabase integration for the Rashmi Metaliks website, specifically for the job application form.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com) if you don't have one)
2. A new or existing Supabase project

## Setup Steps

### 1. Install Dependencies

Make sure you have the Supabase JavaScript client installed:

```bash
npm install @supabase/supabase-js
```

### 2. Environment Variables

Create a `.env` file in the root of your project (copying from `.env.example`) and add your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

You can find these values in your Supabase project dashboard under Settings > API.

### 3. Database Schema Setup

Execute the SQL script found in `supabase/schema.sql` in your Supabase SQL editor to create:

- The `job_applications` table
- Row Level Security (RLS) policies
- Storage bucket for resume files
- Notification trigger for new applications

You can run this script in the Supabase Dashboard by going to the SQL Editor section.

### 4. Storage Setup

1. Go to the Storage section in your Supabase dashboard
2. Create a new bucket named `resumes` if it doesn't exist already
3. Set the bucket's privacy settings according to your requirements (private is recommended for resumes)

### 5. Authentication (Optional)

If you want users to be able to log in and track their job applications:

1. Configure authentication providers in the Supabase Authentication settings
2. Update the RLS policies as needed

### 6. Test Your Setup

1. Run the application locally with `npm run dev`
2. Navigate to the application form
3. Submit a test application
4. Verify that the data is stored in the Supabase database and the resume file is uploaded to storage

## Schema Information

### Job Applications Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, auto-generated |
| first_name | TEXT | Applicant's first name |
| last_name | TEXT | Applicant's last name |
| email | TEXT | Applicant's email address |
| phone | TEXT | Applicant's phone number |
| position | TEXT | Position applying for |
| department | TEXT | Department (optional) |
| experience | TEXT | Years of experience (optional) |
| education | TEXT | Highest education level (optional) |
| resume_url | TEXT | URL to the uploaded resume file |
| cover_letter | TEXT | Cover letter content (optional) |
| source | TEXT | How the applicant heard about the job (optional) |
| created_at | TIMESTAMP | When the application was submitted |
| status | TEXT | Application status (default: 'pending') |

## Troubleshooting

- **File Upload Issues:** Ensure that the storage bucket permissions are correctly set and that the bucket exists
- **Database Connection Issues:** Verify your environment variables are correct
- **RLS Policy Issues:** Check the RLS policies if data isn't being inserted or retrieved properly

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) 