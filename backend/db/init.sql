CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS meter_readings (
  id UUID PRIMARY KEY,
  meter_id TEXT NOT NULL,
  kwh_consumed_ac NUMERIC NOT NULL,
  voltage NUMERIC NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  batch_id UUID NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vehicle_readings (
  id UUID PRIMARY KEY,
  vehicle_id TEXT NOT NULL,
  soc NUMERIC NOT NULL,
  kwh_delivered_dc NUMERIC NOT NULL,
  battery_temp NUMERIC NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  batch_id UUID NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS current_meter_status (
  meter_id TEXT PRIMARY KEY,
  kwh_consumed_ac NUMERIC NOT NULL,
  voltage NUMERIC NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS current_vehicle_status (
  vehicle_id TEXT PRIMARY KEY,
  soc NUMERIC NOT NULL,
  kwh_delivered_dc NUMERIC NOT NULL,
  battery_temp NUMERIC NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS ingestion_batches (
  id UUID PRIMARY KEY,
  meter_count INTEGER NOT NULL,
  vehicle_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS alert_rules (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  kind TEXT NOT NULL,
  threshold NUMERIC NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS alert_events (
  id UUID PRIMARY KEY,
  rule_id UUID NOT NULL,
  rule_kind TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  measured_value NUMERIC NOT NULL,
  threshold NUMERIC NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS export_jobs (
  id UUID PRIMARY KEY,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  date_from TIMESTAMPTZ NULL,
  date_to TIMESTAMPTZ NULL,
  row_count INTEGER NOT NULL DEFAULT 0,
  content TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ NULL
);

CREATE INDEX IF NOT EXISTS idx_meter_readings_meter_time ON meter_readings(meter_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_vehicle_readings_vehicle_time ON vehicle_readings(vehicle_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_meter_readings_time ON meter_readings(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_vehicle_readings_time ON vehicle_readings(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_alert_events_entity ON alert_events(entity_type, entity_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);
