#!/bin/bash

npm run dev --prefix frontend &
python backend/manage.py runserver
