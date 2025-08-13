# Firebase Database Troubleshooting Guide

If your data is not being saved to Firebase, follow these steps to identify and resolve the issue:

## 🔍 **Step 1: Check Browser Console**

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Look for any error messages or Firebase-related logs
4. The enhanced logging should show detailed information about what's happening

## 🔧 **Step 2: Test Firebase Connection**

1. Click the "Test Firebase Connection" button in your app
2. Check the console for detailed logs
3. Look for success/error messages

## 🚨 **Common Issues and Solutions**

### **Issue 1: Firebase Not Initialized**
**Symptoms:**
- Console shows "Database not initialized"
- No Firebase logs appear

**Solutions:**
- Check if your Firebase config is correct
- Verify internet connection
- Check if Firebase services are enabled in your project

### **Issue 2: Permission Denied**
**Symptoms:**
- Console shows "Permission denied" error
- Error code: `permission-denied`

**Solutions:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `business-card-9affa`
3. Go to Firestore Database → Rules
4. Update your security rules to allow read/write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // WARNING: Only for development!
    }
  }
}
```

**⚠️ Important:** These rules allow public access. For production, implement proper authentication.

### **Issue 3: Collection Not Created**
**Symptoms:**
- No errors in console
- Data appears to save but doesn't show in Firebase

**Solutions:**
1. Check if the 'cards' collection exists in Firestore
2. Collections are created automatically when first document is added
3. Verify you're looking at the correct project

### **Issue 4: Network/Firewall Issues**
**Symptoms:**
- Timeout errors
- Connection refused

**Solutions:**
- Check internet connection
- Disable VPN if using one
- Check firewall settings
- Try from different network

## 📋 **Step 3: Verify Firebase Project Setup**

1. **Check Project ID**: Ensure it matches `business-card-9affa`
2. **Enable Firestore**: Make sure Firestore Database is enabled
3. **Check API Key**: Verify the API key is correct and not restricted
4. **Check Domain**: Ensure your domain is allowed in Firebase settings

## 🧪 **Step 4: Manual Testing**

1. **Test with Simple Data:**
   ```javascript
   // In browser console, test this:
   import { testFirebaseConnection } from './src/firebase.js';
   testFirebaseConnection().then(result => console.log('Test result:', result));
   ```

2. **Check Firestore Console:**
   - Go to Firebase Console → Firestore Database
   - Look for the 'cards' collection
   - Check if documents are being created

## 🔍 **Step 5: Debug Information**

The enhanced logging will show:
- ✅ Firebase initialization status
- 📊 Database instance details
- 🔧 Project ID verification
- 💾 Data being saved
- 📄 Document references
- 🔍 Data verification after save

## 📱 **Step 6: Test Form Submission**

1. Fill out the form completely
2. Submit the form
3. Watch the console for detailed logs
4. Check for any validation errors
5. Verify the data structure being sent

## 🆘 **Still Having Issues?**

If the problem persists:

1. **Check Firebase Status**: [Firebase Status Page](https://status.firebase.google.com/)
2. **Review Console Logs**: Look for specific error codes
3. **Verify Project Settings**: Ensure all services are properly configured
4. **Test with Minimal Data**: Try saving just required fields first

## 📞 **Need Help?**

- Check the browser console for detailed error messages
- Verify your Firebase project configuration
- Ensure Firestore Database is enabled
- Check security rules allow read/write access

---

**Remember:** The enhanced logging will provide detailed information about what's happening during the save process. Use this information to identify the specific issue.
