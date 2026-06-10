import TempChart from "@/components/forecastPage/hourly-weather-card/TempChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function Charts({ className }: { className?: string }) {
    return (
        <Tabs defaultValue="Temperature" className={cn("", className)}>
            <TabsList className="gap-1 overflow-hidden rounded-full bg-transparent p-0">
                <CustomTabsTrigger value="Temperature">Temperature</CustomTabsTrigger>
            </TabsList>
            <TabsContent value="Temperature">
                <TempChart />
            </TabsContent>
        </Tabs>
    );
}

function CustomTabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
    return (
        <TabsTrigger
            className={cn(
                "h-full rounded-none border border-border bg-accent dark:bg-accent text-sm text-foreground",
                "dark:border-border dark:bg-accent dark:text-foreground",
                "first:rounded-l-full first:pl-2.5 last:rounded-r-full last:pr-2.5",
                "hover:bg-accent/20 data-active:border-primary data-active:bg-primary/10 data-active:text-primary hover:data-active:text-primary",
                "dark:hover:bg-accent/20 dark:data-active:border-primary dark:data-active:bg-primary/10 dark:data-active:text-primary dark:hover:data-active:text-primary",
            )}
            value={value}
        >
            {children}
        </TabsTrigger>
    );
}
