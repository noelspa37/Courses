# Queries ejecutadas en el curso en GraphiQL

## Alias y Fragments

```graphql
{
  AllCourses: getCourses {
    ...CourseFields
  }

  Course1: getCourse(id: "5cb4b8ce75f954a0585f7be2") {
    ...CourseFields
    teacher
  }

  Course2: getCourse(id: "5cb4b8ce75f954a0585f7be4") {
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
  people {
    _id
    name
  }
}

## Intefaces
{
  getPeople {
    _id
    name
    email
    ... on Monitor {
      phone
    }
    ... on Student {
      avatar
    }
  }
}

## Variables
mutation CrearCurso($crearInput: CourseInput!) {
  createCourse(input: $crearInput) {
    _id
    title
    teacher
    description
    topic
  }
}


{
  "crearInput": {
    "title": "titulo 5",
    "teacher": "profesor 5",
    "description": "descripcion5",
    "topic": "topic5",
    "level": "cero"
  }
}


## Directivas
query NuevaConsulta($monitor: Boolean!, $avatar: Boolean!) {
  getPeople {
    _id
    name
    ... on Monitor @include(if: $monitor) {
      phone
    }
    ... on Student @include(if: $avatar) {
      avatar
      email
    }
  }
}


{
  "monitor": true,
  "avatar": false
}

## Creación de índices en mongodb
db.courses.createIndex({"$**": "text"})

## Unions
{
  searchItems(keyword: "1") {
    __typename
    ... on Course {
      title
      description
      teacher
    }
    ... on Monitor {
      name
      phone
    }
    ... on Student {
      name
      avatar
      email
    }
  }
}

## Clientes GraphQL
Aquí les dejo la lista de los clientes mencionados:

FetchQl: https://www.npmjs.com/package/fetchql

Tiene un objeto de configuración donde se introduce todas los requerimientos que necesita un query.

Graphql-request https://www.npmjs.com/package/graphql-request

Se puede usar tanto en node como en un aplicativo de front. Es el más sencillo de usar.

Apollo Client: https://www.npmjs.com/package/apollo-client

En un cliente muy completo pues tiene los mismos usos que graphql-request, pero se puede manejar caché de query, uso de promesas, entre otros.

Relay: https://relay.dev/

Es un cliente orientado a integrar el front. es usado por Facebook de manera oficial para conectar con graphql.

Vue Apollo: https://apollo.vuejs.org/

Apollo Angular: https://www.apollographql.com/docs/angular/
```
