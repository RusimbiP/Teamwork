import Helper from '../helpers/helper';

const { Tokenize } = Helper;

export const mockUser = {
  "firstname": "John",
	"lastname": "Doe",
	"email": "taken@teamwork.com",
	"password": "password",
	"gender": "male",
	"department": "IbbT",
	"jobrole": "technichian",
	"address" : "KG 167 St"
};

export const newUser = {
	"firstname": "rusimbi",
	"lastname": "pastrick",
	"email": "email@gg.com",
	"password": "password",
	"gender": "male",
	"department": "IbbT",
	"jobrole": "technichian",
	"address" : "KG 167 St"
}

export const invalidToken = 'eyJhbGciOiJIUz4230XBsb3llZUlkIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJjbWMiLCJXJ0bWVudCI6Im5ra24iLCJhZGRyZXNzIjoiS0cgMzQ0IFN0In0sImlhdCI6MTU3MDA2MTMxMywiZXhwIjoxNTcwNjY2MTEzfQ.lxPt4KGiDAan3U8PVdOK7eLRnIntGylHNgI14Mls7QY';

export const unregisteredEmail = "iam@unregistered.com";

export const unRegUser = Tokenize(unregisteredEmail);

export const userToken = Tokenize(mockUser.email);

export const mockArticle = {
	"title": "Title",
	"subtitle": "subtitle is optional",
	"article": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
};
