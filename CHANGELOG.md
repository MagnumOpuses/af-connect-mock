# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0-beta]

### Added

- Using 'check-connectivity' module to serve health endpoint.

### Fixed

- Always set domain property of SSO cookie upon successful login. The cookie domain can explicitly be set by environment/config variable, otherwise the application will try to extract the SLD to be used as cookie domain.
- SSO Cookie domain is now prepended with a dot(punctuation) before SLD.

## [1.0.1-beta]

### Added

- Possibility to insert an extra apikey to database based upon provided environment variable "EXTRA_KEY".

### Fixed

- Removed unused property "cv" from dataset mock details.
- Display error alert to user upon login failure

## [1.0.0]

### Added

- Added changelog file
