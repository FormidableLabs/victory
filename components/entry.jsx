/**
 * Client entry point.
 */

/*globals document:false */

import Router from "../router";

const rootEl = document.getElementById("content");
Router.run(rootEl);
