# ECU-Web

ECU-Web can currently be used as a CAN (database) DBC viewer using the [can-dbc](https://crates.io/crates/can-dbc) Rust crate for parsing DBC files.
The DBC content is rendered using React.

Example Screenshot of [J1939](https://en.wikipedia.org/wiki/SAE_J1939) dbc:
![screenshot](/media/screenshot.png)

# Prerequisites
* Install [wasm-pack](https://github.com/rustwasm/wasm-pack)
* Install npm

# Build and Run
* `cd crate && wasm-pack build`

* `npm run start` -- Serve the project locally for development at
  `http://localhost:8080`.

* `npm run build` -- Bundle the project (in production mode).


For more details: WASM Template Tutorial: https://rustwasm.github.io/docs/wasm-pack/tutorials/index.html