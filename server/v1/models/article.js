
class article {
  constructor() {
    this.articles = [
      {
        id: 1,
        authorId: 1,
        title: 'Restful APIs',
        subtitle: '',
        article: 'Representational state transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet',
        createdOn: '2019-10-03T11:07:23.423Z',
      },
    ];
  }

  publish(input, authorId) {
    const newArticle = {
      id: this.articles.length + 1,
      authorId,
      title: input.title.trim() || 'Untitled',
      subtitle: input.subtitle.trim(),
      article: input.article,
      createdOn: new Date(),
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  retriveArticle(id) {
    return this.articles.find((art) => art.id == id);
  }

  retriveAll() {
    return this.articles;
  }

  edit(id, input) {
    const one = this.retriveArticle(id);
    const index = this.articles.indexOf(one);
    this.articles[index].title = input.title || one.title;
    this.articles[index].subtitle = input.subtitle || one.subtitle;
    this.articles[index].article = input.article || one.article;
    return this.articles[index];
  }

  delete(id) {
    const article = this.retriveArticle(id);
    const index = this.articles.indexOf(article);
    this.articles.splice(index, 1);
    return {};
  }
}
export default new article();


