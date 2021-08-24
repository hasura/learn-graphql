---
title: "OLAP vs OLTP"
metaTitle: "OLAP vs OLTP | MySQL Tutorial"
metaDescription: "In this section, we will learn what is the difference between OLAP and OLTP and what are the different operations of SETL"
---

## OLAP

(Online Analytical Processing) is defined by a low number of transactions. Queries are usually complicated and use aggregate functions. For OLAP systems, response time is an effective metric to measure. OLAP applications are commonly used for Data Mining. OLAP databases typically contain historical data. For example, a bank that needs to store many years of historic records of financial records can implement an OLAP database to create reports to stakeholders.

## OLTP

(Online Transaction Processing) is defined by a large number of low-complexity transactions (INSERT, UPDATE, DELETE). The most important features which are required for OLTP systems are rapid query processing, maintaining data integrity in multi-access environments and an efficiency rate which can be measured by the number of transactions per second/minute/hour.

## SETL

- **Select, Extract, Transform and Load**

- **Select** - Identification of the data that needs to be analyzed.
- **Extract** - Connecting to the data source and extracting the data.
- **Transform** - Modifying or altering the extracted data to convert into a format which is standardized.
- **Load** - Store the data in the respective data warehouse.
