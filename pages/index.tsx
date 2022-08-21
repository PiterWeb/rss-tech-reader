import type { NextApiResponse } from "next";
import { NextPage } from "next";
import { parse } from "node-html-parser";
import { Grid } from "@nextui-org/react";
import Article from "../components/article";
import type ArticleModel from "../models/articleModel";

type Props = {
  data: ArticleModel[];
};

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const sources = [
    "https://techcrunch.com/feed/",
    "https://blog.logrocket.com/feed/",
    "https://dev.to/feed",
    "https://devdojo.com/feed",
  ];

  const promises = sources.map(async (source) => {
    const res = await fetch(source);
    const resText = await res.text();
    const resParsed = parse(resText);
    let items = resParsed.querySelectorAll("item");
    items.length = 6;
    return items.map((item) => {
      const title = item
        ?.querySelector("title")
        ?.text.replaceAll("<![CDATA[", "")
        .replaceAll("]]>", "");
      const link = item?.querySelector("link")?.nextSibling?.rawText;
      const description = item
        ?.querySelector("description")
        ?.text?.replaceAll("<![CDATA[", "")
        .replaceAll("]]>", "");
      const categories = item?.querySelectorAll("category")?.map((cat) => {
        return cat?.text?.replaceAll("<![CDATA[", "")
        .replaceAll("]]>", "");
      })
      return { title, link, description, categories };
    });
  });

  const data = (await Promise.all(promises)).flat();

  return { props: { data } };
}

const Feed: NextPage<Props> = ({ data }) => {

  return (
      <Grid.Container wrap='wrap' gap={2} css={{padding: '$18', width: '100%' }}>
        {data.map((item: any) => (
          <Grid xs sm={4} key={item.link}>
            <Article
              title={item.title}
              link={item.link}
              description={item.description}
              categories={item.categories}
            />
          </Grid>
        ))}
      </Grid.Container>
  );
};

export default Feed;
