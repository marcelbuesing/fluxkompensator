#  Based on https://shaneutt.com/blog/rust-fast-small-docker-image-builds/

# ------------------------------------------------------------------------------
# Cargo Build Stage
# ------------------------------------------------------------------------------

FROM rust:latest as wasm-build

RUN apt-get update

# NodeJS
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN npm i -g npm@latest

# wasm-pack
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

WORKDIR /usr/src/ecuweb

RUN npm install

COPY . .

RUN npm run build

# ------------------------------------------------------------------------------
# Final Stage
# ------------------------------------------------------------------------------

FROM nginx:alpine

COPY --from=wasm-build /usr/src/ecuweb/dist /usr/share/nginx/html

COPY nginx.conf /usr/share/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# COPY mime.types /usr/share/nginx/mime.types
# COPY mime.types /etc/nginx/mime.types

EXPOSE 80
