#!/bin/sh
# Single source of truth for the app version and build number.
# Mirrors src-capacitor/android/app/build.gradle, so the two native targets
# always report the same pair.
#
#   CFBundleShortVersionString  <- package.json "version", e.g. "1.0.0"
#   CFBundleVersion             <- git commit count, e.g. 867
#
# The build number is `git rev-list --count HEAD`, the same source every other
# project here uses - guitar_tap, GuitarTap, GuitarTapWeb, pdfarranger and
# marklens-ports. It rises with every commit, which is what App Store Connect
# requires of CFBundleVersion, and it names the commit a build came from.
#
# It replaces a number derived from the semver (major*10000 + minor*100 +
# patch), which gave every build of one version the same CFBundleVersion. Apple
# refuses a second upload carrying a build number already seen, so shipping two
# builds of 1.0.0 meant editing the version to get a new one.
#
# Xcode runs this as a build phase. It rewrites the Info.plist inside the
# *built* .app, never the one in the source tree, so a build never dirties git.
set -e

PACKAGE_JSON="${SRCROOT}/../../../package.json"
[ -f "${PACKAGE_JSON}" ] || { echo "error: ${PACKAGE_JSON} not found"; exit 1; }

# Strip any pre-release suffix ("1.0.0-beta.1" -> "1.0.0"), as CFBundle keys
# only accept dotted integers.
VERSION=$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "${PACKAGE_JSON}" | head -1)
VERSION=${VERSION%%-*}
[ -n "${VERSION}" ] || { echo "error: no version field in ${PACKAGE_JSON}"; exit 1; }

# No fallback. A shallow clone reports 1, and a wrong CFBundleVersion is not a
# cosmetic problem: Apple accepts the upload and then refuses every later one
# whose build number is not higher. Failing here costs a rebuild; failing at
# upload costs a version bump nobody wanted to make.
BUILD=$(git -C "${SRCROOT}" rev-list --count HEAD 2>/dev/null || echo "")
case "${BUILD}" in
  ''|*[!0-9]*)
    echo "error: cannot determine the build number from git."
    echo "error: CFBundleVersion is the commit count, so this needs a full"
    echo "error: checkout - a shallow clone (git clone --depth) reports 1."
    exit 1
    ;;
esac
[ "${BUILD}" -ge 2 ] || { echo "error: commit count is ${BUILD}, which means a shallow clone"; exit 1; }

PLIST="${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
[ -f "${PLIST}" ] || { echo "error: built Info.plist not found at ${PLIST}"; exit 1; }

/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${VERSION}" "${PLIST}"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${BUILD}" "${PLIST}"

echo "note: version set to ${VERSION} (build ${BUILD})"
