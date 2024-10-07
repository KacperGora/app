#!/bin/bash

# Przechodzimy do katalogu backend
cd /home/admin/app/Backend

# Pull najnowszych zmian
git pull origin main

# Instalujemy zależności
npm install

# Uruchamiamy serwer
pm2 restart all  # lub użyj innego narzędzia do zarządzania procesami

# Przechodzimy do katalogu frontend
cd /home/admin/app/Frontend
# Pull najnowszych zmian
git pull origin main

# Instalujemy zależności
npm install

# Budujemy aplikację
npm run build

# (Opcjonalnie) Przenieś zbudowaną aplikację do katalogu serwera statycznego Nginx
