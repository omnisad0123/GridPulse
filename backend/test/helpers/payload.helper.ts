export function meterPayload(overrides: Record<string, unknown> = {}) {
  return {
    meterId: 'M1',
    kwhConsumedAc: 10.5,
    voltage: 220,
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}

export function vehiclePayload(overrides: Record<string, unknown> = {}) {
  return {
    vehicleId: 'V1',
    soc: 60,
    kwhDeliveredDc: 8.5,
    batteryTemp: 32,
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}
