# Changelog

## [0.1.0] - 2026-11-02

### Added

- `speckit.guildwork.request`: writes the request from spec, plan and tasks, with the SHA-256 of each. Offered after `/speckit.tasks`.
- `speckit.guildwork.verdict`: the person who decides records `approved`, `held` or `refused`; a reason is required for the last two.
- `speckit.guildwork.gate`: mandatory before `/speckit.implement`; refuses on the first of seven conditions and names it.
- `speckit.guildwork.close`: closes the run on `delivered`, `partial` or `stopped`, criterion by criterion. Offered after `/speckit.implement`.
- The register, `.specify/memory/guildwork-register.md`: one line per verdict and per close, never edited.
