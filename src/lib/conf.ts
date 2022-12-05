export interface ArticleItem {
  key: string,
  title: string,
  articleId: string,
  children?: ArticleItem[],
  path: string
}

