#!/usr/bin/env bash
#
# Configure npm trusted publishing (OIDC) for every published package, so
# `.github/workflows/release.yml` can publish without an npm token.
#
# A maintainer runs this once, locally, with npm >= 11.15.0 and 2FA enabled.
# Approve the first 2FA prompt and choose to skip 2FA for the next 5 minutes;
# the remaining calls then go through without prompting.
#
# Usage:
#   scripts/npm-trust.sh            # configure trust for all packages
#   scripts/npm-trust.sh --dry-run  # print what would be configured
#
# npm allows one trust configuration per package. To change one, run
# `npm trust list <pkg>` and `npm trust revoke --id <id> <pkg>` first.

set -euo pipefail

REPO="FormidableLabs/victory"
WORKFLOW="release.yml"
ENVIRONMENT="npm-publish"
MIN_NPM="11.15.0"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

DRY_RUN=""
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN="--dry-run"
fi

NPM_VERSION="$(npm --version)"
if [[ "$(printf '%s\n%s\n' "$MIN_NPM" "$NPM_VERSION" | sort -V | head -n1)" != "$MIN_NPM" ]]; then
  echo "npm >= $MIN_NPM is required (found $NPM_VERSION)" >&2
  exit 1
fi

# Every non-private package under packages/.
PKGS=()
for pkg_json in "$ROOT"/packages/*/package.json; do
  if [[ "$(node -p "require('$pkg_json').private === true")" == "false" ]]; then
    PKGS+=("$(node -p "require('$pkg_json').name")")
  fi
done

echo "Configuring trusted publishing for ${#PKGS[@]} packages:"
echo "  repo=$REPO workflow=$WORKFLOW environment=$ENVIRONMENT"

for pkg in "${PKGS[@]}"; do
  echo "--- $pkg"
  npm trust github "$pkg" \
    --file "$WORKFLOW" \
    --repo "$REPO" \
    --env "$ENVIRONMENT" \
    --allow-publish \
    --yes \
    $DRY_RUN
  # npm recommends a short pause between calls to avoid rate limiting.
  sleep 2
done

echo "Done. Check with: npm trust list <pkg>"
