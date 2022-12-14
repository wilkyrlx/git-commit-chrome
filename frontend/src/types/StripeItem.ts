/**
* This class functions as an enum with fields:
* id - 1 for repo, 2 for directory, 3 for org. This is crucial for JSON parsing. Int so it can be extended
* path - path to the image icon
* target - repo opens in new tab, directory executes on page
*/
class stripeItemType {
    static readonly REPO = new stripeItemType(1, "/icons/command-line.svg", "_blank")
    static readonly DIRECTORY = new stripeItemType(2, "/icons/folder.svg", "_self")
    static readonly ORGANIZATION = new stripeItemType(3, "/icons/globe.svg", "_blank")
    static readonly AD = new stripeItemType(4, "/icons/newspaper.svg", "_blank")

    // private to disallow creating other instances of this type
    private constructor(public readonly id: number, public readonly path: string, public readonly target: any) {
    }
}

interface stripeItemProps {
    name: string;
    link: string;
    typeItem: stripeItemType;
    children: stripeItem[]
}

// TODO: consider using a LIFO stack
class stripeItem {
    public name: string;    // name (visible to user)
    public link: string;    // link to github repo (or # for directory)
    public typeItem: stripeItemType; //REPO or DIRECTORY
    public id: number;  // ID, critical for framer-motion list order
    public children: stripeItem[];  // list of stripeItems in directory (directory only, NOT for repo)
    constructor(item: stripeItemProps) {
        this.name = item.name;
        this.link = item.link;
        this.id = cyrb53(item.name);
        this.typeItem = item.typeItem;
        this.children = item.children;
    }
}

// hashing function, credits to bryc. Used for generating a unique numeric ID (critical for framer-motion list)
const cyrb53 = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export { stripeItem, stripeItemType }