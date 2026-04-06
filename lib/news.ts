export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  content?: string;
}

export const newsData: NewsItem[] = [
  {
    id: "20260406-training",
    date: "2026/04/06",
    category: "お知らせ",
    title: "株式会社ヤオヨロズ、老舗旅館『西村屋』にて約2週間の実地研修を実施",
  },
  {
    id: "20260305-establishment",
    date: "2026/03/05",
    category: "お知らせ",
    title: "株式会社ヤオヨロズが設立されました。",
  },
  {
    id: "20260120-dx-project",
    date: "2026/01/20",
    category: "プレスリリース",
    title: "弊社三浦の取り組みが観光庁の「観光DX事業」に採択されました。",
  },
];
