import TempChart from "@/components/forecastPage/hourly-weather-card/TempChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function Charts() {
    return (
        <Tabs defaultValue="Temperature" className="mt-6 w-full">
            <TabsList className="gap-1 overflow-hidden rounded-full bg-transparent p-0">
                <TabsTrigger
                    className={cn(
                        "h-full rounded-none border border-border bg-accent text-sm text-foreground",
                        "rounded-l-full pl-2.5 rounded-r-full pr-2.5",
                        "hover:bg-accent/20 data-active:border-primary data-active:bg-primary/10 data-active:text-primary hover:data-active:text-primary",
                    )}
                    value="Temperature"
                >
                    Temperature
                </TabsTrigger>
                {/*<TabsTrigger
                    className={cn(
                        "h-full rounded-none border border-border bg-accent text-sm text-foreground",
                        "rounded-r-full pr-2.5",
                        "hover:bg-accent/20 data-active:border-primary data-active:bg-primary/10 data-active:text-primary hover:data-active:text-primary",
                    )}
                    value="Temperaturee"
                >
                    Temperature
                </TabsTrigger>*/}
            </TabsList>
            <TabsContent value="Temperature" className="w-full">
                <TempChart />
            </TabsContent>
        </Tabs>
    );
}

/*

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              View your key metrics and recent project activity. Track progress
              across all your active projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have 12 active projects and 3 pending tasks.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Generate and download your detailed reports. Export data in
              multiple formats for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have 5 reports ready and available to export.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and options. Customize your
              experience to fit your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Configure notifications, security, and themes.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

*/
