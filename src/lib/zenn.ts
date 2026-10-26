import Parser from 'rss-parser';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const MY_ZENN_USERNAME = "milix_m"

interface Post {
    title: string;
    date: string;
    slug: string;
}

export const getZennRssFeed = async (): Promise<Post[]> => {
    const parser = new Parser();
    const feed = await parser.parseURL('https://zenn.dev/' + MY_ZENN_USERNAME + '/feed?all=1');

    // CI環境はUTCのため、日付は日本時間に変換してから整形する
    const posts: Post[] = feed.items.slice(0, 3).map(item => ({
        title: item.title ?? '',
        date: item.pubDate ? dayjs(item.pubDate).tz('Asia/Tokyo').format('YYYY-MM-DD') : '',
        slug: item.link ?? 'https://zenn.dev/' + MY_ZENN_USERNAME,
    }));

    return posts;
};