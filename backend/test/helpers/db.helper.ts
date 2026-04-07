import { DatabaseService } from '../../src/database/database.service';

export function resetDatabase(database: DatabaseService) {
  database.reset();
}
