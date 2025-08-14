# Email Setup for Authentication System

## Overview
The authentication system now sends random authentication codes to the admin's Gmail address when they log in. This is implemented using EmailJS, a service that allows you to send emails directly from your frontend application.

## Setup Steps

### 1. Install EmailJS
The package has been added to your dependencies. Run:
```bash
npm install
```

### 2. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 3. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" as your email service
4. Connect your Gmail account
5. Note down your **Service ID**

### 4. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

**Subject:** Admin Authentication Code

**HTML Content:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Admin Authentication Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #20bca6; text-align: center;">🔐 Admin Authentication Code</h2>
        
        <div style="background: #f8f9fa; border-left: 4px solid #20bca6; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 0; font-size: 18px;"><strong>Your authentication code is:</strong></p>
            <h1 style="color: #667eea; font-size: 32px; text-align: center; margin: 20px 0; letter-spacing: 5px; font-family: monospace;">{{auth_code}}</h1>
        </div>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
                ⏰ <strong>Important:</strong> This code will expire in 10 minutes.
            </p>
        </div>
        
        <p>If you didn't request this authentication code, please ignore this email and contact your system administrator immediately.</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="text-align: center; color: #666; font-size: 12px;">
            This is an automated message from your portfolio admin system.
        </p>
    </div>
</body>
</html>
```

4. Note down your **Template ID**

### 5. Get Your Public Key
1. In EmailJS dashboard, go to "Account" → "API Keys"
2. Copy your **Public Key**

### 6. Update the Code
In `src/auth.jsx`, replace the placeholder values:

```javascript
// Replace these values with your actual EmailJS credentials
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Your public key
"YOUR_SERVICE_ID", // Your service ID
"YOUR_TEMPLATE_ID" // Your template ID
```

### 7. Test the System
1. Run your application
2. Click the footer button to open the auth page
3. Enter valid credentials from your Supabase "auth" table
4. Check if the authentication code is sent to your Gmail

## Alternative Email Services

If you prefer not to use EmailJS, you can also use:

### SendGrid
- More professional email service
- Better deliverability
- Requires backend implementation

### Mailgun
- Good for transactional emails
- Requires backend implementation

### Supabase Built-in Email
- If you have Supabase Pro plan
- Configure in Supabase dashboard

## Security Notes

1. **Never expose your EmailJS private keys in frontend code**
2. **Use environment variables for sensitive information**
3. **Consider implementing rate limiting for login attempts**
4. **The authentication code expires after 10 minutes**

## Troubleshooting

### Email not sending:
1. Check EmailJS service connection
2. Verify template variables match
3. Check browser console for errors
4. Ensure Gmail account is properly connected

### Authentication failing:
1. Verify Supabase credentials
2. Check "auth" table structure
3. Ensure column names are "email" and "pass"
4. Verify environment variables are set

## Environment Variables
Create a `.env` file in your project root:
```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

Then update the code to use:
```javascript
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
```
