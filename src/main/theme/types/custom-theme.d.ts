
import { DefaultTheme } from "vitepress/types/default-theme";

export namespace CustomTheme {
    export interface Project {
        avatar: string;
        name: string;
        title?: string;
        desc?: string;
        links?: DefaultTheme.SocialLink[];
        website: string;
    }
}
