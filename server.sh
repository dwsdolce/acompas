#!/bin/sh -x

# This script starts a simple web server which will serve the web
# version of the application on http://localhost:8000

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

# Check that this script is called from the right place, i.e. the project's root
if [ ! -d "common" ]; then
    echo "[ERROR] This script must be called in the project's root directory"
    exit 1
fi

( cd web && python3 -m http.server 8000 --bind 192.168.0.11 )
