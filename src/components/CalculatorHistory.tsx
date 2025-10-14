import { Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { format } from "date-fns";

export const CalculatorHistory = () => {
  const { history, clearHistory, removeFromHistory } = useCalculatorHistory();

  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Recent Calculators</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={clearHistory}>
          Clear All
        </Button>
      </div>
      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{item.title}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {item.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(item.timestamp), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromHistory(item.id)}
              className="ml-2 flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
