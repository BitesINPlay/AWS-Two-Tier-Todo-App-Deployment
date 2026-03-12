# AWS Two-Tier Todo App Deployment

## Overview
This project demonstrates a two-tier web application deployment on AWS using a custom VPC, public and private subnets, an Application Load Balancer, Auto Scaling EC2 instances, and Amazon RDS MySQL.

The goal of the project was to build a secure and highly available architecture where the application layer is separated from the database layer.

## Architecture
The solution was designed with the following components:

- **Custom VPC**
- **2 Public Subnets** across different Availability Zones
- **2 Private Application Subnets**
- **2 Private Database Subnets**
- **Internet Gateway**
- **NAT Gateway**
- **Application Load Balancer**
- **Target Group**
- **Auto Scaling Group**
- **Amazon EC2**
- **Amazon RDS MySQL**
- **IAM Role**
- **AWS Systems Manager Session Manager**

## Traffic Flow
**Internet → ALB → EC2 → RDS**

## Network Design
The infrastructure was deployed inside a custom VPC with separated subnet layers:

- **Public Subnets**
  - Host the Application Load Balancer
  - Allow inbound internet traffic

- **Private Application Subnets**
  - Host the EC2 instances
  - Receive traffic only from the ALB
  - Access the internet outbound through the NAT Gateway

- **Private Database Subnets**
  - Host the Amazon RDS instance
  - Accept database traffic only from the EC2 security group

## Security Design
Security was implemented using security groups and subnet separation:

- **ALB Security Group**
  - Allows HTTP traffic from the internet

- **EC2 Security Group**
  - Allows HTTP traffic only from the ALB Security Group

- **RDS Security Group**
  - Allows MySQL traffic only from the EC2 Security Group

This ensures the database is not publicly accessible and application servers are not directly exposed to the internet.

## Application
A simple **Node.js + Express** application was deployed on EC2 instances.

The application:
- runs behind the Application Load Balancer
- connects to Amazon RDS MySQL
- reads data from the `tasks` table
- displays the retrieved tasks in the browser

## Database
An Amazon RDS MySQL instance was deployed in private subnets.

A sample database named `todoapp` was created with a table called `tasks`.

## High Availability
To improve availability, the architecture uses:

- **2 Availability Zones**
- **Application Load Balancer**
- **Auto Scaling Group with 2 EC2 instances**
- **Health checks through the Target Group**

This ensures traffic is distributed across multiple instances and the application remains available even if one instance fails.

## Deployment Steps Summary
1. Created a custom VPC
2. Created public, private app, and private DB subnets
3. Configured Internet Gateway and route tables
4. Configured NAT Gateway for outbound internet access from private EC2 instances
5. Created security groups for ALB, EC2, and RDS
6. Created an RDS MySQL database in private subnets
7. Created an IAM role for EC2
8. Created a Launch Template with user data
9. Created a Target Group
10. Created an Application Load Balancer
11. Created an Auto Scaling Group
12. Deployed the Node.js application
13. Connected the application to Amazon RDS MySQL
14. Verified healthy targets and successful database connectivity

## Result
The application was successfully deployed and accessed through the ALB DNS endpoint.

The final output showed:
- the application running behind the load balancer
- successful MySQL connectivity
- tasks retrieved dynamically from the database

## Key Learnings
Through this project, I learned how to:

- build a two-tier architecture on AWS
- configure public and private subnets
- use security groups to control traffic flow
- deploy EC2 instances in private subnets
- connect an application securely to Amazon RDS
- configure an Application Load Balancer and Target Group
- use Auto Scaling for availability
- troubleshoot health checks, launch templates, and connectivity issues

## Conclusion
This project demonstrates a practical AWS deployment of a secure and highly available two-tier web application architecture. It combines networking, compute, load balancing, scaling, and managed database services into a complete end-to-end cloud solution.
