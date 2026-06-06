# S5 Seed Database QA Notes

Version: s5-seeds-bilingual-v1.0  
Created: 2026-06-06

## Core Rule

S5 is not randomly generated.

S5 must be assembled from:

- S1 Primary Mission Seed
- S2 Mirror Task Seed
- S3 Vibration Carrier Seed
- S0 Void Challenge Seed

## Record Count

- S1: 44
- S2: 50
- S3: 12
- S0: 20
- Total: 126

## Lookup Rules

Use source code as lookup key:

```text
S1-24
S2-23
S3-04
S0-09
```

Do not use title-based lookup or array index lookup.

## Generation Signature

Each S5 report should use:

```text
S1-XX|S3-XX|S2-XX|S0-XX
```

Example:

```text
S1-24|S3-04|S2-23|S0-09
```

## Safety Rules

S5 output must not include:

- destiny claims
- future prediction
- financial guarantees
- medical/legal advice
- relationship verdicts
- "you must fulfill this"
- "you are destined to"

Use language such as:

- your mission may express through
- this pattern invites
- a grounded direction is
- your blueprint may point toward

## Missing Seed Behavior

Development: throw error.  
Production: show safe message and notify admin.

Do not generate generic S5 if any seed is missing.
