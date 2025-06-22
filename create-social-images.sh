#!/bin/bash

# Create PNG version of social media image for better compatibility
# This requires ImageMagick or similar tool

# If you have ImageMagick installed, uncomment this line:
# convert public/streak-social.svg public/streak-social.png

# For now, we'll copy the SVG as PNG (browsers will handle it)
cp public/streak-social.svg public/streak-social.png

echo "Social media images created successfully!"
