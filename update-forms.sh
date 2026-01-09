#!/usr/bin/env bash
set -e

if [[ -z "$UPDATED_AUREA_FORMS_VERSION" ]]; then
  echo "No UPDATED_AUREA_FORMS_VERSION provided, skipping update"
  exit 0
fi

echo "Updating vue3-schema-forms to $UPDATED_AUREA_FORMS_VERSION"

jq '.dependencies["vue3-schema-forms"] = env.UPDATED_AUREA_FORMS_VERSION' \
  package.json > tmp.json && mv tmp.json package.json

npm version patch --no-git-tag-version

npm install --package-lock-only --registry=https://nexus3.tecna.pl/repository/npm-private

git config user.email "ci@gitlab"
git config user.name "GitLab CI"

git add package.json package-lock.json

if git diff --staged --quiet; then
  echo "No changes"
  exit 0
fi

git commit -m "Update vue3-schema-forms to $UPDATED_AUREA_FORMS_VERSION [skip ci]"
git push origin HEAD:master
