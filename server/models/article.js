
class article {
  constructor() {
    this.articles = [];
  }

  publish(input, authorId) {
    const newArticle = {
      id: this.articles.length + 1,
      owner: authorId,
      title: input.title.trim() || 'Untitled',
      subtitle: input.subtitle.trim(),
      article: input.article,
      createdOn: new Date(),
    };
    this.articles.push(newArticle);
    return newArticle;
  }
}
export default new article();


