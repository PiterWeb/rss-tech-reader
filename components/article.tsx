import { FunctionComponent } from "react";
import { Card, Text, Link } from "@nextui-org/react";
import Label from "./label";
import type ArticleModel from "../models/articleModel";
import styles from "../styles/article.module.css";
import Parser from "html-react-parser";

const Article: FunctionComponent<ArticleModel> = ({
  title,
  description,
  link,
  categories,
}) => {
  if (categories.length > 4) {
    let newCategories = categories.slice(0, 3);
    newCategories.push("...");
    categories = newCategories;
  }
  if (description.length > 200) {
    description = description.slice(0, 400) + "...";
  }

  return (
    <Card>
      <Card.Body>
        <Text h1>{title}</Text>
        {Parser(description)}
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Link href={link}>Visit</Link>
        {categories.length > 0 ? (
          <div className={styles.categories}>
            {categories.map((category) => (
              <Label key={category}>{category}</Label>
            ))}
          </div>
        ) : null}
      </Card.Footer>
    </Card>
  );
};

export default Article;
