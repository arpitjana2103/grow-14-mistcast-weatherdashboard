import { MoonFastWindIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { CloudSun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function LightDarkToggle() {
    const [isDark, setIsDark] = useState(function () {
        const storedMode = localStorage.getItem("theme");
        if (storedMode) return storedMode === "dark";
        else return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    function handleToggle() {
        setIsDark(!isDark);
    }
    return (
        <div>
            <Button
                className="h-10 w-10 cursor-pointer rounded-full bg-primary transition-colors"
                onClick={handleToggle}
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
