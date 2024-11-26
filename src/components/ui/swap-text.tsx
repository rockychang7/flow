import { useState } from "react";
import { cn } from "@/lib/utils";

interface SwapTextProps extends React.ComponentPropsWithoutRef<"div"> {
    /**
     * The initial text to display.
     */
    initialText: string;

    /**
     * The final text to display.
     */
    finalText: string;

    /**
     * Whether the component should toggle on hover as well as click.
     */
    supportsHover?: boolean;

    /**
     * The class name for the text.
     */
    textClassName?: string;

    /**
     * The class name for the initial text.
     */
    initialTextClassName?: string;

    /**
     * The class name for the final text.
     */
    finalTextClassName?: string;

    /**
     * Whether to disable the click interaction.
     */
    disableClick?: boolean;
}

export default function SwapText({
                                     initialText,
                                     finalText,
                                     className,
                                     supportsHover = true,
                                     textClassName,
                                     initialTextClassName,
                                     finalTextClassName,
                                     disableClick,
                                     ...props
                                 }: SwapTextProps) {
    const [active, setActive] = useState(false);
    const common = "block transition-all duration-1000 ease-slow whitespace-nowrap";

    const longWord = finalText.length > initialText.length ? finalText : null;

    return (
        <div
            {...props}
            className={cn(
                "relative top-[6px] overflow-hidden text-foreground inline-block",
                className
            )}
        >
            <div className={cn("group cursor-pointer underline select-none font-bold inline-block", textClassName)}>
                <span
                    className={cn(common, initialTextClassName, {
                        "flex flex-col": false, // Remove flex column
                        "-translate-y-full": active,
                        "group-hover:-translate-y-full": supportsHover,
                    })}
                >
                    {initialText}
                    {Boolean(longWord?.length) && <span className="invisible h-0">{longWord}</span>}
                </span>
                <span
                    className={cn(`${common} absolute underline top-full`, finalTextClassName, {
                        "-translate-y-full": active,
                        "group-hover:-translate-y-full": supportsHover,
                    })}
                >
                    {finalText}
                </span>
            </div>
        </div>
    );
}