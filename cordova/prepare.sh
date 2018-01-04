#!/bin/bash -x

rsync -av ./www/fonts ./platforms/android/app/src/main/assets/www
rsync -av ./www/js ./platforms/android/app/src/main/assets/www
rsync -av ./www/statics ./platforms/android/app/src/main/assets/www
rsync -av ./www/app.*.css ./platforms/android/app/src/main/assets/www
rsync -av ./www/index.html ./platforms/android/app/src/main/assets/www
rsync -av ./res/icon/android/icon-36-ldpi.png ./platforms/android/app/src/main/res/mipmap-ldpi/icon.png
rsync -av ./res/icon/android/icon-48-mdpi.png ./platforms/android/app/src/main/res/mipmap-mdpi/icon.png
rsync -av ./res/icon/android/icon-72-hdpi.png ./platforms/android/app/src/main/res/mipmap-hdpi/icon.png
rsync -av ./res/icon/android/icon-96-xhdpi.png ./platforms/android/app/src/main/res/mipmap-xhdpi/icon.png
rsync -av ./res/icon/android/icon-144-xxhdpi.png ./platforms/android/app/src/main/res/mipmap-xxhdpi/icon.png
rsync -av ./res/icon/android/icon-192-xxxhdpi.png ./platforms/android/app/src/main/res/mipmap-xxxhdpi/icon.png
