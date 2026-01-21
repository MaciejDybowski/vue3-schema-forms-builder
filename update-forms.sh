#!/usr/bin/env bash
set -e

if [[ -z "$UPDATED_AUREA_FORMS_VERSION" ]]; then
  echo "No UPDATED_AUREA_FORMS_VERSION provided, skipping update"
  exit 0
fi

echo "Updating vue3-schema-forms to $UPDATED_AUREA_FORMS_VERSION"

git config user.email "noreply@gitlab.tecna.pl"
git config user.name "GitLab CI"

jq '.dependencies["vue3-schema-forms"] = env.UPDATED_AUREA_FORMS_VERSION' \
  package.json > tmp.json && mv tmp.json package.json

npm version patch --no-git-tag-version
rm -f ./package-lock.json
rm -rf node_modules
npm cache clean --force
npm install --registry=https://nexus3.tecna.pl/repository/npm-private

# Autoryzacja CI_JOB_TOKEN
# Należy wygenerować token (AccessToken) z odpowiednimi uprawnieniami i dodać go jako zmienną środowiskową GITLAB_TOKEN w ustawieniach CI/CD projektu
git remote set-url origin "https://oauth2:${GITLAB_TOKEN}@gitlab.tecna.pl/${CI_PROJECT_PATH}.git"
git add package.json package-lock.json .npmrc

## Gitlab CI wie, że jak w commit message jest [skip ci], to nie musi uruchamiać kolejnych pipeline'ów
git commit -m "Update vue3-schema-forms to $UPDATED_AUREA_FORMS_VERSION [skip ci]"
git push origin HEAD:master