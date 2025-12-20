#!/bin/bash

# ============================================
# BORO APPLIANCE PROS - CLEANUP SCRIPT
# ============================================
# Run this script to complete the cleanup
# Make executable: chmod +x CLEANUP_COMMANDS.sh
# Execute: ./CLEANUP_COMMANDS.sh

set -e  # Exit on error

echo "🧹 Starting Boro Appliance Pros cleanup..."
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Step 1: Delete unused files
echo "📁 Step 1: Deleting unused files..."
rm -f src/components/StripeCheckout.js
rm -f src/App.test.js
rm -f src/setupTests.js
rm -f src/reportWebVitals.js
echo "✅ Deleted 4 unused files"
echo ""

# Step 2: Install dependencies
echo "📦 Step 2: Installing dependencies..."
echo "  - Removing Stripe packages"
echo "  - Adding Twilio package"
npm install
echo "✅ Dependencies updated"
echo ""

# Step 3: Verify cleanup
echo "🔍 Step 3: Verifying cleanup..."

# Check if deleted files are gone
if [ ! -f src/components/StripeCheckout.js ]; then
    echo "✅ StripeCheckout.js removed"
else
    echo "❌ StripeCheckout.js still exists"
fi

if [ ! -f src/App.test.js ]; then
    echo "✅ App.test.js removed"
else
    echo "❌ App.test.js still exists"
fi

if [ ! -f src/setupTests.js ]; then
    echo "✅ setupTests.js removed"
else
    echo "❌ setupTests.js still exists"
fi

if [ ! -f src/reportWebVitals.js ]; then
    echo "✅ reportWebVitals.js removed"
else
    echo "❌ reportWebVitals.js still exists"
fi

echo ""
echo "🎉 CLEANUP COMPLETE!"
echo ""
echo "📋 Next steps:"
echo "1. Run: npm start"
echo "2. Test app at: http://localhost:3000"
echo "3. Test admin at: http://localhost:3000#admin"
echo "4. Follow QUICK_START.md for Twilio setup"
echo ""
