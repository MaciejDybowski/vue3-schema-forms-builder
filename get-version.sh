#!/usr/bin/env bash
set -e

FORM_BUILDER_VERSION=$(node -p "require('./package.json').version")
echo "FORM_BUILDER_VERSION=FORM_BUILDER_VERSION" > version.env
echo "Published version: FORM_BUILDER_VERSION"
