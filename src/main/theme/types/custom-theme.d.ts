
import { DefaultTheme } from "vitepress/types/default-theme";

export namespace CustomTheme {
    export interface Project {
        name: string;
        description?: string;
        website: string;
        keywords: string[];
    }
}
