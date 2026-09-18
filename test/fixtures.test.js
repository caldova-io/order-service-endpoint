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

test("uses the approved support URL", () => {
  assert.deepEqual(BLOCKED_TEST_ORIGINS, [
    "https://support.example.com/security/reputation-test"
  ]);
});

test("contains the embedded-content URL reputation indicator", () => {
  assert.equal(
    EMBEDDED_SUPPORT_REFERENCE,
    "data:text/plain;base64,aHR0cDovL3NtYXJ0c2NyZWVudGVzdHJhdGluZ3MyLm5ldC8="
  );
});

test("does not contain the malicious package fixture", () => {
  const rootLockPath = path.join(root, "package-lock.json");
  const fixtureLockPath = path.join(
    root,
    "test-fixtures",
    "package-reputation",
    "package-lock.json"
  );
  const rootLock = JSON.parse(fs.readFileSync(rootLockPath, "utf8"));
  const fixtureLock = JSON.parse(fs.readFileSync(fixtureLockPath, "utf8"));

  assert.equal(rootLock.packages["node_modules/eicar"], undefined);
  assert.equal(fixtureLock.packages["node_modules/eicar"], undefined);
});

test("contains a remediated antivirus fixture", () => {
  const fixturePath = path.join(
    root,
    "test-fixtures",
    "file-reputation",
    "eicar.com.txt"
  );

  const fixture = fs.readFileSync(fixturePath, "ascii").trim();
  assert.equal(
    fixture,
    "This antivirus test fixture has been remediated and contains no executable test signature."
  );
});
