export interface LogItem {
    version: string;
    date: string;
    description: string;
    features: string[];
    isMajor?: boolean;
}
