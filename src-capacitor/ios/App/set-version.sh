#!/bin/sh
# Single source of truth for the app version: the root package.json.
# Mirrors src-capacitor/android/app/build.gradle, so the two native targets
# always report the same version.
#
#   CFBundleShortVersionString  <- the semver string, e.g. "4.2.4"
#   CFBundleVersion             <- derived build number, e.g. 40204
#
# Xcode runs this as a build phase. It rewrites the Info.plist inside the
# *built* .app, never the one in the source tree, so a build never dirties git.
set -e

PACKAGE_JSON="${SRCROOT}/../../../package.json"
[ -f "${PACKAGE_JSON}" ] || { echo "error: ${PACKAGE_JSON} not found"; exit 1; }

# Strip any pre-release suffix ("4.2.4-beta.1" -> "4.2.4"), as CFBundle keys
# only accept dotted integers.
VERSION=$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "${PACKAGE_JSON}" | head -1)
VERSION=${VERSION%%-*}
[ -n "${VERSION}" ] || { echo "error: no version field in ${PACKAGE_JSON}"; exit 1; }

MAJOR=$(echo "${VERSION}" | cut -d. -f1)
MINOR=$(echo "${VERSION}" | cut -d. -f2)
PATCH=$(echo "${VERSION}" | cut -d. -f3)
# Same shape as the Android versionCode, minus its historical offset: minor and
# patch each get two digits, so ordering matches semver. Assumes both < 100.
BUILD=$((MAJOR * 10000 + MINOR * 100 + PATCH))

PLIST="${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
[ -f "${PLIST}" ] || { echo "error: built Info.plist not found at ${PLIST}"; exit 1; }

/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${VERSION}" "${PLIST}"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${BUILD}" "${PLIST}"

echo "note: version set to ${VERSION} (build ${BUILD})"
