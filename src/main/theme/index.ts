import DefaultTheme from "vitepress/theme";
import ProjectPage from "./components/ProjectPage.vue";
import ProjectPageTitle from "./components/ProjectPageTitle.vue";
import Projects from "./components/Projects.vue";
import ProjectsItem from "./components/ProjectsItem.vue";

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component("ProjectPage", ProjectPage);
        app.component("ProjectPageTitle", ProjectPageTitle);
        app.component("Projects", Projects);
        app.component("ProjectsItem", ProjectsItem);
    },
};