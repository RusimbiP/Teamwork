
class comment {
  constructor() {
    this.comments = [];
  }

  write(input, articleId, authorId) {
    const newComment = {
      id: this.comments.length + 1,
      authorId,
      articleId,
      comment: input.comment,
      createdDate: new Date(),
    };
    this.comments.push(newComment);
    return newComment;
  }

  getComments(articleId) {
    const Allcomments = this.comments.filter((c) => c.articleId == articleId);
    return Allcomments;
  }

}

export default new comment();
