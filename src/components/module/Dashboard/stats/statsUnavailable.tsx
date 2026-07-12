import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

// Shown when /stats/* returns nothing — usually the backend is down or the profile row
// behind the token is missing. Better than rendering a dashboard full of zeroes.
const StatsUnavailable = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
        <AlertTriangle className="h-8 w-8 text-muted-foreground" />
        <p className="font-medium">Dashboard data unavailable</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          We could not load your dashboard right now. Refresh the page, or try again in a moment.
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsUnavailable;