# Fluxkompensator

[![Build Status](https://travis-ci.org/marcelbuesing/fluxkompensator.svg?branch=master)](https://travis-ci.org/marcelbuesing/fluxkompensator)
[![Docker Build](https://img.shields.io/docker/cloud/build/marcelbuesing/fluxkompensator.svg)](https://hub.docker.com/r/marcelbuesing/fluxkompensator)
[![MicroBadger](https://images.microbadger.com/badges/image/marcelbuesing/fluxkompensator.svg)](https://microbadger.com/images/marcelbuesing/fluxkompensator)

Fluxkompensator can currently be used as a CAN (database) DBC viewer.
It uses the [can-dbc](https://crates.io/crates/can-dbc) Rust crate for parsing DBC files via WASM.
The DBC content is rendered using React.

Example Screenshot of [J1939](https://en.wikipedia.org/wiki/SAE_J1939) dbc:
![screenshot](/media/screenshot.png)

# Prerequisites
* Install [wasm-pack](https://github.com/rustwasm/wasm-pack)
* Install npm

# Build and Run
* `npm install` - Install JS dependencies

* `npm run start` -- Serve the project locally for development at
  `http://localhost:8080`.

* `npm run build` -- Bundle the project (in production mode).

For more details: WASM Template Tutorial: https://rustwasm.github.io/docs/wasm-pack/tutorials/index.html

# Docker Image
The docker image contains WASM/JS production builds.
The content is served via an nginx:alpine. Check the [Dockerfile](./Dockerfile) for details.

```
docker build -t fluxkompensator .
docker run -p 80:80 fluxkompensator:latest
```