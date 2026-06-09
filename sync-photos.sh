#!/bin/bash
# Sync employee photos from Google Drive URLs to local repo
# Usage: ./sync-photos.sh

set -e

echo "🔍 Scanning data.json for Google Drive photo URLs..."

# Find all Google Drive URLs in photoUrl fields
drive_urls=$(grep -o '"photoUrl": "https://drive.google.com[^"]*"' data.json || true)

if [ -z "$drive_urls" ]; then
  echo "✅ No Google Drive URLs found. All photos are hosted locally!"
  exit 0
fi

echo "📥 Found Google Drive URLs. Downloading and converting to local files..."

# Create photos directory if it doesn't exist
mkdir -p photos

# Counter for downloaded photos
count=0

# Process each Google Drive URL
while IFS= read -r line; do
  # Extract the URL
  url=$(echo "$line" | sed -E 's/.*"photoUrl": "([^"]+)".*/\1/')
  
  # Extract file ID from Google Drive URL
  if [[ $url =~ id=([^&]+) ]]; then
    file_id="${BASH_REMATCH[1]}"
  elif [[ $url =~ /d/([^/]+) ]]; then
    file_id="${BASH_REMATCH[1]}"
  else
    echo "⚠️  Skipping invalid URL: $url"
    continue
  fi
  
  # Find the employee name for this URL
  employee_name=$(grep -B 10 "$url" data.json | grep '"name":' | tail -1 | sed -E 's/.*"name": "([^"]+)".*/\1/')
  
  if [ -z "$employee_name" ]; then
    echo "⚠️  Could not find employee name for URL: $url"
    continue
  fi
  
  # Create a safe filename
  safe_name=$(echo "$employee_name" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')
  local_path="photos/${safe_name}.jpg"
  
  echo "  📸 Downloading: $employee_name -> $local_path"
  
  # Download from Google Drive
  curl -L "https://drive.google.com/uc?export=download&id=$file_id" -o "$local_path" 2>/dev/null
  
  if [ -f "$local_path" ]; then
    # Update data.json to use local path
    sed -i '' "s|\"photoUrl\": \"$url\"|\"photoUrl\": \"$local_path\"|g" data.json
    count=$((count + 1))
    echo "  ✅ Downloaded and updated: $employee_name"
  else
    echo "  ❌ Failed to download: $employee_name"
  fi
  
done < <(echo "$drive_urls")

if [ $count -gt 0 ]; then
  echo ""
  echo "✨ Successfully synced $count photo(s)!"
  echo ""
  echo "📝 Next steps:"
  echo "  1. Review the changes: git diff"
  echo "  2. Commit: git add photos/ data.json && git commit -m 'Add employee photos'"
  echo "  3. Push: git push origin main"
  echo ""
  echo "  Or run: git add photos/ data.json && git commit -m 'Add employee photos' && git push origin main"
else
  echo ""
  echo "⚠️  No photos were downloaded."
fi
