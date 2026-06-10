export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'urgent';
export type WorkOrderStatus = 'open' | 'assigned' | 'resolved' | 'cancelled';

export interface WorkOrder {
  id: string;
  entityType: 'meter' | 'vehicle' | 'site';
  entityId: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  title: string;
  description: string;
  assignedTo: string | null;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date | null;
}
