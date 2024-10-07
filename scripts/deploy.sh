#!/bin/bash

# Przechodzimy do katalogu backend


cd Backend

# Pull najnowszych zmian
git pull origin master

# Instalujemy zależności
npm install

# Uruchamiamy serwer
pm2 restart all  # lub użyj innego narzędzia do zarządzania procesami

# Przechodzimy do katalogu frontend
cd Frontend
# Pull najnowszych zmian
git pull origin master

# Instalujemy zależności
npm install

# Budujemy aplikację
npm run build

# (Opcjonalnie) Przenieś zbudowaną aplikację do katalogu serwera statycznego Nginx
