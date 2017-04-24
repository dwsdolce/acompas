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


docker image prune --all --force
# Remove all stopped containers
CONTAINERS=$(docker ps -a -q)
if [ "$CONTAINERS" == "" ]; then
  echo "No stopped docker container(s) to remove"
else
  docker rm $CONTAINERS
fi
# Remove all untagged images
IMAGES=$(docker images | grep '^<none>' | awk '{print $3}')
if [ "$IMAGES" == "" ]; then
  echo "No docker untagged image(s) to remove"
else
  docker rmi --force $IMAGES
fi
