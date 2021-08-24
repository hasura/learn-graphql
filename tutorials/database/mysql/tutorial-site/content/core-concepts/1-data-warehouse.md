---
title: "Data Warehouse"
metaTitle: "Data Warehouse | MySQL Tutorial"
metaDescription: "A data warehouse is a repository of data. Data Warehousing (DW) is a process to collect as well as manage data from different sources to improve the ease of data access and deriving insights from this data."
---

## What is a data warehouse?

A data warehouse is a repository of data. Data Warehousing (DW) is a process to collect as well as manage data from different sources to improve the ease of data access and deriving insights from this data. A Data warehouse is typically used to link and analyse organizational and transactional data from heterogeneous sources. The data warehouse is the centrepiece of the Business Intelligence repository which is used mainly for data analysis and reporting.

Three main types of Data Warehouses (DWH) are:

### Enterprise Data Warehouse (EDW)

Enterprise Data Warehouse (EDW) is a centralized warehouse. It provides decision support service for the enterprise as a whole. It offers a centralized option for organizing and storing data. It also provides the ability to categorize data according to the teams/access level and grant permission to access this data according to those categories.

### Operational Data Store

Operational Data Store is a data store required when Data warehouses and OLTP systems are too complex to support organizations reporting needs. In ODS, the warehouse is refreshed in real time. Hence, it is widely preferred for relatively low-complexity activities like storing records of Employee data.

### Data Mart

A data mart is a subset of a data warehouse. It is specially designed for a particular function within an organization such as sales, finance or marketing. In an independent data mart, data can collect directly from different types of data sources.

A data warehouse demonstrates the following properties:

- **Subject-oriented:** A data warehouse contains data about a few well-defined subjects rather than the enterprise as a whole.
- **Integrated:** An integrated data warehouse is a repository of data that contains information from various systems within an enterprise.
- **Non-volatile:** The data values in a database cannot be changed without access control and a  valid reason.
- **Time-variant:** A data warehouse contains historical data that can be used for different types of  analyses.

![Data Warehousing]( https://graphql-engine-cdn.hasura.io/learn-hasura/assets/database-mysql/Hasura_MySQL_55.png)
