import {
    ArrowDown01Icon,
    CelsiusIcon,
    FahrenheitIcon,
    Setting07Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUnitContext, type TUnit } from "@/contexts/unit.context";

import { Label } from "./ui/label";

export default function UnitSystemToggle() {
    const { unit, setUnit } = useUnitContext();
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-10 cursor-pointer border border-foreground/50 bg-accent text-foreground hover:bg-accent/20">
                        <span className="flex items-center gap-1">
                            <HugeiconsIcon
                                icon={Setting07Icon}
                                size={19}
                                color="currentColor"
                                className="text-foreground/80"
                                strokeWidth={1.7}
                            />
                            <HugeiconsIcon
                                icon={ArrowDown01Icon}
                                size={17}
                                color="currentColor"
                                className="text-foreground/80"
                                strokeWidth={1.7}
                            />
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-1 no-scrollbar w-fit translate-x-[-8.6rem] border px-2.5 py-2">
                    <p className="mb-1.5">Unit Settings</p>
                    <RadioGroup
                        defaultValue={unit}
                        onValueChange={(value: TUnit) => setUnit(value)}
                        className="flex items-center gap-4"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="metric" id="r1" />
                            <Label htmlFor="r1" className="cursor-pointer">
                                <div className="flex items-end gap-2">
                                    <span>
                                        <HugeiconsIcon
                                            icon={CelsiusIcon}
                                            size={17}
                                            strokeWidth={2}
                                        />
                                    </span>
                                    <span>Metric</span>
                                </div>
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="imperial" id="r3" />
                            <Label htmlFor="r3" className="cursor-pointer">
                                <div className="flex items-end gap-2">
                                    <span>
                                        <HugeiconsIcon
                                            icon={FahrenheitIcon}
                                            size={17}
                                            strokeWidth={2}
                                        />
                                    </span>
                                    <span>Imperial</span>
                                </div>
                            </Label>
                        </div>
                    </RadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
