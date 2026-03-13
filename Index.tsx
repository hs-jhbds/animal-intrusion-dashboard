import { useState, useEffect } from "react";
import TopNavBar from "@/components/TopNavBar";
import SystemStatusPanel from "@/components/SystemStatusPanel";
import LiveDetectionPanel from "@/components/LiveDetectionPanel";
import AlertPanel from "@/components/AlertPanel";
import DetectionHistoryTable, { DetectionRecord } from "@/components/DetectionHistoryTable";
import FarmMapPanel from "@/components/FarmMapPanel";
import SensorStatusBar from "@/components/SensorStatusBar";

const mockRecords: DetectionRecord[] = [
  { id: "DET-007", date: "2026-03-13", time: "12:45:22", type: "Animal", tempDiff: "4.2" },
  { id: "DET-006", date: "2026-03-13", time: "11:32:10", type: "Human", tempDiff: "6.8" },
  { id: "DET-005", date: "2026-03-13", time: "09:18:44", type: "Animal", tempDiff: "3.5" },
  { id: "DET-004", date: "2026-03-13", time: "07:05:31", type: "Animal", tempDiff: "5.1" },
  { id: "DET-003", date: "2026-03-12", time: "22:41:09", type: "Human", tempDiff: "7.3" },
  { id: "DET-002", date: "2026-03-12", time: "19:14:55", type: "Animal", tempDiff: "2.9" },
  { id: "DET-001", date: "2026-03-12", time: "16:28:37", type: "Animal", tempDiff: "4.7" },
];

const Index = () => {
  const [isIntrusion, setIsIntrusion] = useState(false);
  const [records, setRecords] = useState<DetectionRecord[]>(mockRecords);
  const [refreshCount, setRefreshCount] = useState(0);

  // Auto-refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount((c) => c + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate intrusion toggle for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setIsIntrusion((prev) => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const todayCount = records.filter((r) => r.date === "2026-03-13").length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavBar />

      <main className="flex-1 p-4 md:p-6 space-y-4 max-w-[1600px] mx-auto w-full">
        {/* Sensor Bar */}
        <SensorStatusBar />

        {/* Alert */}
        <AlertPanel isIntrusion={isIntrusion} />

        {/* Top Row: Status + Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <SystemStatusPanel
              isIntrusion={isIntrusion}
              isOnline={true}
              lastDetectionTime="12:45:22"
              totalIntrusions={todayCount}
            />
          </div>
          <div className="lg:col-span-2">
            <LiveDetectionPanel />
          </div>
        </div>

        {/* Bottom Row: History + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <DetectionHistoryTable records={records} />
          </div>
          <div className="lg:col-span-1">
            <FarmMapPanel />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 text-xs text-muted-foreground font-mono">
          AI Animal Intrusion Detection System v1.0 — ESP32 IoT Platform — Auto-refresh: {refreshCount} cycles
        </div>
      </main>
    </div>
  );
};

export default Index;
