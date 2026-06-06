// src/components/ui/ErrorBoundary.tsx
import { Component, type ReactNode } from "react";

interface Props {
    fallback?: ReactNode;
    children: ReactNode;
    resetKey?: unknown;
}

interface State {
    hasError: boolean;
    error: Error | null;
    resetKey?: unknown;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, resetKey: props.resetKey };
    }

    static getDerivedStateFromProps(props: Props, state: State): State | null {
        if (props.resetKey !== undefined && props.resetKey !== state.resetKey) {
            return { hasError: false, error: null, resetKey: props.resetKey };
        }
        return null;
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: { componentStack: string }) {
        console.error("ErrorBoundary caught:", error, info.componentStack);
        console.error(error.message);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div style={{ color: "red", padding: "1rem" }}>
                        Something went wrong: <pre>{this.state.error?.message}</pre>
                    </div>
                )
            );
        }
        return this.props.children;
    }
}
