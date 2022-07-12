/* 
  необходимо написать тип Select<T> который рекурсивно преобразует 
  в T все типы пропертей в boolean
*/

type User = {
 id: string;
 name: string;
 posts: Post[];
} 
  
type Post = {
  id: string,
  text: string,
  user: {
    id: string
  }
}

type SelectX<Type> = Type extends object ? { [key in keyof Type]: SelectX<Type[key]> } : boolean;

const user1: SelectX<User> = {
  id: true,
  name: true,
  posts: [
    {
      id: true,
      text: true,
      user: {
        id: true,
      }
    }
  ]
}

const user: User = {
  id: 'a1',
  name: 'John',
  posts: [
    {
      id: 'p1',
      text: 'some1',
      user: {
        id: 'a1'
      }
    },
    {
      id: 'p2',
      text: 'some2',
      user: {
        id: 'a1'
      }
    }
  ]
}