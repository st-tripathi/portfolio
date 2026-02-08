#!/bin/bash

# Git Pre-commit Hook: Run tests if source code is modified
# Skips for documentation and assets

# Path to the test runner script
TEST_RUNNER="./scripts/run-tests.sh"

# Identify staged files
STAGED_FILES=$(git diff --cached --name-only)

# Check if any "Source Code" files are staged
# Source patterns: JS, CSS, or HTML in the docs/ folder
# Exclude images and PDF assets
SOURCE_MODIFIED=false

for file in $STAGED_FILES; do
    if [[ $file == docs/*.js ]] || [[ $file == docs/*.css ]] || [[ $file == docs/*.html ]]; then
        # Skip if it's explicitly a test file or asset (though tests should probably also trigger a run)
        if [[ $file != *"tests/"* ]] && [[ $file != *.pdf ]] && [[ $file != *.png ]] && [[ $file != *.jpg ]] && [[ $file != *.jpeg ]] && [[ $file != *.webp ]]; then
            SOURCE_MODIFIED=true
            break
        fi
    fi
done

if [ "$SOURCE_MODIFIED" = true ]; then
    echo "🔍 Source code changes detected. Running integration tests..."
    
    # Run the tests
    if ! $TEST_RUNNER; then
        echo "❌ Pre-commit check failed. Tests must pass before committing."
        exit 1
    fi
else
    echo "📄 Only documentation or assets modified. Skipping tests."
fi

exit 0
