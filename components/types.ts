
export interface Task {
  id: string;
  title: string;
  dueDate: string; // YYYY-MM-DD
  dueTime: string; // HH:MM
  reminder: boolean;
  completed: boolean;
}

export interface AppSettings {
  notificationsEnabled: boolean;
}
