import article from '../models/article';

export default class service {
  static write(input, authorId){
      const written = article.publish(input, authorId);
      return {
        status: 201,
        message: `Article succesfully created`,
        data: written
      }
  }
}

