import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EntityNotFoundException, InvalidPayloadException } from '../common/exceptions/gridpulse.exception';
import { paginate } from '../common/utils/pagination.util';
import { WorkOrder, WorkOrderPriority, WorkOrderStatus } from './dto/maintenance.dto';

const PRIORITIES: WorkOrderPriority[] = ['low', 'medium', 'high', 'urgent'];
const STATUSES: WorkOrderStatus[] = ['open', 'assigned', 'resolved', 'cancelled'];

@Injectable()
export class MaintenanceService {
  private readonly workOrders = new Map<string, WorkOrder>();

  create(body: any): WorkOrder {
    if (!['meter', 'vehicle', 'site'].includes(body?.entityType) || !body?.entityId || !body?.title) {
      throw new InvalidPayloadException('Work order requires entityType, entityId, and title');
    }
    const priority = (body.priority ?? 'medium') as WorkOrderPriority;
    if (!PRIORITIES.includes(priority)) throw new InvalidPayloadException('Unsupported work order priority');
    const now = new Date();
    const workOrder: WorkOrder = {
      id: randomUUID(),
      entityType: body.entityType,
      entityId: String(body.entityId),
      priority,
      status: 'open',
      title: String(body.title),
      description: String(body.description ?? ''),
      assignedTo: body.assignedTo ? String(body.assignedTo) : null,
      createdAt: now,
      updatedAt: now,
      resolvedAt: null,
    };
    this.workOrders.set(workOrder.id, workOrder);
    return workOrder;
  }

  list(query: any = {}) {
    const status = query.status as WorkOrderStatus | undefined;
    const priority = query.priority as WorkOrderPriority | undefined;
    const entityId = query.entityId ? String(query.entityId) : undefined;
    const rows = [...this.workOrders.values()]
      .filter((order) => !status || order.status === status)
      .filter((order) => !priority || order.priority === priority)
      .filter((order) => !entityId || order.entityId === entityId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return paginate(rows, { page: Number(query.page ?? 1), limit: Number(query.limit ?? 25) });
  }

  update(id: string, body: any): WorkOrder {
    const current = this.workOrders.get(id);
    if (!current) throw new EntityNotFoundException('WorkOrder', id);
    const status = body.status as WorkOrderStatus | undefined;
    const priority = body.priority as WorkOrderPriority | undefined;
    if (status && !STATUSES.includes(status)) throw new InvalidPayloadException('Unsupported work order status');
    if (priority && !PRIORITIES.includes(priority)) throw new InvalidPayloadException('Unsupported work order priority');
    const updated: WorkOrder = {
      ...current,
      priority: priority ?? current.priority,
      status: status ?? current.status,
      title: body.title === undefined ? current.title : String(body.title),
      description: body.description === undefined ? current.description : String(body.description),
      assignedTo: body.assignedTo === undefined ? current.assignedTo : String(body.assignedTo),
      updatedAt: new Date(),
      resolvedAt: status === 'resolved' ? new Date() : current.resolvedAt,
    };
    this.workOrders.set(id, updated);
    return updated;
  }
}
