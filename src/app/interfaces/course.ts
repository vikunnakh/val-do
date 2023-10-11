export interface Course {
    _id?: string;
    title: string;
    descr: string;
    youtubeLink: string;
    telegramLink: string;
    repoLink: string;
    img: string;
    iframe: string;
    category: string;
    isPublished: boolean;
    date: string;
    tags: Tag[];
    all?: Course[];
}

interface Tag {
    _id: string;
    title: string;
}
