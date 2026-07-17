export interface ProjectInfo {
    projectName: string;
    projectDescription: string;
    projectLink: string;
}

export interface MenuItem {
    menuName: string;
    menuLink: string;
    menuIcon: string;
}

export interface CategoryInfo {
    name: string;
    description: string;
}

export type MediaLinkInfo = Record<string, string>;
