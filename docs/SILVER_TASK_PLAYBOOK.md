# Silver Task Playbook

This playbook lists concrete task patterns that can be authored from GridPulse without creating artificial bugs. Each pattern is behavioral, deterministic, and suitable for a test harness.

## Candidate 1: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 2: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 3: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 4: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 5: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 6: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 7: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 8: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 9: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 10: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 11: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 12: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 13: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 14: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 15: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 16: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 17: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 18: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 19: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 20: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 21: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 22: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 23: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 24: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 25: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 26: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 27: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 28: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 29: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 30: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 31: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 32: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 33: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 34: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 35: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 36: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 37: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 38: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 39: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 40: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 41: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 42: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 43: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 44: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 45: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 46: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 47: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 48: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 49: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 50: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 51: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 52: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 53: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 54: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 55: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 56: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 57: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 58: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 59: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 60: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 61: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 62: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 63: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 64: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 65: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 66: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 67: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 68: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 69: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 70: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 71: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 72: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 73: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 74: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 75: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 76: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 77: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 78: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 79: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 80: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 81: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 82: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 83: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 84: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 85: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 86: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 87: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 88: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 89: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 90: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 91: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 92: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 93: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 94: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 95: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 96: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 97: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 98: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 99: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 100: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 101: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 102: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 103: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 104: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 105: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 106: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 107: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 108: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 109: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 110: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 111: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 112: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 113: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 114: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 115: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 116: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 117: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 118: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 119: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 120: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 121: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 122: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 123: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 124: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 125: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 126: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 127: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 128: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 129: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 130: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 131: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 132: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 133: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 134: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 135: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 136: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 137: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 138: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 139: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 140: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 141: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 142: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 143: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 144: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 145: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 146: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 147: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 148: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 149: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 150: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 151: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 152: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 153: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 154: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 155: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 156: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 157: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 158: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 159: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 160: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 161: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 162: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 163: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 164: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 165: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 166: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 167: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 168: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 169: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 170: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 171: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 172: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 173: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 174: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 175: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 176: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 177: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 178: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 179: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 180: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 181: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 182: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 183: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 184: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 185: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 186: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 187: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 188: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 189: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 190: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 191: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 192: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 193: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 194: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 195: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 196: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 197: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 198: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 199: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 200: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 201: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 202: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 203: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 204: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 205: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 206: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 207: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 208: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 209: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 210: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 211: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 212: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 213: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 214: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 215: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 216: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 217: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 218: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 219: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 220: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 221: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 222: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 223: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 224: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 225: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 226: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 227: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 228: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 229: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 230: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 231: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 232: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 233: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 234: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 235: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 236: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 237: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 238: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 239: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 240: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 241: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 242: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 243: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 244: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 245: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 246: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 247: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 248: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 249: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 250: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 251: meter-invalid invariant hardening
- Symptom: a regression in meter-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 252: vehicle-valid invariant hardening
- Symptom: a regression in vehicle-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 253: vehicle-invalid invariant hardening
- Symptom: a regression in vehicle-invalid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 254: batch invariant hardening
- Symptom: a regression in batch causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 255: analytics invariant hardening
- Symptom: a regression in analytics causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 256: alerts invariant hardening
- Symptom: a regression in alerts causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 257: audit invariant hardening
- Symptom: a regression in audit causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 258: exports invariant hardening
- Symptom: a regression in exports causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 259: history invariant hardening
- Symptom: a regression in history causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.

## Candidate 260: meter-valid invariant hardening
- Symptom: a regression in meter-valid causes a public API response to drift from the documented contract.
- Good instruction: describe the expected behavior using inputs and outputs, without naming the implementation function or patch location.
- Good test: call the API, assert the externally visible result, and verify that unrelated state is unchanged.
- Bad test: grep source files, assert a variable name, or require a specific private helper to exist.
- Difficulty lever: combine timestamp ordering, pagination, audit visibility, and disabled-rule state so the fix requires tracing more than one module.
