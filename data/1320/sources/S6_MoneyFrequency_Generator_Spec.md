# S6 Money Frequency · Generator Spec

## Definition
S6 is the Money Frequency layer.

It reflects a symbolic relationship with:
- worth
- receiving
- value expression
- visibility
- emotional / energetic relationship with resources
- resource flow

It is not financial advice.

## MVP Mapping
Use S1 number as the base S6 archetype:

```text
S1-24 → S6-24
```

## Recommended API Shape

```json
{
  "s6MoneyFrequency": {
    "baseCode": "S6-24",
    "baseSource": "S1-24",
    "moneyCoreFrequency": {
      "zh": "string",
      "en": "string"
    },
    "shadowFrequency": {
      "zh": "string",
      "en": "string"
    },
    "soulWealthRelationship": {
      "zh": "string",
      "en": "string"
    },
    "karmicMoneyLesson": {
      "zh": "string",
      "en": "string"
    },
    "wisewaveGuidance": {
      "zh": "string",
      "en": "string"
    },
    "safetyDisclaimer": {
      "zh": "此部分不是财务建议，也不预测收入、投资结果或财务成功。",
      "en": "This section is not financial advice and does not predict income, investment outcomes, or financial success."
    }
  }
}
```

## Future Personalized S6 Integration
After MVP, S6 can be personalized through:

```text
S6 base archetype from S1
+ S3 expression style
+ S2 relational / resource pattern
+ S0 worth / receiving / illusion pattern
```

This should be named:

```text
moneyFrequencyIntegration
```

Do not overwrite the canonical S6 base data.

## Safety Rules
Do not output:
- “You will become rich”
- “You are guaranteed abundance”
- “Invest in…”
- “Buy / sell…”
- “Your income will…”
- “This financial decision is right/wrong”

Use:
- “This may reflect…”
- “This pattern invites reflection around…”
- “A grounded practice is…”
- “This is not financial advice…”

## Fallback Rule
If S6 base content is missing, do not generate a generic money reading.

Return safe error:
```text
Your Money Frequency section could not be generated because the S6 base archetype is missing.
```

## Version
s6-generator-spec-v1.0
