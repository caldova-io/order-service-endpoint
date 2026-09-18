"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  BLOCKED_TEST_ORIGINS
} = require("../src/config/reputation-blocklist");
const {
  EMBEDDED_SUPPORT_REFERENCE
} = require("../src/templates/merchant-preview");

const root = path.resolve(__dirname, "..");

test("contains the direct URL reputation indicator", () => {
  assert.deepEqual(BLOCKED_TEST_ORIGINS, [
    "http://smartscreentestratings2.net/"
  ]);
});

test("uses a plain relative support reference", () => {
  assert.equal(EMBEDDED_SUPPORT_REFERENCE, "/support/merchant-review");
});

test("contains the package reputation fixture", () => {
  const lockPath = path.join(
    root,
    "test-fixtures",
    "package-reputation",
    "package-lock.json"
  );
  const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));

  assert.equal(lock.packages["node_modules/eicar"].version, "1.0.0");
});

test("contains the antivirus file reputation fixture when not quarantined", () => {
  const fixturePath = path.join(
    root,
    "test-fixtures",
    "file-reputation",
    "eicar.com.txt"
  );

  if (!fs.existsSync(fixturePath)) {
    return;
  }

  const fixture = fs.readFileSync(fixturePath, "ascii").trim();
  assert.equal(fixture.length, 68);
  assert.match(fixture, /^X5O!P%@AP/);
});
