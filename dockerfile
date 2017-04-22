#change this to your own repo, should you have uploaded your image!
FROM ubuntu:zesty

WORKDIR /opt/app

RUN apt-get -y update
RUN apt-get -y dist-upgrade
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash
RUN apt-get install -y nodejs npm nodejs-legacy git nginx
RUN npm i -g bower

COPY . /opt/app
RUN bower --allow-root install
RUN ./sync_assets.sh
RUN service nginx stop
RUN chown -R www-data:www-data /opt/app

EXPOSE 8080

#CMD /bin/sh
