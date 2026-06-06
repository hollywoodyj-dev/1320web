# S6 Money Frequency · QA Notes

## Scope
S6 contains 44 Money Frequency archetypes, S6-01 to S6-44.

Each record includes:
- Money Core Frequency
- Shadow Frequency
- Soul–Wealth Relationship
- Karmic Money Lesson
- Wisewave Guidance
- Safety Disclaimer

## Mapping Recommendation
For MVP / canonical implementation:

```text
S1-01 → S6-01
S1-02 → S6-02
...
S1-44 → S6-44
```

This means S6 base archetype follows the S1 Origin Frequency number.

For future Full Report personalization, the final S6 interpretation may be generated from:

```text
S6 base archetype
+ S3 expression style
+ S2 relational resource pattern
+ S0 receiving / worth illusion
```

## Important Safety Boundary
S6 is not financial advice.

It must not:
- predict income
- promise wealth
- provide investment advice
- suggest buy/sell decisions
- guarantee abundance
- imply financial certainty

S6 may only discuss:
- worth
- receiving
- value expression
- visibility
- emotional / energetic relationship with resources
- grounded self-awareness practices

## Lookup Rule
Use code as the only lookup key:

```text
contentMap["S6-24"]
```

Do not use:
```text
contentMap["Communication Wealth"]
s6List[24]
```

## Fallback Rule
If an S6 record is missing, do not generate generic wealth content.

Development:
```text
throw error
```

Production:
```text
show safe error and notify admin
```

## Version
contentVersion: s6-master-v1.0
