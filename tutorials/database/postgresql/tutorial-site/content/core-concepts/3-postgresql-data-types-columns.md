---
title: "Data Types and Columns"
metaTitle: "PostgreSQL Data Types and Columns | PostgreSQL Tutorial"
metaDescription: "Data types restrict the kind of data that can be stored for each column. PostgreSQL natively supports a rich set of data types."
---

Data types restrict the kind of data that can be stored for each column.

PostgreSQL natively supports a rich set of data types. Users can also extend it by adding customised types using `CREATE TYPE` command.

We will now look at the list of native types that are supported:

## Numeric Types

### Integers

- integer
- smallint
- bigint

### Serials

- serial
- smallserial
- bigserial

## Arbitrary precision

- numeric

## Floating point types

- real
- double precision

## Character Types

- character varying(n) / varchar(n)
- character(n)
- text

## Boolean Type

- boolean with state of true/false

## Date Time Types

- date
- time
- timestamp
- interval

## UUID Type

Universally Unique Identifiers are 128-bit numbers used to uniquely identify a piece of information and typically in database context it is used to identify a row.

## Geometric Types

- point
- line
- box
- path
- lseg
- polygon
- circle

## JSON Types

- json
- jsonb (binary form for faster execution)

There are more such supported types including monetary for money related, binary types for raw byte storage, network address types for IP address references, arrays etc. You can read more about all available PostgreSQL Data Types from their [official docs](https://www.postgresql.org/docs/13/datatype-net-types.html).
