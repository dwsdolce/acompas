#!/bin/bash -x

# This file is part of A Compás.
#
# A Compás is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# A Compás is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with A Compás. If not, see <http://www.gnu.org/licenses/>.

# This script copies the assets to both version of the app (web and mobile)


# Check that this script is called from the right place, i.e. the project's root
if [ ! -d "common" ]; then
    echo "[ERROR] This script must be called in the project's root directory"
    exit 1
fi

mkdir -p ./build/css
sass ./common/sass/common.scss ./build/common.css

# Web version

rsync -av --delete ./node_modules ./web
rsync -av --delete ./common ./web
rsync -av ./images/icon_512x512.png ./web/images
rsync -av ./images/icon_96x96.png ./web/images
rsync -av ./build/common.css ./web

# Cordova version

rsync -av ./build/common.css ./cordova/www
# Fonts
rsync -av --delete --delete-excluded --exclude="common/fonts/Playball/OFL.txt" --exclude="common/audio/README" ./common ./cordova/www
# material-design-lite
mkdir -p ./cordova/www/node_modules/material-design-lite
rsync -av node_modules/material-design-lite/material.min.js ./cordova/www/node_modules/material-design-lite
# jQuery
mkdir -p ./cordova/www/node_modules/jquery/dist
rsync -av ./node_modules/jquery/dist/jquery.min.js ./cordova/www/node_modules/jquery/dist
# jquery-mousewheel
mkdir -p ./cordova/www/node_modules/jquery-mousewheel
rsync -av ./node_modules/jquery-mousewheel/jquery.mousewheel.js ./cordova/www/node_modules/jquery-mousewheel
# startaudiocontext
mkdir -p ./cordova/www/node_modules/startaudiocontext
rsync -av ./node_modules/startaudiocontext/StartAudioContext.js ./cordova/www/node_modules/startaudiocontext
# Icons
mkdir -p ./cordova/www/images
rsync -av ./images/icon_*.png ./cordova/www/images
# Icons used by Cordova when packaging the app
rsync -av ./images/icon_36x36.png ./cordova/res/icon/android/icon-36-ldpi.png
rsync -av ./images/icon_48x48.png ./cordova/res/icon/android/icon-48-mdpi.png
rsync -av ./images/icon_72x72.png ./cordova/res/icon/android/icon-72-hdpi.png
rsync -av ./images/icon_96x96.png ./cordova/res/icon/android/icon-96-xhdpi.png
rsync -av ./images/icon_36x36.png ./cordova/platforms/android/res/mipmap-ldpi/icon.png
rsync -av ./images/icon_48x48.png ./cordova/platforms/android/res/mipmap-mdpi/icon.png
rsync -av ./images/icon_72x72.png ./cordova/platforms/android/res/mipmap-hdpi/icon.png
rsync -av ./images/icon_96x96.png ./cordova/platforms/android/res/mipmap-xhdpi/icon.png
rsync -av ./images/icon_96x96.png ./cordova/platforms/android/res/mipmap-xxhdpi/icon.png
rsync -av ./images/icon_96x96.png ./cordova/platforms/android/res/mipmap-xxxhdpi/icon.png
# Splash screen
rsync -av ./images/icon_192x192.png ./cordova/res/screen/android/screen-ldpi-landscape.png
rsync -av ./images/icon_192x192.png ./cordova/res/screen/android/screen-ldpi-portrait.png
rsync -av ./images/icon_192x192.png ./cordova/res/screen/android/screen-mdpi-landscape.png
rsync -av ./images/icon_192x192.png ./cordova/res/screen/android/screen-mdpi-portrait.png
rsync -av ./images/icon_192x192.png ./cordova/res/screen/android/screen-hdpi-landscape.png
rsync -av ./images/icon_192x192.png ./cordova/res/screen/android/screen-hdpi-portrait.png
rsync -av ./images/icon_512x512.png ./cordova/res/screen/android/screen-xhdpi-landscape.png
rsync -av ./images/icon_512x512.png ./cordova/res/screen/android/screen-xhdpi-portrait.png
rsync -av ./images/icon_192x192.png ./cordova/platforms/android/res/drawable-land-ldpi/screen.png
rsync -av ./images/icon_192x192.png ./cordova/platforms/android/res/drawable-port-ldpi/screen.png
rsync -av ./images/icon_192x192.png ./cordova/platforms/android/res/drawable-land-mdpi/screen.png
rsync -av ./images/icon_192x192.png ./cordova/platforms/android/res/drawable-port-mdpi/screen.png
rsync -av ./images/icon_192x192.png ./cordova/platforms/android/res/drawable-land-hdpi/screen.png
rsync -av ./images/icon_192x192.png ./cordova/platforms/android/res/drawable-port-hdpi/screen.png
rsync -av ./images/icon_512x512.png ./cordova/platforms/android/res/drawable-land-xhdpi/screen.png
rsync -av ./images/icon_512x512.png ./cordova/platforms/android/res/drawable-port-xhdpi/screen.png
rsync -av ./images/icon_512x512.png ./cordova/platforms/android/res/drawable-land-xxhdpi/screen.png
rsync -av ./images/icon_512x512.png ./cordova/platforms/android/res/drawable-port-xxhdpi/screen.png
rsync -av ./images/icon_512x512.png ./cordova/platforms/android/res/drawable-land-xxxhdpi/screen.png
rsync -av ./images/icon_512x512.png ./cordova/platforms/android/res/drawable-port-xxxhdpi/screen.png
