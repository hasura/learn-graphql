---
title: "Data Modelling"
metaTitle: "Data Modelling | Hasura GraphQL Tutorial"
metaDescription: ""
---

A database is composed of a collection of relations that contain tuples which represent real-world entities (e.g., documents and people) or relationships (e.g., authorship). A relation has attributes of fixed types that represent properties of the entities and relationships (e.g., the title of a document) and a primary key. 

Attribute types can be atomic (e.g., integer, floating point, or boolean) or structured (e.g., array or procedure). The primary key is a sequence of attributes of the relation, when taken together, uniquely identify each tuple.

A relation inherits all attributes from its parent(s) unless an attribute is overriden in the definition. For example, the EMPLOYEE relation inherits the PERSON attributes Name, Birth- date, Height, Weight, StreetAddress, City, and State. Key specifications are also inherited so Name is also the key for EMPLOYEE.

```
CREATE TABLE Music (
    Artist VARCHAR(20) NOT NULL, 
    SongTitle VARCHAR(30) NOT NULL,
    AlbumTitle VARCHAR(25),
    Year INT,
    Price FLOAT,
    Genre VARCHAR(10),
    CriticRating FLOAT,
    Tags TEXT,
    PRIMARY KEY(Artist, SongTitle)
);
```