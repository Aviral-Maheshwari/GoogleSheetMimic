#!/bin/bash

# Define the content of the README.md file
read -r -d '' README_CONTENT << 'EOF'
# GoogleSheetClone App

## Overview

GoogleSheetClone is a web-based application that mimics the core functionality of Google Sheets. It allows users to create, edit, and manage spreadsheets online. The app supports basic spreadsheet operations such as adding, deleting, and modifying rows and columns, as well as performing calculations and formatting cells.

## Features

- **Real-time Editing**: Multiple users can edit the same spreadsheet simultaneously.
- **Basic Spreadsheet Operations**: Add, delete, and modify rows and columns.
- **Cell Formatting**: Change cell colors, fonts, and text alignment.
- **Formulas and Calculations**: Support for basic formulas like SUM, AVERAGE, and more.
- **Data Import/Export**: Import and export data in CSV format.
- **User Authentication**: Secure login and registration system.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React.js, Redux, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Docker, Kubernetes, AWS

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4 or higher)

