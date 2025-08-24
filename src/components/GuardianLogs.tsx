import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Log {
  id: number;
  action: string;
  ai: string;
  status: "safe" | "warning" | "blocked";
  reason: string;
  timestamp: string;
}

const logs: Log[] = [
  {
    id: 1,
    action: "Delete all emails",
    ai: "MailBot",
    status: "blocked",
    reason: "Critical data loss risk detected",
    timestamp: "2025-08-23 14:32",
  },
  {
    id: 2,
    action: "Summarize customer reviews",
    ai: "ReviewAI",
    status: "safe",
    reason: "No harmful bias detected",
    timestamp: "2025-08-23 13:15",
  },
  {
    id: 3,
    action: "Generate job candidate ranking",
    ai: "HR-AI",
    status: "warning",
    reason: "Potential gender bias in dataset",
    timestamp: "2025-08-23 12:05",
  },
];

const statusColors: Record<Log["status"], string> = {
  safe: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  blocked: "bg-red-100 text-red-700",
};

export default function GuardianLogs() {
  return (
    <div className="container mx-auto py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Guardian AI Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between rounded-lg border p-4 bg-white shadow-sm"
              >
                <div>
                  <p className="font-semibold">{log.action}</p>
                  <p className="text-sm text-muted-foreground">
                    Requested by <span className="font-medium">{log.ai}</span>
                  </p>
                  <p className="text-sm mt-1">{log.reason}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {log.timestamp}
                  </p>
                </div>
                <Badge className={statusColors[log.status]}>{log.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
