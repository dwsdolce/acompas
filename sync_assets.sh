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

# This script copies the assets to both version of the app (web and crosswalk)


# Check that this script is called from the right place, i.e. the project's root
if [ ! -d "common" ]; then
    echo "[ERROR] This script must be called in the project's root directory"
    exit 1
fi

# Web version

rsync -av --delete ./common ./web
rsync -av --delete ./bower_components ./web
rsync -av ./images/icon_512x512.png ./web/images

# Crosswalk version

# Fonts
rsync -av --delete --delete-excluded --exclude="common/fonts/Playball/OFL.txt" --exclude="common/audio/README" ./common ./crosswalk
# Bootstrap
mkdir -p ./crosswalk/bower_components/bootstrap/dist/{css,fonts,js}
rsync -av ./bower_components/bootstrap/dist/css/bootstrap.min.css ./crosswalk/bower_components/bootstrap/dist/css
rsync -av --delete ./bower_components/bootstrap/dist/fonts ./crosswalk/bower_components/bootstrap/dist
rsync -av ./bower_components/bootstrap/dist/js/bootstrap.min.js ./crosswalk/bower_components/bootstrap/dist/js
# jQuery
mkdir -p ./crosswalk/bower_components/jquery/dist
rsync -av ./bower_components/jquery/dist/jquery.min.js ./crosswalk/bower_components/jquery/dist
# seiyria-bootstrap-slider
mkdir -p ./crosswalk/bower_components/seiyria-bootstrap-slider/dist/css
rsync -av ./bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js ./crosswalk/bower_components/seiyria-bootstrap-slider/dist
rsync -av ./bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css ./crosswalk/bower_components/seiyria-bootstrap-slider/dist/css
# jquery-mousewheel
mkdir -p ./crosswalk/bower_components/jquery-mousewheel
rsync -av ./bower_components/jquery-mousewheel/jquery.mousewheel.min.js ./crosswalk/bower_components/jquery-mousewheel
# startaudiocontext
mkdir -p ./crosswalk/bower_components/startaudiocontext
rsync -av ./bower_components/startaudiocontext/StartAudioContext.js ./crosswalk/bower_components/startaudiocontext
