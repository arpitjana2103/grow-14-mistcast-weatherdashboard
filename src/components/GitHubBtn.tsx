import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "./ui/button";

export default function GitHubBtn() {
    return (
        <a
            href="https://github.com/arpitjana2103/grow-14-open-weather-cast"
            target="_blank"
            rel="noopener noreferrer"
        >
            <Button className="h-10 cursor-pointer border border-foreground/50 bg-foreground/10 hover:bg-foreground/20">
                <HugeiconsIcon
                    icon={GithubIcon}
                    size={19}
                    color="currentColor"
                    strokeWidth={2}
                    className="text-foreground/80"
                />
                <span className="text-foreground/80">Github</span>
            </Button>
        </a>
    );
}
