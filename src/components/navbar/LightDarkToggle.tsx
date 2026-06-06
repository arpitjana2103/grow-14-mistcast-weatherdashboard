import { MoonFastWindIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { CloudSun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme.context";

export default function LightDarkToggle() {
    const { theme, handleThemeToggle } = useTheme();
    const isDark = theme === "dark";

    return (
        <div>
            <Button
                className="h-10 w-10 cursor-pointer rounded-full bg-primary transition-colors"
                onClick={handleThemeToggle}
            >
                {!isDark && (
                    <CloudSun
                        strokeWidth={1.8}
                        className="size-5 translate-x-[0.1rem] text-white-foreground"
                    />
                )}

                {isDark && (
                    <HugeiconsIcon
                        icon={MoonFastWindIcon}
                        strokeWidth={1.8}
                        className="size-5 text-white-foreground"
                    />
                )}
            </Button>
        </div>
    );
}
