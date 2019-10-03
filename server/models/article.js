
class article {
  constructor() {
    this.articles = [
    {
      id: 1,
      owner: 2,
      title: "Restful APIs",
      subtitle: "",
      article: "Representational state transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet",
      createdOn: "2019-10-03T11:07:23.423Z"
    }
  ];
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

  retriveArticle(id) {
    return this.articles.find(art => art.id == id);
  }
}
export default new article();


