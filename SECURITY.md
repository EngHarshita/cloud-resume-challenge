# Security Policy

## Supported Versions

The following versions of the Cloud Resume Challenge Portfolio receive security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of this project seriously. If you discover any security vulnerability (e.g., exposed API keys, IAM credential leaks, CORS misconfigurations, or potential DDoS vectors on the API Gateway/Lambda endpoints), please do not report it publicly via GitHub Issues. 

Instead, please report security vulnerabilities directly to the maintainer:

* **Email:** [harshitapal5678@gmail.com](mailto:harshitapal5678@gmail.com)
* **Expected Response Time:** Within 48 hours for triage and initial assessment.

Please include the following details in your report to help us understand and resolve the issue:
* Description of the vulnerability or security flaw.
* Steps to reproduce the issue (including any payloads or requests if applicable).
* Potential impact of the exploit.

## Cloud Security Best Practices Implemented

This project is built using AWS serverless technologies. The following security practices are enforced in the architecture:

1. **Origin Access Control (OAC):** The static portfolio S3 bucket is strictly private and cannot be accessed directly via public HTTP. It is only accessible via the Amazon CloudFront Distribution using OAC.
2. **CORS Hardening:** API Gateway and Lambda functions are configured to accept cross-origin requests specifically, preventing arbitrary third-party domains from executing API endpoints.
3. **AWS IAM Least Privilege:** Lambda execution roles are granted the absolute minimum permissions necessary to interact with the DynamoDB visitor counter table (specifically restricted to `GetItem` and `UpdateItem` operations on the specific table resource).
4. **No Secrets in Source Control:** No AWS credentials, private keys, or API endpoint secrets are hardcoded in the frontend or backend source files.
