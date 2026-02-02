export interface Photo {
    id: string;
    title: string;
    category: string;
    description?: string;
    url: string;
    specs: {
        iso: string;
        shutter: string;
        aperture: string;
    };
}

const categories = ["Dijital Sanat", "Mimari", "Soyut", "Sinematik", "Minimalist"];
const unsplashIds = [
    "1618005182384-a83a8bd57fbe", "1550684848-fac1c5b4e853", "1550745165-9bc0b252726f", "1534447677768-be436bb09401",
    "1496181133206-80ce9b88a853", "1498050108023-c5249f4df085", "1504384308090-c894fdcc538d", "1518770660439-4636190af475",
    "1461749280684-dccba630e2f6", "1488590528505-98d2b595844a", "1517694712202-14dd9538aa97", "1555066931-4365d14bab8c",
    "1510915228340-29c85a43dcfe", "1525547710557-7aa86881f747", "1531297484001-80022131f5a1", "1504164996022-09080787b6b3",
    "1526374965328-7f61d4dc18c5", "1535223289827-42f1e9919769", "1519389950473-47ba0277781c", "1523961131990-5ea7c61b2107",
    "1516116216624-53e697fedbea", "1515378791036-0648a3ef77b2", "1506399558188-daf6f302c33e", "1520085601670-ee14aa5fa3e8",
    "1493723843671-1d655e66ac1c", "1492551557044-64f35e5753bb", "1518432031352-d6fc5c10da5a", "1454165833222-4296b5ac292a",
    "1451187580459-43490279c0fa", "1472289065668-ce650ac443d2", "1516321318423-f06f85e504b3", "1511649475669-e288648b2339",
    "1517245386807-bb43f82c33c4", "1532619675204-03bc5f778f65", "1483058712527-51c620436a91", "1487058715933-5c8a64c52f67",
    "1522071823991-b5ae7261a2ad", "1526628953301-3e589a6a12ae", "1504868584819-f8e9062cd0bf", "1534067783474-32948dbf3911"
];

export const photos: Photo[] = unsplashIds.map((uid, index) => ({
    id: (index + 1).toString(),
    title: `DİJİTAL-ARK ${index + 1}`,
    category: categories[index % categories.length],
    url: `https://images.unsplash.com/photo-${uid}?auto=format&fit=crop&q=80&w=1200`,
    specs: {
        iso: (100 * (index % 4 + 1)).toString(),
        shutter: `1/${100 * (index % 5 + 1)}`,
        aperture: `f/${(1.4 + (index % 3) * 0.4).toFixed(1)}`
    }
}));
