## Project Overview

The application that we developed is a game rental system that allows users to rent video games at the click of a button. This makes it easy so that users don’t have to pay full price for a video game where they won’t play after they finish, which leads to saving money for many users. This project is relevant because services like Game Pass have proven to be a sustainable business model and not everybody wants to pay full price for a game that they’ll only play for a couple of hours.

## Setup 

Must be in a virtual environment to run the application
Need 2 separate terminal windows to run the app.
Must have both Uvicorn (python) and Node.js installed

1. After cloning the repository with `git clone https://github.com/Stumpts/GameRentalService.git`
To create a virtual environment, do the following:

`cd GameRentalService`

`cd Backend`

`python -m venv venv`

`venv/Scripts/Activate.ps1`

Once you run those 4, you should be in a virtual environment

You can confirm this by seeing a green (venv) at the beginning of your terminal line.

3. Download Uvicorn and Node.js to run the program.
This can be done by first cd’ing into the backend like so:

  `cd Backend`
	
  `pip install uvicorn`
  
Install Node.js from their website

4. After that you can run the backend with:
	
  `uvicorn main:app --reload`

Make sure you are cd in the backend AND in the virtual environment before doing this

5. Open a separate terminal window and cd into the front end folder like this:

  `cd GameRentalService`

  `cd Frontend`
	
  `cd game-rental-system`

7.  Run the frontend by typing this into the terminal:
	
  `npm i` (if its your first time running the frontend to install all dependencies)
	
  `npm run dev`

You should be given a local host link that you ctrl click to access the application
