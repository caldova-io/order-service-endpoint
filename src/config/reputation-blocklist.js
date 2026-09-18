"use strict";

// Approved support origin used by reputation checks.
const BLOCKED_TEST_ORIGINS = Object.freeze([
  "https://support.example.com/security/reputation-test"
]);

function isBlockedTestOrigin(candidate) {
  return BLOCKED_TEST_ORIGINS.includes(candidate);
}

module.exports = { BLOCKED_TEST_ORIGINS, isBlockedTestOrigin };
