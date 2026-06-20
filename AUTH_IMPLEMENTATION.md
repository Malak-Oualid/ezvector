# Auth Page Implementation Guide

## Overview
The authentication system is implemented using Supabase for user authentication and a custom backend for customer management. The AuthPage (`src/pages/AuthPage.tsx`) handles both sign-in and sign-up functionality.

## Current Implementation

### Dependencies
- **Supabase**: Used for user authentication (sign-in, sign-up, session management)
- **Backend API**: Custom backend for customer data management
- **shadcn/ui**: UI components for the authentication interface

### Key Components

#### 1. Sign-In Flow
The sign-in process (`handleSignIn` function):
1. Takes user email and password
2. Calls `supabase.auth.signInWithPassword()`
3. On success, redirects to `/profile`
4. On error, displays error message to user

#### 2. Sign-Up Flow
The sign-up process (`handleSignUp` function) is a two-step process:

**Step 1: Create Supabase User**
- Calls `supabase.auth.signUp()` with email, password, and user metadata (first_name, last_name)
- Handles rate limit errors gracefully
- Checks if email confirmation is required

**Step 2: Create Backend Customer**
- After successful Supabase user creation, makes a POST request to `${backendUrl}/api/customers`
- Sends: supabaseUserId, email, firstName, lastName
- On success, redirects to `/profile`
- On failure, shows error but user account is still created in Supabase

### Configuration Requirements

#### Environment Variables
```env
VITE_BACKEND_URL=http://localhost:3000  # Your backend server URL
```

#### Supabase Configuration
Located in `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

Required environment variables:
```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Known Issues and Fixes

### Issue 1: Backend Not Running
**Problem**: Sign-up fails with "Account created but backend is not responding"

**Solution**:
1. Ensure your backend server is running at the URL specified in `VITE_BACKEND_URL`
2. Verify the backend has the `/api/customers` POST endpoint
3. Check backend logs for errors

**Backend API Requirements**:
- Endpoint: `POST /api/customers`
- Request body:
  ```json
  {
    "supabaseUserId": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string"
  }
  ```
- Response: Should return the created customer object

### Issue 2: Email Confirmation Required
**Problem**: Sign-up shows "Please check your email to confirm your account"

**Solution**:
- This is expected behavior if email confirmation is enabled in Supabase
- User must click the confirmation link sent to their email
- For development, you can disable email confirmation in Supabase Dashboard:
  1. Go to Supabase Dashboard → Authentication → Providers
  2. Click on Email provider
  3. Disable "Confirm email" setting

### Issue 3: Rate Limit Errors
**Problem**: "Too many signup attempts. Please wait a few minutes"

**Solution**:
- Supabase has rate limits on email sign-ups
- For development, disable email confirmation (see above)
- For production, implement proper error handling and user feedback

### Issue 4: Missing UI Components
**Problem**: Import errors for shadcn/ui components

**Solution**:
Ensure the following components exist in `src/components/ui/`:
- `button.tsx`
- `input.tsx`
- `label.tsx`
- `card.tsx`

If missing, install them:
```bash
npx shadcn-ui@latest add button input label card
```

### Issue 5: Supabase Client Not Configured
**Problem**: Supabase client errors or undefined

**Solution**:
1. Create `src/lib/supabase.ts` if it doesn't exist
2. Add the Supabase configuration code shown above
3. Set environment variables in `.env` file
4. Restart the development server

## Backend Implementation Guide

To make the authentication fully functional, you need to implement the backend API:

### Required Backend Endpoints

#### POST /api/customers
Creates a new customer record in your database.

**Example Implementation (Node.js/Express)**:
```javascript
app.post('/api/customers', async (req, res) => {
  try {
    const { supabaseUserId, email, firstName, lastName } = req.body;
    
    // Validate input
    if (!supabaseUserId || !email || !firstName || !lastName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Check if customer already exists
    const existingCustomer = await db.customers.findUnique({
      where: { supabaseUserId }
    });
    
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }
    
    // Create customer
    const customer = await db.customers.create({
      data: {
        supabaseUserId,
        email,
        firstName,
        lastName,
        createdAt: new Date()
      }
    });
    
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

### Database Schema

Your backend database should have a `customers` table with:
- `id` (primary key)
- `supabaseUserId` (unique, references Supabase user ID)
- `email` (string)
- `firstName` (string)
- `lastName` (string)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Testing the Auth System

### 1. Test Sign-Up
1. Navigate to `/auth`
2. Click "Sign Up"
3. Fill in all fields
4. Submit the form
5. Verify:
   - User is created in Supabase
   - Customer is created in backend
   - Redirected to profile page

### 2. Test Sign-In
1. Navigate to `/auth`
2. Enter email and password
3. Submit the form
4. Verify:
   - Successfully authenticated
   - Redirected to profile page
   - Session is stored

### 3. Test Error Handling
1. Try signing up with invalid email
2. Try signing up with mismatched passwords
3. Try signing in with wrong credentials
4. Verify appropriate error messages are shown

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Password Security**: Supabase handles password hashing automatically
3. **Session Management**: Supabase manages sessions securely
4. **CORS**: Configure CORS in your backend to allow requests from your frontend
5. **Rate Limiting**: Implement rate limiting on your backend endpoints

## Next Steps

1. Implement the backend `/api/customers` endpoint
2. Set up your database schema
3. Configure environment variables
4. Test the complete authentication flow
5. Add password reset functionality (currently just a placeholder link)
6. Add "Remember me" functionality (currently just a checkbox)
7. Implement social login options if needed

## Troubleshooting Checklist

- [ ] Backend server running at correct URL
- [ ] Supabase project configured
- [ ] Environment variables set correctly
- [ ] Backend `/api/customers` endpoint implemented
- [ ] Database schema created
- [ ] CORS configured on backend
- [ ] Email confirmation settings correct in Supabase
- [ ] UI components installed
- [ ] Development server restarted after env changes
